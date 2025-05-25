import { FavoriteList } from "@/components/features/FavoriteList/FavoriteList";
import { Suspense } from "react";

const FavoritePage = () => {
  return (
    <Suspense>
      <FavoriteList />
    </Suspense>
  );
};

export default FavoritePage;
