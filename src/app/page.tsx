import { UserList } from "@/components/features/UserList/UserList";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <UserList />
    </Suspense>
  );
}
