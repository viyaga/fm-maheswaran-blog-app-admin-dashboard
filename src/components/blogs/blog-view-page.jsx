import { notFound } from 'next/navigation';
import BlogForm from './blog-form';
import { products } from '@/constants/data';

export default async function BlogViewPage({
  blogId
}) {
  let blog = null;
  let pageTitle = 'Create New Blog';

  if (blogId !== 'new') {
    blog = products[0];
    if (!blog) {
      notFound();
    }
    pageTitle = `Edit Blog`;
  }

  return <BlogForm initialData={blog} pageTitle={pageTitle} />;
}
