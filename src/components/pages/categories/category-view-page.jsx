import CategoryForm from './category-form';
import PageContainer from '@/components/layout/page-container';

export default function CategoryViewPage({ categoryData }) {
  return (
    <PageContainer>
      <CategoryForm categoryData={categoryData} />
    </PageContainer>
  );
}