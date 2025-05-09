'use client'
import LoginPanel from "@/components/login/loginPanel";
import MonthView from "@/components/mainPage/monthView";
import { useState } from "react";
import NavSide from "@/components/layout/navSide";

export default function Home() {
  //State and function to handle calendar visibility
  const[visTog,setVisTog] = useState(false);

  function toggleVis()
  {
    setVisTog(!visTog);
  }
  return (<>
      <NavSide toggleVis={toggleVis}/>
      <div id="layoutBody">
      <LoginPanel />
      <MonthView />
    </div>
    </>
  );
}