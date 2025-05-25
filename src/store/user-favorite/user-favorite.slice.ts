import { create } from "zustand";
import type { FavoriteState, FavoriteStore } from "./user-favorite.types";
import { createJSONStorage, persist } from "zustand/middleware";

const initialState: FavoriteState = {
  favorites: [],
  nameFilter: "",
  nationalityFilter: "",
  genderFilter: null,
};

export const useUserStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      addToFavorites: (user) =>
        set((state) => ({ favorites: [...state.favorites, user] })),
      removeFromFavorites: (userId) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (user) => user.login.uuid !== userId,
          ),
        })),
      isFavorite: (userId) =>
        get().favorites.some((user) => user.login.uuid === userId),
      setNationalityFilter: (nationality) =>
        set({ nationalityFilter: nationality }),
      setGenderFilter: (gender) => set({ genderFilter: gender }),
      setName: (name) => set({ nameFilter: name }),
    }),
    {
      name: "user-favorites",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }), // Only persist favorites
    },
  ),
);
