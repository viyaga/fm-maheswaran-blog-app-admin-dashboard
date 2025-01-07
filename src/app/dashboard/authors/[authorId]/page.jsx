import UsersViewPage from '@/components/admin-users/user-view-page';
import { getAdminUsersData } from '@/lib/actions';

export const metadata = {
  title: 'Dashboard : Employee View'
};

export default async function Page({ params }) {
  const { authorId } = await params

  let userData = null
  if (userId !== "add") {
    userData = await getAdminUsersData({ url: `/users/${authorId}`, fields: "username,email,first_name,last_name,prime_membership,country", populate:"role" })
    if (!userData || userData?.error) return <p className='text-center mt-5 font-normal'>User Not Found</p>
  }

  return <UsersViewPage userData={userData} />;
}
