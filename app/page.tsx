import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { logout } from "@/lib/action";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) redirect('/login');

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/votes', {
    headers: { 'Authorization': 'Bearer ' + token.value }
  });
  const data = await res.json();

  const res2 = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/auths/is-admin', {
    headers: { 'Authorization': 'Bearer ' + token.value }
  });
  const data2 = await res2.json();
  return (
    <div className="mx-auto max-w-[600px] p-2">
      {
        data2 ? <div className="flex justify-between w-full pb-4">
          <Link href={'/vote/create'}>
            <Button>Create new vote</Button>
          </Link>
          <Link href={'/user'}>
            <Button>Manage user</Button>
          </Link>
        </div> : null
      }
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Voting Title</TableHead>
            <TableHead className="text-right">Vote</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            data && data.length ? data.map((d: any) => <TableRow key={d._id}>
              <TableCell>{d.title}</TableCell>
              <TableCell className="text-right">
                {
                  data2 ? <Link href={'/vote/' + d.slug + '/result'}>
                    <Button>Check Result</Button>
                  </Link> : <Link href={'/vote/' + d.slug}>
                    <Button>Vote</Button>
                  </Link>
                }
              </TableCell>
            </TableRow>) : null
          }
        </TableBody>
      </Table>
      {
        token ? <Button onClick={logout} variant={'destructive'}>Logout</Button> : null
      }
    </div>
  );
}
