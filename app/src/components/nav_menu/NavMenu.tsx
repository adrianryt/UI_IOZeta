import * as React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavMenu = () => {

    return(
        <nav className="mt-3">
            <div className="d-flex flex-row justify-content-between px-3">
                <div>
                        <Link className="btn btn-primary d-block" to={"/"}>Home</Link>
                </div>
                <div id="login-button-wrapper">
                        <Link className="btn btn-secondary d-block" to={"/login"}>Login</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavMenu;
