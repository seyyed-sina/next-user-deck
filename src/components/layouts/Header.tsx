"use client";
import { routes } from "@/constants/routes";
import { clx } from "@/utils/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/partials/header.module.scss";
import { useUserStore } from "@/store/user-favorite/user-favorite.slice";
import { useShallow } from "zustand/react/shallow";
import { DownloadButton } from "../features/UserList/DownloadButton";

export const Header = () => {
  const visibleUsers = useUserStore(useShallow((state) => state.visibleUsers));
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className={clx("container", styles.wrapper)}>
      <div className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.menu}>
            <li>
              <Link
                href={routes.ROOT}
                className={clx(
                  styles.menu__link,
                  isActive(routes.ROOT) && styles["menu__link-active"],
                )}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={routes.FAVORITES}
                className={clx(
                  styles.menu__link,
                  isActive(routes.FAVORITES) && styles["menu__link-active"],
                )}
              >
                Favorites
              </Link>
            </li>
          </ul>
          {pathname === routes.ROOT && <DownloadButton users={visibleUsers} />}
        </nav>
      </div>
    </header>
  );
};

Header.displayName = "Header";
