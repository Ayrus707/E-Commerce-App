import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/context/auth-context"; // ✅ Import AuthProvider

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "E-Commerce Shop - Your Modern E-commerce Destination",
  description: "Discover and shop the latest trends with E-Commerce Shop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <AuthProvider> {/* ✅ Wrap entire layout in AuthProvider */}
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}






// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google'; // Using Inter as a clean default
// import './globals.css';
// import Header from '@/components/layout/header';
// import Footer from '@/components/layout/footer';
// import { Toaster } from "@/components/ui/toaster"; // Import Toaster for cart notifications

// const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// export const metadata: Metadata = {
//   title: 'ShopWave - Your Modern E-commerce Destination',
//   description: 'Discover and shop the latest trends with ShopWave.',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
//         <Header />
//         <main className="flex-grow container mx-auto px-4 py-8 md:px-6">
//           {children}
//         </main>
//         <Footer />
//         <Toaster /> {/* Add Toaster component here */}
//       </body>
//     </html>
//   );
// }
