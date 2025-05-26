import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchUser } from "@/services/user";
import { UserDetails } from "@/components/features/UserDetails/UserDetails";
import { routes } from "@/constants/routes";
import { UserDetailsSkeleton } from "@/app/page-skeleton";

type Params = Promise<{ user_id: string }>;

export const generateMetadata = async (props: { params: Params }) => {
  try {
    const { user_id } = await props.params;
    const user = await fetchUser(user_id);

    if (!user) {
      return {
        title: "User not found",
      };
    }

    return {
      title: `${user.name.first} ${user.name.last}`,
      openGraph: {
        title: `${user.name.first} ${user.name.last}`,
        url: `${routes.USER_LIST}/${user.login.uuid}`,
        images: [
          {
            url: user.picture.large,
            width: 800,
            height: 600,
          },
        ],
      },
      alternates: {
        canonical: `${routes.USER_LIST}/${user.login.uuid}`,
      },
    } as Metadata;
  } catch (error) {
    console.error(error);
    return {
      title: "User not found",
    };
  }
};

const UserDetailsPage = async (props: Readonly<{ params: Params }>) => {
  const { user_id } = await props.params;
  const user = await fetchUser(user_id);

  if (!user) {
    notFound();
  }

  return (
    <Suspense fallback={<UserDetailsSkeleton />}>
      <UserDetails user={user} />
    </Suspense>
  );
};

export default UserDetailsPage;
