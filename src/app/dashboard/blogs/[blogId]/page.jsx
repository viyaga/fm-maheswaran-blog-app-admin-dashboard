import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import BlogViewPage from '@/components/blogs/blog-view-page';

export const metadata = {
  title: 'Dashboard : Blog View'
};

export default async function Page({ params }) {
    const { blogId } = await params
    
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <BlogViewPage blogId={blogId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
