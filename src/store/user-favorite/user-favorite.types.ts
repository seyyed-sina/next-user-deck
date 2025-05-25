import type { User } from "@/types";

export interface FavoriteState {
  favorites: User[];
  nationalityFilter: string;
  genderFilter: string | null;
  nameFilter: string
}

export interface FavoriteAction {
  addToFavorites: (user: User) => void;
  removeFromFavorites: (userId: string) => void;
  isFavorite: (userId: string) => boolean;
  setName: (name: string) => void;
  setNationalityFilter: (nationality: string) => void;
  setGenderFilter: (gender: string | null) => void;
}

export type FavoriteStore = FavoriteState & FavoriteAction;
