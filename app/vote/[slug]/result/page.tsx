import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function VoteResultPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
    const { slug } = await params;

    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (!token) redirect('/login');

    const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/votes/' + slug + '/result', {
        headers: { 'Authorization': 'Bearer ' + token.value }
    });

    const data = await res.json();
    return (
        <div className="mx-auto max-w-[600px] p-2">
            {
                data ? <div>
                    <p className="text-xl font-bold">{data.title}</p>
                    <p className="text-lg font-semibold">{data.description}</p>
                    <div>
                        {
                            data.options.map((o: any) => <p key={o._id}>{ o.name } : { o.voters.length }</p>)
                        }
                    </div>
                </div> : null
            }
        </div>
    )
}