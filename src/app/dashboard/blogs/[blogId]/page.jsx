import BlogViewPage from '@/components/blog/blog-view-page';
import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { getBlogById } from '@/lib/actions/blog';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard : Blog View',
};

export default async function Page({ params }) {
  const { blogId } = await params;
  console.log({ blogId });

  let blogData = null;

  if (blogId !== "add") {
    blogData = await getBlogById({ blogId, fields: "title,slug,excerpt,content,featured_image,createdAt,blog_status" });

    console.log({ blogData });

    if (!blogData || blogData?.error) {
      return <p className='text-center mt-5 font-normal'>Blog Not Found</p>;
    }
  }

  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4">
        <Suspense fallback={<FormCardSkeleton />}>
          <BlogViewPage blogData={blogData} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
