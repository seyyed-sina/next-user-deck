"use client";
import { useEffect, useMemo, useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useUsers } from "@/hooks/use-users";
import { UserCard } from "../UserCard/UserCard";
import { LoadingSpinner } from "../../common/loading/LoadingSpinner";
import { Filters } from "../Filters/Filters";
import type { User } from "@/types";
import { useUserStore } from "@/store/user-favorite/user-favorite.slice";
import { UserCardLoading } from "../UserCard/UserCardLoading";
import styles from "./UserList.module.scss";

export const UserList = () => {
  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUsers();

  const setVisibleUsers = useUserStore((state) => state.setVisibleUsers);

  const allUsers = useMemo(
    () => (data ? data.pages.flatMap((page) => page.results) : []),
    [data],
  );

  const parentRef = useRef<HTMLDivElement>(null);
  const currentUsersRef = useRef<User[]>([]);

  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? allUsers.length + 1 : allUsers.length,
    estimateSize: () => 156,
    overscan: 5,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
  });

  useEffect(() => {
    const virtualItems = virtualizer.getVirtualItems();
    currentUsersRef.current = virtualItems
      .filter((item) => item.index < allUsers.length)
      .map((item) => allUsers[item.index]);
    setVisibleUsers(currentUsersRef.current);
  }, [allUsers, virtualizer, setVisibleUsers]);

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allUsers.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allUsers.length,
    isFetchingNextPage,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    virtualizer.getVirtualItems(),
    virtualizer,
  ]);

  if (status === "error")
    return <div className={styles.error}>Error fetching users</div>;

  return (
    <div ref={parentRef} className={styles.container}>
      <h1 className={styles.title}>
        User List
        <Filters />
      </h1>

      {status === "pending" && (
        <UserCardLoading count={5} className={styles.loadingCard} />
      )}

      <div
        style={{
          minHeight: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {status === "success" &&
          virtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > allUsers.length - 1;
            const user = allUsers[virtualRow.index];

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
                    virtualRow.start - virtualizer.options.scrollMargin
                  }px)`,
                }}
              >
                {isLoaderRow ? (
                  hasNextPage ? (
                    <div className={styles["user-list__loading"]}>
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <div className={styles.last}>
                      You&apos;ve reached the end
                    </div>
                  )
                ) : (
                  <UserCard user={user} index={virtualRow.index} />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
