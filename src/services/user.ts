import { apiEndpoint } from "@/constants/api";
import type { User, UserResponse } from "@/types";

interface Params {
  page?: string;
  nat?: string;
  gender?: string | null;
  seed?: string;
  results?: string;
  format?: "json" | "csv";
}

/**
 * Fetches a list of users from the Random User API.
 * @param {Object} params - Parameters to pass to the API.
 * @param {string} [params.page] - Page number to fetch.
 * @param {string} [params.nat] - Nationality to filter by.
 * @param {string|null} [params.gender] - Gender to filter by.
 * @param {string} [params.seed] - Seed for the API.
 * @param {string} [params.results] - Number of results to return.
 * @param {"json"|"csv"} [params.format] - Format of the response.
 * @returns {Promise<UserResponse>} - Promise that resolves with the API response.
 */
export const fetchUsers = async ({
  page,
  nat,
  gender,
  seed,
  results,
  format,
}: Params): Promise<UserResponse> => {
  const queryParams = new URLSearchParams();

  // Add all provided params to the query string
  Object.entries({ page, nat, gender, seed, results, format }).forEach(
    ([key, value]) => {
      if (value) queryParams.append(key, value);
    },
  );

  const url = apiEndpoint.BASE_URL + `/?${queryParams.toString()}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    return (await response.json()) as UserResponse;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUser = async (uuid: string): Promise<User | null> => {
  const url = apiEndpoint.BASE_URL + `/?seed=${uuid}&results=1`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;

    return data.results[0];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
