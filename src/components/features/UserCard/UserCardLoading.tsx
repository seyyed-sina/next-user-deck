import { clx, getOpacityStyle } from "@/utils/styles";
import styles from "./UserCard.module.scss";
import { LoadingMask } from "../../common/loading/LoadingMask";

const UserCardSkeleton = ({
  style,
  className,
}: {
  style?: React.CSSProperties;
  className?: string;
}) => {
  return (
    <div className={clx(styles.card, className)} style={style}>
      <LoadingMask className={styles.avatar} />
      <div className={styles.content}>
        <div className={styles.name__wrapper}>
          <LoadingMask style={{ width: "35%", height: 22 }} />
          <LoadingMask style={{ width: "60%", height: 22, marginTop: 4 }} />
        </div>
        <div className={styles.details}>
          <LoadingMask style={{ width: "35%", height: 24 }} />
          <LoadingMask style={{ width: "60%", height: 24 }} />
          <LoadingMask style={{ width: "35%", height: 20 }} />
        </div>
      </div>
    </div>
  );
};

export const UserCardLoading = ({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) => {
  return (
    <>
      {Array.from({ length: count })
        .map((_, index) => (
          <UserCardSkeleton
            key={index}
            style={getOpacityStyle(index, count)}
            className={className}
          />
        ))
        .reverse()}
    </>
  );
};

UserCardLoading.displayName = "UserCardLoading";
