'use client';
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import loginUser from "./loginUser";
import signupUser from "./signupUser";
export default function LoginPanel()
{
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [signUp,setSignup] = useState(false);
    //To prevent hydration error
    const [isClient, setIsClient] = useState(false)
 
    useEffect(() => {
      setIsClient(true)
    }, [])
    const cookies = new Cookies(null, { path: "/" });
    
    function toggleSignup()
    {
        setSignup(!signUp);
    }

    const handleSubmitLogin = async (event: { preventDefault: () => void; }) => {
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

    const handleSubmitSignUp = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        let res = await signupUser(name,pass,pass2);
        if(res != null)//If username returned, add a cookie and log in the user
        {
            window.location.reload();
        } 
        //Clear the form
        setName("");
        setPass("");
        setPass2("");
    }
    //Pages for logging in and signing up. Switched based on signup state
    const loginPage = <>{isClient?
        <div id="loginPanel">
            <form onSubmit={handleSubmitLogin}>
                <h1 id="loginTitle">Login</h1>
                <label className="loginHeader">Username:<br/>
                    <input type="text" className="loginInput" value={name} onChange={(e) => setName(e.target.value)}/>
                </label><br/>
                <label className="loginHeader">Password:<br/>
                    <input type="password" className="loginInput" value={pass} onChange={(e) => setPass(e.target.value)}/>
                </label><br/>
                <input type="submit" value="login" id="loginSubmit"/><br/>
                <button className="loginBack"onClick={toggleSignup}>Sign up</button>
            </form>
        </div>:<></>}</>

    const signUpPage = <>{isClient?
        <div id="loginPanel">
            <form onSubmit={handleSubmitSignUp}>
                <h1 id="loginTitle">Sign Up</h1>
                <label className="loginHeader">Username:<br/>
                    <input type="text" className="loginInput" value={name} onChange={(e) => setName(e.target.value)}/>
                </label><br/>
                <label className="loginHeader">Password:<br/>
                    <input type="password" className="loginInput" value={pass} onChange={(e) => setPass(e.target.value)}/>
                </label><br/>
                <label className="loginHeader">Confirm password:<br/>
                    <input type="password" className="loginInput" value={pass2} onChange={(e) => setPass2(e.target.value)}/>
                </label><br/>
                <input type="submit" value="Sign up" id="loginSubmit"/><br/>
                <button className="loginBack" onClick={toggleSignup}>Back</button>
            </form>
        </div>:<></>}</>
    if(cookies.get("username") == undefined)
    {
        if(signUp)
        {
            return (signUpPage);
        }
        else
        {
            return (loginPage);
        }
    }
}