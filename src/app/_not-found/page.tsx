// app/_not-found/page.tsx
"use client"; // Important: Mark this file as a Client Component

import React, { Suspense } from 'react';
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

// Create a simple, self-contained 404 component
const NotFoundContent = () => {
return (
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
 className="flex flex-col items-center justify-center h-full"
 >
 <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
 <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
 <Button
 asChild
 className="bg-blue-500 hover:bg-blue-600 text-white"
 >
 <a href="/">Go Back to Home</a>
 </Button>
 </motion.div>
);
};

export default function NotFound() { return (
<div className="flex items-center justify-center h-screen bg-gray-100">
<NotFoundContent />
</div>
 );
}
