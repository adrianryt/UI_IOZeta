import * as React from "react";
import '../nav_menu/NavMenu.css'
import {Card, FormGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios, {AxiosResponse} from "axios";



const SignUp = () =>{
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)
    const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)
    const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)
    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

    const handleFormSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
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
                navigate("/teacher");
            }).catch((e) => {
                console.error("cannot login user: "+e);
            })

        }).catch((e) => {
            console.error("cannot register user: "+e);
        })

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
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Surname:
                                <input name="surname" className="form-control" type="text" value={surname} onChange={handleSurnameChange}/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Github nickname:
                                <input name="nickname" className="form-control" type="text" value={nickname} onChange={handleNicknameChange}/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Github token:
                                <input name="token" className="form-control" type="text" value={token} onChange={handleTokenChange}/>
                            </label>
                        </FormGroup>
                        <FormGroup>
                            <label>
                                Password:
                                <input name="password" className="form-control mb-3" type="password" value={password} onChange={handlePasswordChange}/>
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
