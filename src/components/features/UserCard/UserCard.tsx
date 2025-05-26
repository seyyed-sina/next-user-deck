import { useUserStore } from "@/store/user-favorite/user-favorite.slice";
import type { User } from "@/types";
import Image from "next/image";
import { clx } from "@/utils/styles";
import { LucidIcon } from "../../common/LucidIcon";
import { capitalize, formatAddress } from "@/utils/formatter";
import styles from "./UserCard.module.scss";
import Link from "next/link";

interface UserCardProps {
  user: User;
  index: number;
}

export const UserCard = ({ user, index }: UserCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useUserStore();
  const isUserFavorite = isFavorite(user.login.uuid);

  const toggleFavorite = () => {
    if (isUserFavorite) {
      removeFromFavorites(user.login.uuid);
    } else {
      addToFavorites(user);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.index}>{index + 1}</div>
      <Link href={`/users/${user.login.uuid}`} className={styles.avatar}>
        <Image
          src={user.picture.medium}
          alt={`${user.name.first} ${user.name.last}`}
          className={styles.avatar__image}
          width={42}
          height={42}
        />
      </Link>
      <div className={styles.content}>
        <div className={styles.name__wrapper}>
          <h2 className={styles.name}>
            <Link href={`/users/${user.login.uuid}`}>
              {user.name.first} {user.name.last}
            </Link>
          </h2>
          <span className={styles.username}>
            {user.login.username} / {capitalize(user.gender)}
          </span>
        </div>
        <div className={styles.details}>
          <div className={styles.details__item}>
            <LucidIcon
              name="flame"
              className={styles["details__item-icon"]}
              color="var(--color-orange)"
            />
            <span className={styles.phone}>{user.phone}</span>
          </div>
          <div className={styles.details__item}>
            <LucidIcon
              name="book-marked"
              className={styles["details__item-icon"]}
              color="var(--color-gray-500)"
            />
            <span className={styles.email}>{user.email}</span>
          </div>
          <span className={clx(styles.details__item, styles.location)}>
            {formatAddress(user.location)}
          </span>
        </div>
      </div>
      <div
        className={styles.flag}
        title={user.location.country}
        aria-label={user.location.country}
      >
        <Image
          src={`https://flagcdn.com/w20/${user.nat.toLowerCase()}.png`}
          alt={`${user.nat} flag`}
          className={styles.flag__image}
          width={20}
          height={13}
        />
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
  );
};
