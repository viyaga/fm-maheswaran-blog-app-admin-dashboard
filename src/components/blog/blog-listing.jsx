import { searchParamsCache } from '@/lib/searchparams';
import { DataTable as BlogTable } from '@/components/shared/table/data-table';
import { columns } from './blog-tables/columns';
import { getAllBlogs } from '@/lib/actions/blog';
import ServerError from '../shared/serverError';

export default async function BlogListingPage() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('q');
  const pageLimit = searchParamsCache.get('limit');
  const categories = searchParamsCache.get('categories');
  const sort = searchParamsCache.get('sort');

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(categories && { categories: categories })
  // };

  const fields = "title,subtitle,featured_image,views,comments_count,createdAt,blog_status"; // Fetch only username and email fields

  const filters = [
    // { field: "role", operator: "$eq", value: 1 }, // Filtering by Role ID = 1 (Admin users)
    // { field: "admin_status", operator: "$eq", value: 1 },     // Filtering only active admins
  ];

  // search by email
  if (search) filters.push({ field: "title", operator: "$contains", value: search })
  // if (categories) filters.push({ field: "email", operator: "$contains", value: search })

  //search by categorie
  if (categories) filters.push({ field: "categories", operator: "$eq", value: categories })

  const pagination = { page, pageSize: pageLimit };

  const blogs = await getAllBlogs({ fields, filters, pagination, sort, revalidate: 60 * 60 * 5, tags: ["admins"] });

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
