'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateVoteStore } from "@/lib/stores/useCreateVoteStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateVotePage() {
    const {
        createVoteInput,
        setVoteTitle,
        setVoteDescription,
        addOption,
        resetInput,
        submitVote,
        removeOption,
    } = useCreateVoteStore();

    const router = useRouter();

    const [newOption, setNewOption] = useState('');
    const onPressAddOption = () => {
        addOption(newOption);
        setNewOption('');
    }

    const onPressCreateVote = async () => {
        await submitVote();
        resetInput();
        router.replace('/');
    }
    return (
        <div className="mx-auto max-w-[600px] p-2">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="title">Vote Title</Label>
                    <Input type="title" id="title" value={createVoteInput.title} onChange={(e) => setVoteTitle(e.target.value)} placeholder="Vote title" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Vote Description</Label>
                    <Input type="description" id="description" value={createVoteInput.description} onChange={(e) => setVoteDescription(e.target.value)} placeholder="Vote description" />
                </div>
                <div className="flex flex-row gap-2">
                    <Input value={newOption} onChange={(e) => setNewOption(e.target.value)} />
                    <Button variant={'outline'} disabled={ newOption === '' } onClick={onPressAddOption}>Add Option</Button>
                </div>
                <div>
                    {
                        createVoteInput.options.length ? createVoteInput.options.map((o: string, i) => (
                            <div key={i} className="flex flex-row gap-2">
                                <p>{o}</p>
                                <button onClick={() => removeOption(i)} className="text-red-500 rounded-full">x</button>
                            </div>
                        )) : null
                    }
                </div>
                <Button onClick={onPressCreateVote} disabled={ createVoteInput.options.length === 0 }>Create Vote</Button>
            </div>
        </div>
    )
}