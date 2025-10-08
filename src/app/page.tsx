import Landingpage from "@/components/LandingPage/Landingpage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardPage from "./(dashboard)/page";


export default async function Main() {

const session = await getServerSession(authOptions)


  return session ? <DashboardPage /> : <Landingpage />;
}
