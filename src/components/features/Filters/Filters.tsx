"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/user-favorite/user-favorite.slice";
import styles from "./Filters.module.scss";

const NATIONALITIES = [
  { value: "", label: "All Nationalities" },
  { value: "AU", label: "Australian" },
  { value: "BR", label: "Brazilian" },
  { value: "CA", label: "Canadian" },
  { value: "CH", label: "Swiss" },
  { value: "DE", label: "German" },
  { value: "DK", label: "Danish" },
  { value: "ES", label: "Spanish" },
  { value: "FI", label: "Finnish" },
  { value: "FR", label: "French" },
  { value: "GB", label: "British" },
  { value: "IE", label: "Irish" },
  { value: "IN", label: "Indian" },
  { value: "IR", label: "Iranian" },
  { value: "MX", label: "Mexican" },
  { value: "NL", label: "Dutch" },
  { value: "NO", label: "Norwegian" },
  { value: "NZ", label: "New Zealand" },
  { value: "RS", label: "Serbian" },
  { value: "TR", label: "Turkish" },
  { value: "UA", label: "Ukrainian" },
  { value: "US", label: "American" },
];

const GENDERS = [
  { value: "", label: "All Genders" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

type FiltersParams = "gender" | "nat";

export const Filters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const genderParam = searchParams.get("gender") || "";
  const natParam = searchParams.get("nat") || "";
  const setGenderFilter = useUserStore((state) => state.setGenderFilter);
  const setNationalityFilter = useUserStore(
    (state) => state.setNationalityFilter,
  );

  /**
   * Handle a change in the select dropdowns.
   *
   * @param {string} value - The new value of the select dropdown.
   * @param {FiltersParams} params - The name of the select dropdown, either "gender" or "nat".
   */
  const handleSelectChange = (value: string, params: FiltersParams): void => {
    const urlParams = new URLSearchParams(searchParams);

    if (value) {
      urlParams.set(params, value);
    } else {
      urlParams.delete(params);
    }
    if (params === "nat") {
      setNationalityFilter(value);
    }
    if (params === "gender") {
      setGenderFilter(value);
    }
    replace(`${pathname}?${urlParams.toString()}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.filter_group}>
        <label htmlFor="nat" className={styles.filter_group__label}>
          Nationality:
        </label>
        <select
          id="nat"
          className={styles.select}
          defaultValue={natParam}
          onChange={(e) => handleSelectChange(e.target.value, "nat")}
        >
          {NATIONALITIES.map((nat) => (
            <option key={nat.value} value={nat.value}>
              {nat.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filter_group}>
        <label htmlFor="gender" className={styles.filter_group__label}>
          Gender:
        </label>

        <select
          id="gender"
          className={styles.select}
          defaultValue={genderParam}
          onChange={(e) => handleSelectChange(e.target.value, "gender")}
        >
          {GENDERS.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
