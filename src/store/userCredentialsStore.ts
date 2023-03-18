import {create} from 'zustand';
import {UserCredential} from 'firebase/auth';

interface UserCredentialsState {
    userCredentials: UserCredential | null;
    setUserCredentials: (credentials: UserCredential) => void;
}

export const useUserCredentialsStore = create<UserCredentialsState>((set) => ({
    userCredentials: null,
    setUserCredentials: (credentials) => set({ userCredentials: credentials }),
}));