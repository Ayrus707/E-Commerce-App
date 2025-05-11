// 'use client';
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { AlertTriangle } from 'lucide-react'

// export default function NotFound() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
//        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
//       <h2 className="text-3xl font-bold text-destructive mb-2">Page Not Found</h2>
//       <p className="text-muted-foreground mb-6">Oops! The page you are looking for does not exist or has been moved.</p>
//       <Button asChild>
//         <Link href="/">Return Home</Link>
//       </Button>
//     </div>
//   )
// }

// 'use client';

// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { AlertTriangle } from 'lucide-react';
// import { Suspense } from 'react';

// export default function NotFound() {
//   return (
//     <Suspense fallback={null}>
//       <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
//         <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
//         <h2 className="text-3xl font-bold text-destructive mb-2">Page Not Found</h2>
//         <p className="text-muted-foreground mb-6">Oops! The page you are looking for does not exist or has been moved.</p>
//         <Button asChild>
//           <Link href="/">Return Home</Link>
//         </Button>
//       </div>
//     </Suspense>
//   );
// }

// export default function NotFound() {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
//     </div>
//   );
// }
// "use-client"
// import Link from 'next/link'
// import { AlertTriangle } from 'lucide-react'

// export default function NotFound() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
//       <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
//       <h2 className="text-3xl font-bold text-red-500 mb-2">Page Not Found</h2>
//       <p className="text-gray-500 mb-6">Oops! The page you are looking for does not exist or has been moved.</p>
//       <Link
//         href="/"
//         className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//       >
//         Return Home
//       </Link>
//     </div>
//   )
// }


