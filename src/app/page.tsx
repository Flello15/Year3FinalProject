import LoginPanel from "@/components/loginPage/loginPanel";
import MonthView from "@/components/mainPage/monthView";
import WeekView from "@/components/mainPage/weekView";
export default function Home() {
  return (
    <div>
      <LoginPanel />
      <MonthView month={3} year={2025}/>
      <br/>
      <main>
        <p>This is the root page. It is the first displayed on load, and is contained within the layout.\n
          When signed in, this should show the calendar. If not signed in, either an "advert" screen, or just redirect.\n
          Note for sign in, needs a different layout, as this will contain the navbars
        </p>
      </main>
      <WeekView dayInWeek={new Date(2025,3,30)}/>
    </div>
  );
}
