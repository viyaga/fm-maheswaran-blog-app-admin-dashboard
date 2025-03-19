import CategoryViewPage from '@/components/pages/category/category-view-page';
import { getAllCategories, getCategoryById } from '@/lib/strapi/actions/category';

export const metadata = {
  title: 'Dashboard : Category View',
};

const getCategories = async () => {
  const fields = "name"; // Fetch relevant fields
  const data = await getAllCategories({ fields, sort: "name:asc", revalidate: 60 * 60 * 24 * 365, tags: ["categories"] });
  return data;
}

export default async function Page({ params }) {
  const { categoryId } = await params;

  const categories = await getCategories();
  if (categories?.error) return <ServerError message="An error occurred. Please try again later." />;

  let categoryData = null;
  if (categoryId !== "add") {
    categoryData = await getCategoryById({ documentId: categoryId, fields: "name,slug,description", populate: "parent_category" });

    if (!categoryData) {
      return <p className="text-center mt-5 font-normal">Category Not Found</p>;
    }

    if (categoryData?.error) {
      return <p className="text-center mt-5 font-normal">{categoryData?.error}</p>;
    }
  }

  return <CategoryViewPage categoryData={categoryData} categories={categories.data} />;
}
