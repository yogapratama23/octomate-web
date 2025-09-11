import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import LoginForm from "./loginForm";

export default async function Login() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    if (token) redirect('/');
    return <LoginForm />
}
