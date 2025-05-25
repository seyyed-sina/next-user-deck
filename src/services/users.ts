import { apiEndpoint } from "@/constants/api";
import type { UserResponse } from "@/types";

interface Params {
  pageParam?: number;
  nationality?: string;
  gender?: string | null;
}

export const fetchUsers = async ({
  pageParam = 1,
  nationality,
  gender,
}: Params): Promise<UserResponse> => {
  // Reset pageParam to 1 if nationality or gender is provided
  if (nationality || gender) {
    pageParam = pageParam || 1;
  }

  let url = apiEndpoint.BASE_URL + `?page=${pageParam}&results=10`;

  if (nationality) {
    url += `&nat=${nationality}`;
  }

  if (gender) {
    url += `&gender=${gender}`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};
