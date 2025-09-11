'use server';

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('token');

    redirect('/login', RedirectType.replace);
}