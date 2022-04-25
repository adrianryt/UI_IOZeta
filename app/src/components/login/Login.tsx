import * as React from "react";
import '../nav_menu/NavMenu.css'
import {Button, Card, FormGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent} from "react";



const Login = () =>{

    const navigate = useNavigate();

    const handleFormSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        navigate("/teacher");
    }

    return(
        <div className=" d-flex justify-content-center">
            <Card className="mt-5">
                <Card.Header>Sign in as lecturer</Card.Header>
                <Card.Body>
                    <form className="" onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <label>
                                email:
                                <input name="email" className="form-control mb-2" type="email"/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                password:
                                <input name="password" className="form-control mb-3" type="password"/>
                            </label>
                        </FormGroup>
                        <Link className="btn btn-secondary d-block" to={"/signup"}>Sign up</Link>
                        <input className="btn btn-outline-dark" type="submit" value="Login"/>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
