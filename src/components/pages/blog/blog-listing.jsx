import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as BlogTable } from '@/components/shared/table/data-table';
import { columns } from './blog-tables/columns';
import { getAllBlogs } from '@/lib/strapi/actions/blog';
import ServerError from '../../shared/serverError';

export default async function BlogListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const blog_status = searchParamsCache.get('blog_status');
  const sort = searchParamsCache.get('sort');

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(categories && { categories: categories })
  // };

  const fields = "title,subtitle,featured_image,views,comments_count,createdAt,blog_status";

  const filters = [
    { field: "blog_status", operator: "$ne", value: "deleted" }
  ];

  // search by email
  if (search) filters.push({ field: "title", operator: "$contains", value: search })

  //search by status
  if (blog_status) {
    filters.push({ field: "blog_status", operator: "$in", value: blog_status.replace(/\./g, ",") })
  }

  const pagination = { page, pageSize: pageLimit };

  const blogs = await getAllBlogs({ fields, filters, pagination, sort, revalidate: 60 * 60 * 24 * 365, tags: ["blogs"] });

  if (blogs?.error) return <ServerError message="An error occurred. Please try again later." />

  const totalBlogs = blogs?.count;

  return (
    <BlogTable
      columns={columns}
      data={blogs?.data}
      totalItems={totalBlogs}
    />
  );
}
