import { auth } from '@/auth';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import { Lato } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './globals.css';

export const metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({ children }) {
  const session = await auth();
  
  return (
    <html
      lang="en"
      className={`${lato.className}`}
      suppressHydrationWarning={true}
    >
      <body className={'overflow-hidden'}>
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <NuqsAdapter>
            <Toaster />
            {children}
          </NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}
