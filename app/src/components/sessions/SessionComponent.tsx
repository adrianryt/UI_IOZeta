import * as React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import CookieService from "../../objects/services/CookieService";
import SessionCodeModal from "./SessionCodeModal";
import "./SessionComponent.css"

type propsType = {
    session: any
}

const SessionComponent = ({ session }: propsType) => {
    const [sessionActive, setSessionActive] = useState<boolean>(false);
    const [students, setStudents] = useState<any[]>([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setSessionActive(session.active)
        if(session.id){
            axios({
                url: `http://localhost:8080/sessions/connected-students?session_id=${session.id}`,
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${CookieService.getCookie("access_token")}`
                }
            }).then((response) => {
               setStudents(response.data);
            });
        }

    }, [session])

    const handleCloseSession = (e: any) => {
        axios({
            url: "http://localhost:8080/sessions/deactivate",
            method: "POST",
            headers: {
                "Authorization": `Bearer ${CookieService.getCookie("access_token")}`
            },
            data: {
                id: session.id
            }
        }).then((response) => {
            setSessionActive(false);
        })
    }

    const studentsShow = students.map(student => <span key={"student"+student.id+student.gitNick} className="p-2">{student.gitNick}</span>)

    return (
        <Card className="ms-2 mb-5 mt-5 m-lg-3 border-3 col-sm-10 col-md-8 col-lg-6 col-11">
            <Card.Header className="bg bg-info fs-5">
                {session.name} | {sessionActive ? "active" : "closed"}
            </Card.Header>
            <Card.Body>
                <div >
                    <p>Join code:</p>
                    <div className="d-flex justify-content-center">
                        <div className= {sessionActive ? "fs-1 session-code" : "fs-6 session-code" } onClick={handleShow}>
                            {session.accessCode}
                        </div>
                    </div>
                    <SessionCodeModal show={show} handleShow={handleShow} handleClose={handleClose} sessionCode={session.accessCode}/>
                    <br/>
                    <div className="mb-2">
                        Students joined:
                    </div>
                    <div className="mb-2">
                        {studentsShow}
                    </div>
                    {!sessionActive && <Link to={"/dashboard/" + session.id} className="btn btn-primary mt-2">Open session</Link>}
                    {sessionActive && <Button className="btn btn-primary" onClick={handleCloseSession}>Close session</Button>}
                    {sessionActive && <Link to={"/dashboard/" + session.id} className="btn btn-primary mt-3">Resume session</Link>}
                    {/* <Link to={"/dashboard/" + session.id} className="btn btn-primary">Open session</Link> */}
                    {/* ^getting certain session data */}
                </div>
            </Card.Body>
        </Card>
    )
}

export default SessionComponent;
