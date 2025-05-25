"use client";
import { FC, useEffect, useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useUsers } from "@/hooks/use-users";
import { UserCard } from "../UserCard/UserCard";
import { LoadingSpinner } from "../../common/loading/LoadingSpinner";
import { Filters } from "../Filters/Filters";
import { UserCardLoading } from "../UserCard/UserCardLoading";
import styles from "./UserList.module.scss";

export const UserList: FC = () => {
  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUsers();

  const allUsers = data ? data.pages.flatMap((page) => page.results) : [];

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useWindowVirtualizer({
    count: hasNextPage ? allUsers.length + 1 : allUsers.length,
    estimateSize: () => 148,
    overscan: 5,
    scrollMargin: parentRef.current?.offsetTop ?? 0,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

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
    rowVirtualizer.getVirtualItems(),
    rowVirtualizer,
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
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {status === "success" &&
          rowVirtualizer.getVirtualItems().map((virtualRow) => {
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
                    virtualRow.start - rowVirtualizer.options.scrollMargin
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
