import { LucidIcon } from "@/components/common/LucidIcon";
import styles from "./ScrollTop.module.scss";

export const ScrollTop = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div role="button" className={styles.button} onClick={handleClick}>
      <LucidIcon name="chevron-up" />
    </div>
  );
};

ScrollTop.displayName = "ScrollTop";
