import { queryKey } from "@/constants/query-key";
import { fetchUsers } from "@/services/users";
import { useUserStore } from "@/store/user-favorite/user-favorite.slice";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useUsers = () => {
  const searchparams = useSearchParams();
  const natParams = searchparams.get("nat");
  const genderParams = searchparams.get("gender");

  const nationalityFilter =
    useUserStore((state) => state.nationalityFilter) || natParams;
  const genderFilter =
    useUserStore((state) => state.genderFilter) || genderParams;

  return useInfiniteQuery({
    queryKey: [queryKey.USERS, nationalityFilter, genderFilter],
    queryFn: ({ pageParam }) =>
      fetchUsers({
        pageParam,
        nationality: nationalityFilter || undefined,
        gender: genderFilter || undefined,
      }),
    getNextPageParam: (lastPage) => lastPage.info.page + 1,
    initialPageParam: 1,
  });
};
