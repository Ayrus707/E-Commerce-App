import { fetchProductById } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/product-detail-client'; // Renamed client component
import ProductDetailSkeleton from '@/components/product/product-detail-skeleton'; // Import skeleton

// This is now a Server Component by default
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = params.id;
  const product = await fetchProductById(productId);

  // If the product is not found during server-side fetch, trigger 404
  if (!product) {
    notFound();
    // return null
  }

  // Pass the fetched product data to the client component
  return <ProductDetailClient product={product} />;
}

// Optional: Define metadata generation if needed
// export async function generateMetadata({ params }: { params: { id: string } }) {
//   const product = await fetchProductById(params.id);
//   if (!product) {
//     return { title: 'Product Not Found' };
//   }
//   return {
//     title: product.name,
//     description: product.description,
//   };
// }
