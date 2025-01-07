import UsersViewPage from '@/components/users/user-view-page';
import { getData } from '@/lib/actions';

export const metadata = {
  title: 'Dashboard : Employee View'
};

export default async function Page({ params }) {
  const { userId } = await params

  let userData = null
  if (userId !== "add") {
    userData = await getData({ url: `/website-users/${userId}`, fields: "username,email,first_name,last_name,prime_membership,country", populate:"role" })
    if (!userData || userData?.error) return <p className='text-center mt-5 font-normal'>User Not Found</p>
  }

  return <UsersViewPage userData={userData} />;
}
