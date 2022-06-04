import * as React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

const NavMenu = (props: {loggedUserName: string | null, setLoggedUser: (name: string) => void}) => {
    const [, , removeCookie] = useCookies(['access_token', 'refresh_token', 'username', 'lecturer_id']);

    const handleLogoutClick = () => {
        removeCookie("username");
        removeCookie("refresh_token");
        removeCookie("access_token");
        removeCookie("lecturer_id")
        props.setLoggedUser("");
    }

    const handleLoginState = () => {
        if(props.loggedUserName !== "" && props.loggedUserName !== undefined && props.loggedUserName !== null){
            return( <div className="d-flex ">
                        <Link className="btn btn-primary d-block me-4" to={"/teacher"}>{props.loggedUserName}</Link>
                        <Button className="btn btn-secondary d-block" onClick={handleLogoutClick}>Logout</Button>
                    </div>);
        }
        else{
            return <Link className="btn btn-secondary d-block" to={"/login"}>Login</Link>
        }
    }

    return(
        <nav className="my-3">
            <div className="d-flex flex-row flex-wrap justify-content-between px-3">
                <div className="">
                        <Link className="btn btn-primary d-block" to={"/"}>Home</Link>
                </div>
                <div id="login-button-wrapper" className="">
                    {handleLoginState()}
                </div>
            </div>
        </nav>
    )
}

export default NavMenu;
