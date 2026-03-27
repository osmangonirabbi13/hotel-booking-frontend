// components/NavbarWrapper.tsx

import { getUserInfo } from "@/services/auth.service";
import Navbar from "./navbar";


export default async function NavbarWrapper() {
  const user = await getUserInfo(); 

  return <Navbar user={user} />;
}