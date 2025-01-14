import UsersViewPage from '@/components/user/user-view-page';
import { getUserById } from '@/lib/actions/user';

export const metadata = {
  title: 'Dashboard : User View'
};

export default async function Page({ params }) {
  const { userId } = await params

  let userData = null
  if (userId !== "add") {
    userData = await getUserById({documentId:userId, fields: "username,email,first_name,last_name,country"})
    if (!userData || userData?.error) return <p className='text-center mt-5 font-normal'>User Not Found</p>
  }

  return <UsersViewPage userData={userData} />;
}
