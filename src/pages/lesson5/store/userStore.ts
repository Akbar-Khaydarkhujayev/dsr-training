// src/store/userStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
    id: string;
    username: string;
    sex: string;
    address: string;
    name: string;
    email: string;
    birthday: string;
}

interface UserStore {
    users: User[];
    addUser: (user: User) => void;
    deleteUser: (id: string) => void;
    updateUserAddress: (id: string, address: string) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            users: [],
            addUser: (user) =>
                set((state) => ({ users: [...state.users, user] })),
            deleteUser: (id) =>
                set((state) => ({
                    users: state.users.filter((u) => u.id !== id),
                })),
            updateUserAddress: (id, address) =>
                set((state) => ({
                    users: state.users.map((u) =>
                        u.id === id ? { ...u, address } : u
                    ),
                })),
        }),
        { name: "user-storage", version: 1 }
    )
);
