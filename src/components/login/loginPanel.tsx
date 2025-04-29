'use client';
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import loginUser from "./loginUser";
export default function LoginPanel()
{
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    //To prevent hydration error
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])
    const cookies = new Cookies(null, { path: "/" });
    //cookies.remove in order to delete a cookie
    
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        let res = await loginUser(name,pass);
        if(res != null)//If username returned, add a cookie and log in the user
        {
            window.location.reload();
        } 
        //Clear the form
        setName("");
        setPass("");
    }
    if(cookies.get("username") == undefined)
    {
        return (<>{isClient?
            <div id="loginPanel">
                <form onSubmit={handleSubmit}>
                    <h1 id="loginTitle">Login</h1>
                    <label className="loginHeader">Username:<br/>
                        <input type="text" className="loginInput" value={name} onChange={(e) => setName(e.target.value)}/>
                    </label><br/>
                    <label className="loginHeader">Password:<br/>
                        <input type="password" className="loginInput" value={pass} onChange={(e) => setPass(e.target.value)}/>
                    </label>
                    <input type="submit" value="login" id="loginSubmit"/>
                </form>
            </div>:<></>}</>);
    }
}