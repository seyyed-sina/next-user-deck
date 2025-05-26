import { LoadingMask } from "@/components/common/loading/LoadingMask";
import styles from "@/components/features/UserDetails/UserDetails.module.scss";

export const UserDetailsSkeleton = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Details</h1>
      <div className={styles.details}>
        <LoadingMask
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        <div className={styles.details__wrapper}>
          <LoadingMask style={{ width: "150px", height: "24px" }} />
          <LoadingMask style={{ width: "80px", height: "16px" }} />
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.contact__grid}>
        <div className={styles.contact}>
          <LoadingMask style={{ width: "50px", height: "24px" }} />
          <LoadingMask style={{ width: "180px", height: "24px" }} />
        </div>
        <div className={styles.contact}>
          <LoadingMask style={{ width: "50px", height: "24px" }} />
          <LoadingMask style={{ width: "180px", height: "24px" }} />
        </div>
      </div>
    </div>
  );
};
