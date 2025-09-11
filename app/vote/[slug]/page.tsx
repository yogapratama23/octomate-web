import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import VoteForm from "./voteForm";

export default async function VoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (!token) redirect('/login');

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/votes/' + slug, {
        headers: { 'Authorization': 'Bearer ' + token.value }
    });
    const data = await res.json();
    return <VoteForm voteData={data} slug={slug} />
}