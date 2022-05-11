import * as React from "react";
import './NavMenu.css'
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

const NavMenu = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token', 'username']);

    const [loggedUserName, setLoggedUserName] = useState<string>("");
    useEffect(() => {
        setLoggedUserName(cookies["username"])
    }, [cookies["username"]])

    const handleLogoutClick = () => {
        removeCookie("username");
        removeCookie("refresh_token");
        removeCookie("access_token");
    }

    const handleLoginState = () => {
        console.log(loggedUserName)
        if(loggedUserName !== "" && loggedUserName !== undefined){
            return <Button className="btn btn-secondary d-block" onClick={handleLogoutClick}>Logout</Button>
        }
        else{
            return <Link className="btn btn-secondary d-block" to={"/login"}>Login</Link>
        }
    }

    return(
        <nav className="mt-3">
            <div className="d-flex flex-row justify-content-between">
                <div>
                    <Link className="btn btn-primary ms-3 d-block" to={"/"}>Home</Link>
                </div>
                <div id="login-button-wrapper">
                    {handleLoginState()}
                </div>
            </div>
        </nav>
    )
}

export default NavMenu;
