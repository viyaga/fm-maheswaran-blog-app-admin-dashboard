import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ProductViewPage from '@/components/product/product-view-page';

export const metadata = {
  title: 'Dashboard : Product View'
};

export default async function Page({ params }) {
    const { blogId } = await params
    
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <ProductViewPage productId={blogId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
