import { UserList } from "@/components/features/UserList/UserList";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "User List",
};

const UserListPage = () => {
  return (
    <Suspense>
      <UserList />
    </Suspense>
  );
};

export default UserListPage;
