import AdminViewPage from '@/components/pages/admin/admin-view-page';
import { getAdminById } from '@/lib/actions/admin';

export const metadata = {
  title: 'Dashboard : Admin View'
};

export default async function Page({ params }) {
  const { adminId } = await params

  let adminData = null
  if (adminId !== "add") {
    adminData = await getAdminById({ adminId, fields: "username,email,first_name,last_name,country" })
    
    if (!adminData || adminData?.error) return <p className='text-center mt-5 font-normal'>Admin Not Found</p>
  }


  return <AdminViewPage adminData={adminData} />;
}
