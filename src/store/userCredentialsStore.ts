import {create} from 'zustand';
import { persist } from "zustand/middleware";
import {UserCredential} from 'firebase/auth';

interface UserCredentialsState {
    userCredentials: UserCredential | null;
    setUserCredentials: (credentials: UserCredential | null) => void;
}

export const useUserCredentialsStore = create<UserCredentialsState>((set) => ({
    userCredentials: null,
    setUserCredentials: (credentials) => set({ userCredentials: credentials }),
}));