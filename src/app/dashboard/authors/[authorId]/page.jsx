import AuthorViewPage from '@/components/pages/author/author-view-page';
import { getAuthorById } from '@/lib/strapi';

export const metadata = {
  title: 'Dashboard : Author View',
};

export default async function Page({ params }) {
  const { authorId } = await params;

  let authorData = null;
  if (authorId !== "add") {
    authorData = await getAuthorById({ documentId: authorId });
    console.log({authorData});
    
    if (!authorData || authorData?.error) {
      return <p className="text-center mt-5 font-normal">Author Not Found</p>;
    }
  }

  return <AuthorViewPage authorData={authorData} />;
}
