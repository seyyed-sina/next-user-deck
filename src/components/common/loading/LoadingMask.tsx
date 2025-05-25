import { memo, FC } from "react";
import { clx } from "@/utils/styles";
import styles from "@/styles/partials/loading-mask.module.scss";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export const LoadingMask: FC<Props> = memo(({ className, style }) => {
  const maskClass = clx(styles.mask, className);

  return <div className={maskClass} style={style} />;
});

LoadingMask.displayName = "LoadingMask";
