import LoginPanel from "@/components/login/loginPanel";
import MonthView from "@/components/mainPage/monthView";
import WeekView from "@/components/mainPage/weekView";
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies();
  const userID = cookieStore.get("username")?.value;

  return (
    <div>
      <LoginPanel />
      {/*<WeekView userID={userID} dayInWeek={new Date()}/>*/}
      {<MonthView />}
      <br/>
    </div>
  );
}