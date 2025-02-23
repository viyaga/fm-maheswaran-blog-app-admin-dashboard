import CategoryViewPage from '@/components/pages/category/category-view-page';
import { getCategoryById } from '@/lib/actions/category';

export const metadata = {
  title: 'Dashboard : Category View',
};

export default async function Page({ params }) {
  const { categoryId } = await params;

  let categoryData = null;
  if (categoryId !== "add") {
    categoryData = await getCategoryById({ documentId: categoryId, fields: "name,description,parentCategory" });

    if (!categoryData || categoryData?.error) {
      return <p className="text-center mt-5 font-normal">Category Not Found</p>;
    }
  }

  return <CategoryViewPage categoryData={categoryData} />;
}
