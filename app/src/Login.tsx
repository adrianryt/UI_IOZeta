import * as React from "react";
import './NavMenu.css'
import {Button, Card, FormGroup} from "react-bootstrap";
import {Link} from "react-router-dom";



const Login = () =>{

    return(
        <div className=" d-flex justify-content-center">
            <Card className="mt-5">
                <Card.Header>Sign in as lecturer</Card.Header>
                <Card.Body>
                    <form className="">
                        <FormGroup>
                            <label>
                                email:
                                <input className="form-control mb-2" type="text"/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                password:
                                <input className="form-control mb-3" type="text"/>
                            </label>
                        </FormGroup>

                        <input className="btn btn-outline-dark" type="submit" value="Login"/>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
