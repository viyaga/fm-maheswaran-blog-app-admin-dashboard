import AdminForm from './admin-form';
import PageContainer from '@/components/layout/page-container';

export default function AdminViewPage({ adminData }) {
  return (
    <PageContainer>
      <AdminForm adminData={adminData} />
    </PageContainer>
  );
}
