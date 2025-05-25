import { UserList } from "@/components/features/UserList/UserList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User List",
};

const UserListPage = () => {
  return <UserList />
};

export default UserListPage;
