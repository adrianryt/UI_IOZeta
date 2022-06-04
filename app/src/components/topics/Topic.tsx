import * as React from "react";
import {Alert, Card, FormControl, FormGroup} from "react-bootstrap";
import TopicObject from "../../objects/TopicObject";
import {useState} from "react";
import axios from "axios";
import CookieService from "../../objects/services/CookieService";
import {useNavigate} from "react-router-dom";
import Readme from "../student/Readme";

type propsType = {
    topic: TopicObject,
    fetchSessions?: () => void
}

const Topic = (props: propsType) => {
    const [sessionName, setSessionName] = useState<string>("");
    const [showSessionInvalid, setShowSessionInvalid] = useState<boolean>(false);
    const [sessionInvalidInfo, setSessionInvalidInfo] = useState<string>("");
    const navigate = useNavigate();

    const showSessionError = (info: string) => {
        setShowSessionInvalid(true);
        setSessionInvalidInfo(info)
        setTimeout(() => {
            setShowSessionInvalid(false);
        }, 2000);
    }

    const username: string = CookieService.getCookie("username");

    const repoLink = () => {
        return "https://github.com/" + username + "/" + props.topic.repoName
    }


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
            }).then((response) => {
                    if(props.fetchSessions !== undefined){
                        props.fetchSessions()
                    }
                    navigate("/topic/"+props.topic.id)
                }).catch((e) => {
                    showSessionError("session name is taken");
            });
        }
        else{
            showSessionError("name has wrong length");
        }
    }

    return(
        <Card className="my-3 mx-auto border-3 col-sm-10 col-md-8 col-lg-6 col-11">
            <Card.Header className="bg bg-info">{props.topic.title} | {props.topic.subject}</Card.Header>
            {showSessionInvalid ? <Alert variant="danger">Invalid session name: {sessionInvalidInfo}</Alert> : null}
            <Card.Body>
                <div className="">
                    <div className="mb-3">
                        {"repository name: "}
                        <a href={repoLink()} target="_blank">{props.topic.repoName}</a>
                    </div>
                    <div id="readme" className='d-flex justify-content-center scrollbar-primary'>
                        <Readme topicName={""} readmeUrl={props.topic.readmeLink}  />
                    </div>
                </div>
                <form onSubmit={handleCreateSessionSubmit}>
                    <FormGroup>
                        <FormControl value={sessionName} onChange={handleSetSessionName} className="mt-3 mb-3" placeholder="enter session name"></FormControl>
                    </FormGroup>
                    <div className="d-flex justify-content-center">
                        <input className="btn btn-primary col-sm-10 col-md-8 col-lg-6" type="submit" value="Create Session"/>
                    </div>
                </form>
            </Card.Body>
        </Card>
    )

}

export default Topic;
