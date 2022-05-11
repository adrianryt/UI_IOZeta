import * as React from "react";
import '../nav_menu/NavMenu.css'
import {Button, Card, FormGroup, FormText} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {FormEvent, useState} from "react";
import LoginValidator from "../../objects/validators/LoginValidator";
import axios from "axios";
import {useCookies} from "react-cookie";



const Login = () =>{
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token', 'username']);

    const [loginError, setLoginError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const navigate = useNavigate();

    const handleFormSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        setPasswordError("");
        setLoginError("");
        const loginValidator = new LoginValidator();
        if(loginValidator.validateLogin(login) && loginValidator.validatePassword(password)){
            const loginParams = new URLSearchParams()
            loginParams.append('username', login)
            loginParams.append('password', password)
            axios({
                url: "http://localhost:8080/api/login",
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                data: loginParams
            }).then((response) => {
                setCookie("access_token", response.data.access_token, {maxAge: 60*60, path: "/", secure: true});
                setCookie("refresh_token", response.data.refresh_token, {maxAge: 60*60*24, path: "/", secure: true});
                setCookie("username", login, {maxAge: 60*60, path: "/", secure: true});
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(navigate("/teacher"))
                    }, 500)
                })

            }).catch((e) => {
                setPasswordError("login or password is incorrect")
            })
        }
        else{
            setPasswordError(loginValidator.passwordError);
            setLoginError(loginValidator.loginError);
        }
    }

    return(
        <div className=" d-flex justify-content-center">
            <Card className="mt-5">
                <Card.Header>Sign in as lecturer</Card.Header>
                <Card.Body>
                    <form className="" onSubmit={handleFormSubmit}>
                        <FormGroup>
                            <label>
                                github nickname:
                                <input name="username" className="form-control mb-2" type="text" value={login} onChange={handleLoginChange}/>
                            </label>
                            <FormText className="text-danger mb-4 row">{loginError}</FormText>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                password:
                                <input name="password" className="form-control mb-3" type="password" value={password} onChange={handlePasswordChange}/>
                            </label>
                            <FormText className="text-danger mb-4 row">{passwordError}</FormText>
                        </FormGroup>
                        <input className="btn btn-primary w-100" type="submit" value="Login"/>
                        <Link className="btn btn-secondary d-block mt-4" to={"/signup"}>Sign up</Link>

                    </form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
