import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    // return redirect('/');
    redirect('/dashboard/overview');
  } else {
    redirect('/dashboard/overview');
  }
}
