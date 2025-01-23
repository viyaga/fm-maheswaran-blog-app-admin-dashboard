import { notFound } from 'next/navigation';
import BlogForm from './blog-form';
import { products } from '@/constants/data';

export default async function BlogViewPage({
  blogData
}) {

  return <BlogForm blogData={blogData} />;
}
