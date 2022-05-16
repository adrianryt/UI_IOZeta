import * as React from "react";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavMenu = () => {

    return(
        <nav className="my-3">
            <div className="d-flex flex-row flex-wrap justify-content-between px-3">
                <div className="col-12 col-md-1">
                        <Link className="btn btn-primary d-block" to={"/"}>Home</Link>
                </div>
                <div id="login-button-wrapper" className="col-12 col-md-1">
                        <Link className="btn btn-secondary d-block" to={"/login"}>Login</Link>
                </div>
            </div>
        </nav>
    )
}

export default NavMenu;
