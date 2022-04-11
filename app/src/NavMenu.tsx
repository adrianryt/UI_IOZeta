import * as React from "react";
import './NavMenu.css'
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavMenu = () => {
    return(
        <nav className="mt-3">
            <div className="d-flex flex-row justify-content-between">
                <div>
                    <Button className="btn btn-primary ms-3">
                        <Link className="link" to={"/"}>Home</Link>
                    </Button>
                </div>
                <div id="login-button-wrapper">
                    <Button className="btn btn-secondary">Login</Button>
                </div>
            </div>
        </nav>
    )
}

export default NavMenu;