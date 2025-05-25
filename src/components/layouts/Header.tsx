"use client";
import { routes } from "@/constants/routes";
import styles from "@/styles/partials/header.module.scss";
import { clx } from "@/utils/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucidIcon } from "../common/LucidIcon";

export const Header = () => {
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

          <button type="button" className={styles.export}>
            Download User List
            <LucidIcon name="download" size={20} strokeWidth={1.5} />
          </button>
        </nav>
      </div>
    </header>
  );
};

Header.displayName = "Header";
