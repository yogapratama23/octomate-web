import { create } from "zustand"

type State = {
    createVoteInput: {
        title: string,
        description: string,
        options: any[],
    }
}

type Action = {
    resetInput: () => void,
    setVoteTitle: (title: string) => void,
    setVoteDescription: (description: string) => void,
    addOption: (option: string) => void,
    submitVote: () => Promise<void>,
    removeOption: (index: number) => void,
}

const initialState: State = {
    createVoteInput: {
        title: '',
        description: '',
        options: [],
    }
}

export const useCreateVoteStore = create<State & Action>((set, get) => ({
    ...initialState,
    resetInput: () => set(() => ({ ...initialState })),
    setVoteTitle: (title) => set(() => ({ createVoteInput: { ...get().createVoteInput, title } })),
    setVoteDescription: (description) => set(() => ({ createVoteInput: { ...get().createVoteInput, description } })),
    addOption: (option) => {
        const voteInput = get().createVoteInput
        voteInput.options.push(option);

        set(() => ({ createVoteInput: voteInput }));
    },
    submitVote: async () => {
        let token = ''
        const match = document.cookie.match(/(^| )token=([^;]+)/)
        if (match) {
            token = decodeURIComponent(match[2]);
        }

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/votes', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
            body: JSON.stringify(get().createVoteInput),
        });
        
        const res = await data.json();
        if (!res.ok) {
            console.log('failed', res.error);
        }

        console.log(res);
    },
    removeOption: (index) => {
        const voteInput = get().createVoteInput;
        voteInput.options.splice(index, 1);

        set(() => ({ createVoteInput: voteInput }));
    }
}))