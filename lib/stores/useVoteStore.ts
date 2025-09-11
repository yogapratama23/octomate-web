import { create } from "zustand"

type State = {
    voteInput: {
        name: string,
    }
}

type Action = {
    resetInput: () => void,
    setVoteInput: (name: string) => void,
    onPressSubmit: (slug: string) => Promise<void>,
}

const initialState: State = {
    voteInput: {
        name: '',
    }
}

export const useVoteStore = create<State & Action>((set, get) => ({
    ...initialState,
    resetInput: () => set(() => ({ ...initialState })),
    setVoteInput: (name) => set(() => ({ voteInput: { ...get().voteInput, name } })),
    onPressSubmit: async (slug: string) => {
        let token = ''
        const match = document.cookie.match(/(^| )token=([^;]+)/)
        if (match) {
            token = decodeURIComponent(match[2]);
        }

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/votes/cast-vote/' + slug, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
            body: JSON.stringify(get().voteInput),
        });
        
        const res = await data.json();
        if (!res.ok) {
            console.log('failed', res.error);
        }

        console.log(res);
    }
}));
