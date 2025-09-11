'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useVoteStore } from "@/lib/stores/useVoteStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VoteForm({ voteData, slug }: { voteData: any, slug: string }) {
    const {
        voteInput,
        setVoteInput,
        resetInput,
        onPressSubmit
    } = useVoteStore();

    const router = useRouter();

    const [newOption, setNewOption] = useState('');

    const onSubmit = async () => {
        await onPressSubmit(slug);
        resetInput();
        setNewOption('');
        router.replace('/');
    }
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="mx-auto max-w-[600px] px-2">
                {
                    voteData ? <>
                        <p className="text-xl font-semibold pb-4">{voteData.title}</p>
                        <RadioGroup value={voteInput.name} onValueChange={(v) => setVoteInput(v)}>
                            {
                                voteData.options.map((o: any) => <div key={o._id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={o.name} id={o.id} />
                                    <Label htmlFor={o.id}>{o.name}</Label>
                                </div>)
                            }
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value={newOption} id={'new-option'} />
                                <Input onChange={(e) => {
                                    setNewOption(e.target.value)
                                    setVoteInput(e.target.value)
                                }} disabled={ voteInput.name !== newOption } value={newOption} />
                            </div>
                        </RadioGroup>
                    </> : null
                }
                <Button className="mt-6" type="submit" disabled={ voteInput.name === '' } onClick={onSubmit}>Send Vote</Button>
            </div>
        </div>
    )
}