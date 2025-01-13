import AuthorForm from './author-form';
import PageContainer from '@/components/layout/page-container';

export default function AuthorViewPage({ authorData }) {
  return (
    <PageContainer>
      <AuthorForm authorData={authorData} />
    </PageContainer>
  );
}
