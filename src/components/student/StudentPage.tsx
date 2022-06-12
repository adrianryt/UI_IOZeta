import *  as React from 'react'
import {useEffect, useState} from 'react'
import Checkpoints from './Checkpoints';
import Readme from './Readme';
import axios from "axios";
import "./StudentPage.css"
import CheckpointObject from '../../objects/CheckpointObject';
import CookieService from "../../objects/services/CookieService";
import {useNavigate} from "react-router-dom";
import BranchCloneCommand from "./BranchCloneCommand";
import Branch from "../../objects/Branch";
import { useTour } from "@reactour/tour";
import {Button} from "react-bootstrap";


const StudentPage = (props: any) => {
    const GET_SESSION_URL = "http://localhost:8080/sessions/student/session-info";
    const navigate = useNavigate();
    const { setIsOpen } = useTour();
    const openTour=() => setIsOpen(true)


    const [checkpoints, setCheckpoints] = useState([new CheckpointObject("", "", [], false, 0)]);
    const [readmeUrl, setReadmeUrl] = useState("");
    const [topicName, setTopicName] = useState("");
    const [lecturerNickname, setLecturerNickname] = useState("");
    const [repoName, setRepoName] = useState("");
    const [branchName, setBranchName] = useState("");

    useEffect(() => {
        if (CookieService.getCookie("session_id") === null || CookieService.getCookie("session_id") === "") {
            navigate("/");
        }
        const session_id = CookieService.getCookie("session_id");
        const student_id = CookieService.getCookie("student_id");

        console.log(session_id);
        console.log(student_id);

        axios
            .get(GET_SESSION_URL, {params: {session_id: session_id, student_id: student_id}})
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    setCheckpoints(response.data.checkpoints);
                    setReadmeUrl(response.data.readmeUrl);
                    setTopicName(response.data.topicName);
                    setBranchName(response.data.branchName);
                    setRepoName(response.data.repoName);
                    setLecturerNickname(response.data.lecturerNickname);
                } else {
                    console.error("cannot get session data");
                    navigate("/");
                }
            })
            .catch((e) => {
                console.error("cannot fetch class data: " + e);
            })
    }, [])


    return (
            <div className="row me-1">
                <div id="readme" className='d-flex justify-content-center col-lg-8 scrollbar-primary'>
                    <Readme topicName={topicName} readmeUrl={readmeUrl}/>
                </div>
                <div id="checkpoints" className='col-lg-4'>
                    <Button onClick={openTour} >Tutorial</Button>
                    <BranchCloneCommand branch={new Branch(branchName, repoName, lecturerNickname)}/>
                    <Checkpoints checkpoints={checkpoints}/>
                </div>
            </div>
    )

}
export default StudentPage
