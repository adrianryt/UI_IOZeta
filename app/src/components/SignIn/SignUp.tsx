import * as React from "react";

import {Card, FormGroup, FormText, OverlayTrigger, Popover, Button} from "react-bootstrap";
import {useNavigate, Link} from "react-router-dom";
import {useState, FormEvent} from "react";
import axios, {AxiosResponse} from "axios";
import {useCookies} from "react-cookie";
import SignUpValidator from "../../objects/validators/SignUpValidator";
import { BsFillInfoSquareFill } from "react-icons/bs";

const SignUp = (props: {setUserLogin: (name: string) => string}) =>{
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token', 'username']);

    const [firstName, setFirstName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [password, setPassword] = useState<string>("");
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

    const [firstNameError, setFirstNameError] = useState<string>("");
    const [surnameError, setSurnameError] = useState<string>("");
    const [nicknameError, setNicknameError] = useState<string>("");
    const [tokenError, setTokenError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)
    const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)
    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const handleFormSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        setFirstNameError("");
        setSurnameError("");
        setNicknameError("");
        setTokenError("");
        setPasswordError("");
        const signUpValidator = new SignUpValidator();
        if(signUpValidator.validateFirstName(firstName) && signUpValidator.validateSurname(surname) && signUpValidator.validateNickname(nickname) &&
            signUpValidator.validateGitToken(token) && signUpValidator.validatePassword(password)){
            axios({
                url: "http://localhost:8080/api/lecturer/save",
                method: "POST",
                data: {
                    password, surname, name: firstName, gitNick: nickname, gitToken: token
                }
            }).then((response: AxiosResponse<any>) => {
                const loginParams = new URLSearchParams()
                loginParams.append('username', nickname)
                loginParams.append('password', password)
                axios({
                    url: "http://localhost:8080/api/login",
                    method: "POST",
                    headers: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: loginParams
                }).then((response) => {
                    setCookie("access_token", response.data.access_token, {maxAge: 60*60, path: "/", secure: false});
                    setCookie("refresh_token", response.data.refresh_token, {maxAge: 60*60*24, path: "/", secure: false});
                    setCookie("username", nickname, {maxAge: 60*60, path: "/", secure: false});
                    props.setUserLogin(nickname);
                    navigate("/teacher")

                }).catch((e) => {
                    console.error("cannot login user: "+e);
                })

            }).catch((e) => {
                console.error("cannot register user: "+e);
            })
        }
        else{
            setFirstNameError(signUpValidator.firstNameError);
            setSurnameError(signUpValidator.surnameError);
            setNicknameError(signUpValidator.nicknameError);
            setTokenError(signUpValidator.tokenError);
            setPasswordError(signUpValidator.passwordError);
        }

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
                                <input name="firstName" className="form-control" type="text" value={firstName} onChange={handleFirstNameChange}/>
                            </label>
                            <FormText className="text-danger mb-4 row">{firstNameError}</FormText>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Surname:
                                <input name="surname" className="form-control" type="text" value={surname} onChange={handleSurnameChange}/>
                            </label>
                            <FormText className="text-danger mb-4 row">{surnameError}</FormText>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Github nickname:
                                <input name="nickname" className="form-control" type="text" value={nickname} onChange={handleNicknameChange}/>
                            </label>
                            <FormText className="text-danger mb-4 row">{nicknameError}</FormText>
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
                                <input name="token" className="form-control" type="text" value={token} onChange={handleTokenChange}/>
                            </label>
                            <FormText className="text-danger mb-4 row">{tokenError}</FormText>
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
                                <input name="password" className="form-control mb-3" type="password" value={password} onChange={handlePasswordChange}/>
                            </label>
                            <FormText className="text-danger mb-4 row">{passwordError}</FormText>
                        </FormGroup>
                        <input className="btn btn-outline-dark" type="submit" value="Create account"/>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SignUp;
