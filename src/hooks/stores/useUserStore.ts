import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface IUser {
    email? : string | null | undefined;
    id? : string | null | undefined;
    role? : string | null | undefined;
    username? : string | null | undefined;
    is_confirmed : boolean;
    is_authentificated : boolean;
}

interface IUserMutator {
    updateUser : (newUser : Partial<IUser>) => void;
    deleteUser : () => void;
}

// https://docs.pmnd.rs/zustand/guides/immutable-state-and-merging
// https://docs.pmnd.rs/zustand/integrations/persisting-store-data
// https://stackoverflow.com/questions/69814018/zustand-typescript-persist-how-to-type-store
// I spent 30 minutes on this!

export const useUserStore = create(
    persist<IUser & IUserMutator>(
        (set) => ({
            is_confirmed : false,
            is_authentificated : false,
            updateUser : (newUser) => set((previousState) => ({...previousState, ...newUser})),
            deleteUser : () => set((previousState) => (
                {
                    ...previousState, 
                    email : null, 
                    id : null, 
                    is_authentificated : false,
                    is_confirmed : false, 
                    role : null
                }
            ))
        }),
        {
            name : 'user',
            storage : createJSONStorage(() => sessionStorage)
        }
    )    
);
