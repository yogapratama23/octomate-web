'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterStore } from "@/lib/stores/useRegisterStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const {
        setEmail,
        setName,
        setPassword,
        registerInput,
        onPressRegister,
        resetInput
    } = useRegisterStore();

    const router = useRouter();

    const onPressButtonRegister = async () => {
        await onPressRegister();
        resetInput();

        router.replace('/');
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="flex flex-col gap-4 w-full max-w-[480px]">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="name" value={registerInput.name} onChange={(e) => setName(e.target.value)} id="name" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" value={registerInput.email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" value={registerInput.password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="*********" />
                </div>
                <Button onClick={onPressButtonRegister}>Register</Button>
                <Link href={'/login'} className="text-sm self-end hover:opacity-50">Already have an account? Login here!</Link>
            </div>
        </div>
    )
}