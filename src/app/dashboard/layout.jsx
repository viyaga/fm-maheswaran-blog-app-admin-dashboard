import { auth } from '@/auth';
import KBar from '@/components/shared/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function DashboardLayout({ children }) {
  // Persisting the sidebar state in the cookie.
  const cookieStore = await cookies();    
  const sidebarState = cookieStore.get('sidebar:state');
  const defaultOpen = sidebarState?.value === 'true';

  const session = await auth();

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar session={session}/>
        <SidebarInset>
          <Header />
          {/* page main content */}
          {children}
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
