import CategoryForm from './category-form';
import PageContainer from '@/components/layout/page-container';

export default function CategoryViewPage({ categoryData, categories }) {
  return (
    <PageContainer>
      <CategoryForm categoryData={categoryData} categories={categories} />
    </PageContainer>
  );
}