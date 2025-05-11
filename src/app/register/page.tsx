"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user info to Firestore (use name from form directly)
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name,   // ✅ Directly use name from input
      email,
    });

    router.push("/profile");
  } catch (err: any) {
    setError(err.message);
  }
};


  return (
    <div className="flex justify-center items-center min-h-[60vh] px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join E-Commerce Shop today!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="register-name">Full Name</Label>
              <Input id="register-name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="register-email">Email Address</Label>
              <Input id="register-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="register-password">Password</Label>
              <Input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Register</Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button variant="link" className="p-0 h-auto text-primary" asChild>
              <Link href="/profile">Login here</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}










// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";

// // TODO: Implement actual registration logic using an authentication provider

// export default function RegisterPage() {
//   return (
//     <div className="flex justify-center items-center min-h-[60vh] px-4">
//        <Card className="w-full max-w-md shadow-lg">
//          <CardHeader className="text-center">
//            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
//            <CardDescription>Join ShopWave today!</CardDescription>
//          </CardHeader>
//          <CardContent className="space-y-4">
//            <form className="space-y-4">
//               <div>
//                 <Label htmlFor="register-name">Full Name</Label>
//                 <Input id="register-name" type="text" placeholder="Your Name" required />
//               </div>
//               <div>
//                 <Label htmlFor="register-email">Email Address</Label>
//                 <Input id="register-email" type="email" placeholder="you@example.com" required />
//               </div>
//               <div>
//                 <Label htmlFor="register-password">Password</Label>
//                 <Input id="register-password" type="password" required />
//               </div>
//                <div>
//                 <Label htmlFor="confirm-password">Confirm Password</Label>
//                 <Input id="confirm-password" type="password" required />
//               </div>
//               <Button type="submit" className="w-full bg-accent hover:bg-accent/90">Register</Button>
//            </form>
//            <p className="text-center text-sm text-muted-foreground">
//              Already have an account?{' '}
//              <Button variant="link" className="p-0 h-auto text-primary" asChild>
//                 <Link href="/profile">Login here</Link>
//              </Button>
//            </p>
//          </CardContent>
//        </Card>
//     </div>
//   );
// }
