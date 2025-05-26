import type { User } from "@/types";
import { clx } from "@/utils/styles";
import { downloadCSV, downloadJSON } from "@/utils/formatter";
import styles from "@/styles/partials/header.module.scss";
interface DownloadButtonProps {
  users: User[];
  format?: "json" | "csv";
  className?: string;
}

export const DownloadButton = ({
  users,
  format = "json",
  className,
}: DownloadButtonProps) => {
  const handleDownload = () => {
    if (users.length === 0) return;

    const fileName = `users-${new Date().toISOString().replace(/:/g, "-")}.${format}`;
    if (format === "csv") {
      downloadCSV(users, fileName);
    } else {
      downloadJSON(users, fileName);
    }
  };

  return (
    <button
      type="button"
      className={clx(styles.export, className)}
      onClick={handleDownload}
    >
      Export {format.toUpperCase()}
    </button>
  );
};

DownloadButton.displayName = "DownloadButton";
