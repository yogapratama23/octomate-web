import { create } from "zustand"

type State = {
    loginInput: {
        email: string;
        password: string;
    }
}

type Action = {
    resetInput: () => void,
    setEmail: (email: string) => void,
    setPassword: (password: string) => void,
    onPressLogin: () => Promise<boolean>,
}

const initialState: State = {
    loginInput: {
        email: '',
        password: '',
    }
}

export const useLoginStore = create<State & Action>((set, get) => ({
    ...initialState,
    resetInput: () => set(() => ({ ...initialState })),
    setEmail: (email) => set((state) => ({ loginInput: { ...state.loginInput, email } })),
    setPassword: (password) => set((state) => ({ loginInput: { ...state.loginInput, password } })),
    onPressLogin: async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/auths/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(get().loginInput),
        })
        const data = await res.json();
        if (!res.ok) {
            console.log('failed >>> ', data)
            return false;
        }
        document.cookie = `token=${data.access_token}; path:/; max-age=${7 * 24 * 60 * 60}`;

        return true;
    },
}));