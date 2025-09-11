import { cookies } from "next/headers"

export const saveCookie = async(key: string, value: string): Promise<void> => {
    const cookieStore = await cookies();
    cookieStore.set(key, value);
    return;
}

export const getCookie = async(key: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(key);
}
