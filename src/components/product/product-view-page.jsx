import { notFound } from 'next/navigation';
import ProductForm from './product-form';
import { products } from '@/constants/data';

export default async function ProductViewPage({
  productId
}) {
  let product = null;
  let pageTitle = 'Create New Product';

  if (productId !== 'new') {
    product = products[0];
    if (!product) {
      notFound();
    }
    pageTitle = `Edit Product`;
  }

  return <ProductForm initialData={product} pageTitle={pageTitle} />;
}
