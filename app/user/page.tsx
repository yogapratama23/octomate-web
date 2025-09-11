'use client';

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUserStore } from "@/lib/stores/useUserStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserPage() {
    const {
        users,
        fetchUsers,
        deleteUser,
    } = useUserStore();

    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const onPressDeleteUser = async (id: string) => {
        await deleteUser(id);
        router.refresh();
    }
    return (
        <div className="mx-auto max-w-[600px] p-2">
            <Link href={'/user/create'}>
                <Button>Create new user</Button>
            </Link>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Users</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {
                    users.length ? users.map((u: any) => <TableRow key={u._id}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell className="text-right">
                        <Button onClick={() => onPressDeleteUser(u._id)} variant={'destructive'}>Delete</Button>
                    </TableCell>
                    </TableRow>) : null
                }
                </TableBody>
            </Table>
        </div>
    )
}