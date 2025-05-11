"use client";

import { useAuth } from "@/context/auth-context";
import { auth,db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { doc, deleteDoc,getDoc } from 'firebase/firestore';
import { useEffect} from "react";



export default function ProfilePage() {
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const { user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/"); // redirect to same page, context will handle rendering
  } catch (err: any) {
    setError(err.message);
  }
};

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data() as { name: string; email: string });
        }
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
  return (
    <div className="max-w-2xl mx-auto space-y-8 mt-10">
      <h1 className="text-3xl font-bold tracking-tight">
        Login or Register
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Access your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-secondary border-primary/20 border">
          <CardHeader>
            <CardTitle>New Customer?</CardTitle>
            <CardDescription>
              Create an account to enjoy faster checkout and manage your orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-accent hover:bg-accent/90">
              <Link href="/register">Create Account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


  return (
    
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <Card className="space-y-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Welcome{userData ? `, ${userData.name}` : ""}!
            </CardTitle>
            <CardDescription className="text-gray-500">Manage your account settings below.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-600">Email:</Label>
              <p className="text-gray-800">{userData?.email ?? auth.currentUser?.email}</p>
            </div>

            <div className="flex space-x-4">
              {/* Logout Button */}
              <Button
                variant="outline"
                className="w-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={async () => {
                  await auth.signOut();
                  router.push("/"); // Redirect to homepage
                }}
              >
                Logout
              </Button>

              {/* Delete Account Button */}
              <Button
                variant="destructive"
                className="w-full bg-red-600 text-white hover:bg-red-700"
                onClick={async () => {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete your account? This action cannot be undone."
                  );
                  if (confirmDelete && auth.currentUser) {
                    const userId = auth.currentUser.uid;
                    try {
                      // 1. Delete user document from Firestore
                      await deleteDoc(doc(db, "users", userId));

                      // 2. Delete user from Firebase Auth
                      await auth.currentUser.delete();

                      toast.success("Account and user data deleted successfully! 👋");
                      router.push("/");
                    } catch (err: any) {
                      if (err.code === "auth/requires-recent-login") {
                        toast.error("Please sign in again to delete your account.");
                      } else {
                        toast.error("Error deleting account: " + err.message);
                      }
                    }
                  }
                }}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
    
  );
}




// "use client";

// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useAuth } from "@/context/auth-context";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../../lib/firebase";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";

// export default function ProfilePage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { user, loading } = useAuth();
//   const [userData, setUserData] = useState<any>(null);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // Fetch user data from Firestore
//       const docRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setUserData(docSnap.data());
//       } else {
//         setError("User data not found in Firestore.");
//       }
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   const isLoggedIn = !!userData;

//   return (
//     <div className="max-w-2xl mx-auto space-y-8">
//       <h1 className="text-3xl font-bold tracking-tight">
//         {isLoggedIn ? "Your Profile" : "Login or Register"}
//       </h1>

//       {isLoggedIn ? (
//         <Card>
//           <CardHeader>
//             <CardTitle>Welcome, {userData.name}!</CardTitle>
//             <CardDescription>Manage your account details and view order history.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div>
//               <Label>Name:</Label>
//               <p>{userData.name}</p>
//             </div>
//             <div>
//               <Label>Email:</Label>
//               <p>{userData.email}</p>
//             </div>
//             <Button variant="destructive" className="mt-4" onClick={() => window.location.reload()}>
//               Logout
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Login</CardTitle>
//               <CardDescription>Access your account.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <div>
//                   <Label htmlFor="login-email">Email</Label>
//                   <Input
//                     id="login-email"
//                     type="email"
//                     placeholder="you@example.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="login-password">Password</Label>
//                   <Input
//                     id="login-password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>
//                 {error && <p className="text-red-500 text-sm">{error}</p>}
//                 <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
//                   Login
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           <Card className="bg-secondary border-primary/20 border">
//             <CardHeader>
//               <CardTitle>New Customer?</CardTitle>
//               <CardDescription>
//                 Create an account to enjoy faster checkout and manage your orders.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Button asChild className="w-full bg-accent hover:bg-accent/90">
//                 <Link href="/register">Create Account</Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }







// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link"; // Assuming separate registration page

// // TODO: Replace this with actual authentication logic (e.g., using NextAuth.js, Firebase Auth, etc.)

// export default function ProfilePage() {
//   // Placeholder state - replace with actual auth state
//   const isLoggedIn = false; // Simulate logged-out state

//   return (
//     <div className="max-w-2xl mx-auto space-y-8">
//       <h1 className="text-3xl font-bold tracking-tight">
//         {isLoggedIn ? "Your Profile" : "Login or Register"}
//       </h1>

//       {isLoggedIn ? (
//         <Card>
//           <CardHeader>
//             <CardTitle>Welcome Back!</CardTitle>
//             <CardDescription>Manage your account details and view order history.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             {/* Display User Info */}
//             <div>
//               <Label>Name:</Label>
//               <p>Demo User</p> {/* Replace with actual user data */}
//             </div>
//             <div>
//               <Label>Email:</Label>
//               <p>demo@example.com</p> {/* Replace with actual user data */}
//             </div>
//              {/* Add links to Order History, Address Management etc. */}
//               <Button variant="outline">View Order History</Button>
//               <Button variant="destructive" className="mt-4">Logout</Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Login Form Placeholder */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Login</CardTitle>
//               <CardDescription>Access your account.</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//                <form className="space-y-4">
//                   <div>
//                     <Label htmlFor="login-email">Email</Label>
//                     <Input id="login-email" type="email" placeholder="you@example.com" required />
//                   </div>
//                   <div>
//                     <Label htmlFor="login-password">Password</Label>
//                     <Input id="login-password" type="password" required />
//                   </div>
//                   <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Login</Button>
//                </form>
//             </CardContent>
//           </Card>

//           {/* Registration Prompt */}
//            <Card className="bg-secondary border-primary/20 border">
//             <CardHeader>
//               <CardTitle>New Customer?</CardTitle>
//                <CardDescription>Create an account to enjoy faster checkout and manage your orders.</CardDescription>
//             </CardHeader>
//             <CardContent>
//                <Button asChild className="w-full bg-accent hover:bg-accent/90">
//                  {/* Link to a dedicated registration page */}
//                  <Link href="/register">Create Account</Link>
//                </Button>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }
