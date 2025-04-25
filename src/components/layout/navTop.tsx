'use client';
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
export default function NavTop()
{
    //To prevent hydration error
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
      setIsClient(true)
    }, [])
    const cookies = new Cookies(null, { path: "/" });
    var logoutButton = <button id="logoutButton" onClick={logout}>Log Out</button>
    function logout()
    {
        cookies.remove("username");
        window.location.reload();
    }
    if(cookies.get("username") == undefined) logoutButton = <></>;
    return(<>{isClient?
    <div id="navTop">
        {logoutButton}
    </div>:<></>}</>);
}

