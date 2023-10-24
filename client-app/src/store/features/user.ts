import { router } from "@/app/router/Router";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from 'zustand/middleware/immer'

import agent from "@/lib/agent";
import useModalStore from "./modal";

type State = {
  user: User | null;
}

type Action = {
  isLoggedIn: () => boolean
  login: (user: UserFormValues) => Promise<void>
  register: (user: UserFormValues) => Promise<void>
  logout: () => void
  setImage: (imageUrl: string) => void
}

const useUserStore = create(
  persist(
    immer<State & Action>((set, get) => ({
      user: null,
    
      isLoggedIn: () => {
        return !!get().user;
      },

      login: async (user: UserFormValues) => {
        const _user = await agent.Account.login(user);
        set((state) => {
          state.user = _user;
        });

        useModalStore.getState().closeModal();
        router.navigate('/activities');
      },

      register: async (user: UserFormValues) => {
        const _user = await agent.Account.register(user);
        set((state) => {
          state.user = _user;
        });

        useModalStore.getState().closeModal();
        router.navigate('/activities');
      },
      
      logout: () => {
        set((state) => {
          state.user = null;
        });

        router.navigate('/');
      },

      setImage: (imageUrl) => {
        set((state) => {
          if (state.user) {
            state.user.image = imageUrl;
          }
        })
      }

     })),
     {
      name: 'user-store',
      storage: createJSONStorage(() => sessionStorage),
     }
  )
)

export default useUserStore;