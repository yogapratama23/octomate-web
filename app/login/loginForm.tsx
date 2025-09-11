'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginStore } from "@/lib/stores/useLoginStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const {
        loginInput,
        resetInput,
        setEmail,
        setPassword,
        onPressLogin,
    } = useLoginStore();

    const router = useRouter();

    const onPressButtonLogin = async () => {
        const callLogin = await onPressLogin();
        
        if (callLogin) {
            resetInput();
            router.replace('/');
        }
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="flex flex-col gap-4 w-full max-w-[480px]">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" value={loginInput.email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" value={loginInput.password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="*********" />
                </div>
                <Button type="submit" onClick={onPressButtonLogin}>Login</Button>
                <Link href={'/register'} className="text-sm self-end hover:opacity-50">You don't have an account yet? register here!</Link>
            </div>
        </div>
    )
}