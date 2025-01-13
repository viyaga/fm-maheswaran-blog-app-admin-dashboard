import AuthorViewPage from '@/components/author/author-view-page';
import { getAuthorById } from '@/lib/actions/author';

export const metadata = {
  title: 'Dashboard : Author View',
};

export default async function Page({ params }) {
  const { authorId } = await params;

  let authorData = null;
  if (authorId !== "add") {
    authorData = await getAuthorById({ documentId:authorId, fields: "username,email,first_name,last_name,country" });

    if (!authorData || authorData?.error) {
      return <p className="text-center mt-5 font-normal">Author Not Found</p>;
    }
  }

  return <AuthorViewPage authorData={authorData} />;
}
