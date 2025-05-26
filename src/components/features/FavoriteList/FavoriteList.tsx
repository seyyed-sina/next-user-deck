"use client";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@/store/user-favorite/user-favorite.slice";
import { UserCard } from "../UserCard/UserCard";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import userListStyles from "../UserList/UserList.module.scss";
import styles from "./favorite.module.scss";

export const FavoriteList = () => {
  const favorites = useUserStore(useShallow((state) => state.favorites));

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useWindowVirtualizer({
    count: favorites.length,
    estimateSize: () => 156,
    overscan: 5,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }
  }, [
    favorites.length,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    rowVirtualizer.getVirtualItems(),
    rowVirtualizer,
  ]);

  return (
    <div ref={parentRef} className={userListStyles.container}>
      <h1 className={userListStyles.title}>
        Favorite List{" "}
        <span className={styles.count}>{favorites.length} items</span>
      </h1>

      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          // const isLoaderRow = virtualRow.index > favorites.length - 1;
          const user = favorites[virtualRow.index];

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${
                  virtualRow.start - rowVirtualizer.options.scrollMargin
                }px)`,
              }}
            >
              <UserCard user={user} index={virtualRow.index} />
            </div>
          );
        })}
      </div>

      {favorites.length === 0 && (
        <div className={styles.empty}>Favorite list is empty</div>
      )}
    </div>
  );
};

FavoriteList.displayName = "FavoriteList";
