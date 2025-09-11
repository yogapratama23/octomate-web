import { create } from "zustand"

type State = {
    registerInput: {
        name: string;
        email: string;
        password: string;
    }
}

type Action = {
    resetInput: () => void,
    setName: (name: string) => void,
    setEmail: (email: string) => void,
    setPassword: (password: string) => void,
    onPressRegister: () => Promise<void>,
    addUser: () => Promise<boolean>,
}

const initialState: State = {
    registerInput: {
        name: '',
        email: '',
        password: '',
    }
}

export const useRegisterStore = create<State & Action>((set, get) => ({
    ...initialState,
    resetInput: () => set(() => ({ ...initialState })),
    setName: (name) => set((state) => ({ registerInput: { ...state.registerInput, name } })),
    setEmail: (email) => set((state) => ({ registerInput: { ...state.registerInput, email } })),
    setPassword: (password) => set((state) => ({ registerInput: { ...state.registerInput, password } })),
    onPressRegister: async () => {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/auths/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(get().registerInput),
        })
        const data = await res.json();
        if (!res.ok) {
            console.log('failed >>> ', data)
        }
        document.cookie = `token=${data.access_token}; path:/; max-age=${7 * 24 * 60 * 60}`;

        return;
    },
    addUser: async () => {
        let token = ''
        const match = document.cookie.match(/(^| )token=([^;]+)/)
        if (match) {
            token = decodeURIComponent(match[2]);
        }

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/auths/register', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' },
            body: JSON.stringify(get().registerInput)
        });
        
        const res = await data.json();
        if (!data.ok) {
            console.log('failed', res);
            return false;
        }

        return true;
    }
}));