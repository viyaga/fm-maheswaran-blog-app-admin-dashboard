import UserForm from './blog-form';
import PageContainer from '@/components/layout/page-container';

export default function UserViewPage({ userData }) {
  return (
    <PageContainer>
      <UserForm userData={userData} />
    </PageContainer>
  );
}
