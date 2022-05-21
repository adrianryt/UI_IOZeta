import * as React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

const NavMenu = (props: {loggedUserName: string | null, setLoggedUser: (name: string) => void}) => {
    const [, , removeCookie] = useCookies(['access_token', 'refresh_token', 'username']);

    const handleLogoutClick = () => {
        removeCookie("username");
        removeCookie("refresh_token");
        removeCookie("access_token");
        props.setLoggedUser("");
    }

    const handleLoginState = () => {
        if(props.loggedUserName !== "" && props.loggedUserName !== undefined && props.loggedUserName !== null){
            return <Button className="btn btn-secondary d-block" onClick={handleLogoutClick}>Logout</Button>
        }
        else{
            return <Link className="btn btn-secondary d-block" to={"/login"}>Login</Link>
        }
    }

    return(
        <nav className="my-3">
            <div className="d-flex flex-row flex-wrap justify-content-between px-3">
                <div className="col-12 col-md-1">
                        <Link className="btn btn-primary d-block" to={"/"}>Home</Link>
                </div>
                <div id="login-button-wrapper" className="col-12 col-md-1">
                    {handleLoginState()}
                </div>
            </div>
        </nav>
    )
}

export default NavMenu;
