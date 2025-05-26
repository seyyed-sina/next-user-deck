"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { User } from "@/types";
import { clx } from "@/utils/styles";
import { LucidIcon } from "@/components/common/LucidIcon";
import { formatAddress } from "@/utils/formatter";
import { useUserStore } from "@/store/user-favorite/user-favorite.slice";
import styles from "./UserDetails.module.scss";

interface UserDetailsProps {
  user: User;
}

export const UserDetails = ({ user }: UserDetailsProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useUserStore();
  const isUserFavorite = isFavorite(user.login.uuid);

  const toggleFavorite = () => {
    if (isUserFavorite) {
      removeFromFavorites(user.login.uuid);
    } else {
      addToFavorites(user);
    }
  };

  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <button
          type="button"
          className={styles.back}
          aria-label="Back"
          title="Back"
          onClick={() => router.back()}
        >
          <LucidIcon name="chevron-left" size={20} />
        </button>
        User Details
      </h1>
      <div className={styles.details}>
        <div className={styles.avatar__wrapper}>
          <Image
            src={user.picture.large}
            alt={`${user.name.first} ${user.name.last}`}
            className={styles.avatar}
            width={100}
            height={100}
            quality={100}
            priority
          />
        </div>
        <div className={styles.details__wrapper}>
          <h2 className={styles.username}>
            {user.name.first} {user.name.last}
          </h2>
          <a href={`mailto:${user.email}`} className={styles.email}>
            {user.email}
          </a>
        </div>
        <button
          type="button"
          aria-label={
            isUserFavorite ? "Remove from favorites" : "Add to favorites"
          }
          title={isUserFavorite ? "Remove from favorites" : "Add to favorites"}
          className={clx(
            styles.favorite_btn,
            isUserFavorite && styles.favorite_btn_active,
          )}
          onClick={toggleFavorite}
        >
          {isUserFavorite ? (
            <LucidIcon
              name="heart"
              strokeWidth={1.5}
              absoluteStrokeWidth
              className={clx(styles.fav_icon, styles.favored)}
            />
          ) : (
            <LucidIcon
              name="heart"
              strokeWidth={1.5}
              absoluteStrokeWidth
              className={clx(styles.fav_icon, styles.fav)}
            />
          )}
        </button>
      </div>
      <div className={styles.divider} />
      <div className={styles.contact__grid}>
        <div className={styles.contact}>
          <h3 className={styles.contact__title}>Phone</h3>
          <a href={`tel:${user.phone}`} className={styles.contact__text}>
            {user.phone}
          </a>
        </div>
        <div className={styles.contact}>
          <h3 className={styles.contact__title}>Location</h3>
          <span className={styles.contact__text}>
            {formatAddress(user.location)}
          </span>
        </div>
      </div>
    </div>
  );
};

UserDetails.displayName = "UserDetails";
