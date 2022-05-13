import * as React from "react";
import '../nav_menu/NavMenu.css'
import {Card, FormGroup, OverlayTrigger, Popover} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { BsFillInfoSquareFill } from "react-icons/bs";

const SignUp = () => {

    const usernamePopover = (
        <Popover id="popover-basic">
            <Popover.Body className="text-light bg-dark">
                Put your github username here
            </Popover.Body>
        </Popover>
    );

    const tokenPopover = (
        <Popover id="popover-basic">
            <Popover.Body className="text-light bg-dark">
                <p>
                    You can create token <a href="https://github.com/settings/tokens">here</a>. Permits needed:
                    <ul>
                        <li>first</li>
                        <li>second</li>
                    </ul>
                </p>
            </Popover.Body>
        </Popover>
    );

    const navigate = useNavigate();

    const handleFormSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        navigate("/teacher");
    }

    return(
        <div className=" d-flex justify-content-center">
            <Card className="mt-5">
                <Card.Header>Sign up as lecturer</Card.Header>
                <Card.Body>
                    <form className="" onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <label>
                                First name:
                                <input name="firstName" className="form-control" type="text"/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Surname:
                                <input name="surname" className="form-control" type="text"/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Github nickname:
                                <input name="nickname" className="form-control" type="text"/>
                            </label>
                            <OverlayTrigger
                                placement="right"
                                overlay={usernamePopover}
                            >
                                <div className="d-inline ms-2"><BsFillInfoSquareFill className="fs-4"/></div>
                            </OverlayTrigger>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Github token:
                                <input name="token" className="form-control" type="text"/>
                            </label>
                            <OverlayTrigger
                                placement="right"
                                overlay={tokenPopover}
                            >
                                <div className="d-inline ms-2"><BsFillInfoSquareFill className="fs-4"/></div>
                            </OverlayTrigger>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Password:
                                <input name="password" className="form-control mb-3" type="password"/>
                            </label>
                        </FormGroup>
                        <input className="btn btn-outline-dark" type="submit" value="Create account"/>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SignUp;
