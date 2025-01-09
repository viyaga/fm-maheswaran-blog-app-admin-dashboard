import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as BlogTable } from '@/components/shared/table/data-table';
import { columns } from './blog-tables/columns';
import { products } from '@/constants/data';

export default async function BlogListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const totalBlogs = products.length;

  return (
    <BlogTable
      columns={columns}
      data={products}
      totalItems={totalBlogs}
    />
  );
}
