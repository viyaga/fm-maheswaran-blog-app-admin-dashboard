import { notFound } from 'next/navigation';
import BlogForm from './blog-form';
import { products } from '@/constants/data';

export default async function BlogViewPage({
  blogData,
  authors,
  categories
}) {
  return <BlogForm blogData={blogData} authors={authors} categories={categories} />;
}
