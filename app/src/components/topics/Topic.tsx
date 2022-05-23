import * as React from "react";
import {Alert, Button, Card, FormControl, FormGroup} from "react-bootstrap";
import TopicObject from "../../objects/TopicObject";
import {useState} from "react";
import axios from "axios";
import CookieService from "../../objects/services/CookieService";
import {useNavigate} from "react-router-dom";

type propsType = {
    topic: TopicObject
}

const Topic = (props: propsType) => {
    const [sessionName, setSessionName] = useState<string>("");
    const [showSessionInvalid, setShowSessionInvalid] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSetSessionName = (e: React.ChangeEvent<HTMLInputElement>) => setSessionName(e.target.value);
    const handleCreateSessionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(sessionName.length > 0 && sessionName.length < 100){
            axios( {
                url: "http://localhost:8080/sessions/create",
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${CookieService.getCookie("access_token")}`
                },
                data: {
                    name: sessionName,
                    task: {
                        id: props.topic.id
                    }
                }
            })
                .then((response) => {
                navigate("/sessions");
            })
        }
        else{
            setShowSessionInvalid(true);
            setTimeout(() => {
                setShowSessionInvalid(false);
            }, 2000);
        }
    }

    return(
        <Card className="my-3 mx-auto border-3 col-sm-10 col-md-8 col-lg-6 col-11">
            <Card.Header className="bg bg-info">{props.topic.title} | {props.topic.subject}</Card.Header>
            {showSessionInvalid ? <Alert variant="danger">Session name is invalid</Alert> : null}
            <Card.Body>
                <div className="mb-3">repository name: {props.topic.repoName}</div>
                <form onSubmit={handleCreateSessionSubmit}>
                    <FormGroup>
                        <FormControl value={sessionName} onChange={handleSetSessionName} className="mt-3 mb-3" placeholder="enter session name"></FormControl>
                    </FormGroup>
                    <input className="btn btn-primary" type="submit" value="Create Session"/>
                </form>
            </Card.Body>
        </Card>
    )

}

export default Topic;
