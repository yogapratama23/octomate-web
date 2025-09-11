import { create } from "zustand"

type State = {
    users: any[],
}

type Action = {
    fetchUsers: () => Promise<void>,
    deleteUser: (id: string) => Promise<void>,
}

const initialState = {
    users: [],
}

export const useUserStore = create<State & Action>((set, get) => ({
    ...initialState,
    fetchUsers: async () => {
        let token = ''
        const match = document.cookie.match(/(^| )token=([^;]+)/)
        if (match) {
            token = decodeURIComponent(match[2]);
        }

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token },
        });
        
        const res = await data.json();
        if (!res.ok) {
            console.log('failed', res.error);
        }

        set(() => ({ users: res }));
    },
    deleteUser: async (id) => {
        let token = ''
        const match = document.cookie.match(/(^| )token=([^;]+)/)
        if (match) {
            token = decodeURIComponent(match[2]);
        }

        const data = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users/' + id, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token },
        });
        
        const res = await data.json();
        if (!res.ok) {
            console.log('failed', res.error);
        }
    }
}))