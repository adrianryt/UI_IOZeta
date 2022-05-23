import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import TopicObject from "../../objects/TopicObject";
import Topic from "./Topic";
import {useParams} from "react-router-dom";
import CookieService from "../../objects/services/CookieService";
import SessionComponent from "../sessions/SessionComponent";

const TopicSingle = () => {


    const [topic, setTopic] = useState<TopicObject | undefined>(undefined);
    const [sessions, setSessions] = useState([]);

    const params = useParams();

    useEffect(() => {
        axios.get("http://localhost:8080/task/id?task_id="+params.topicID, {
            headers: {
                "Authorization": `Bearer ${CookieService.getCookie("access_token")}`
            }
        }).then((response) => {
            console.log(response.data)
            setTopic(response.data)
        }).catch((e) => {
            console.error("error while fetching topic: "+e);
        })


        axios.get("http://localhost:8080/sessions?task_id=" + params.topicID, {
            headers: {
                "Authorization": `Bearer ${CookieService.getCookie("access_token")}`
            }
        }).then((response) =>{
            console.log(response);
            setSessions(response.data);

        }).catch((e) => {
            console.error("error while fetching sessions by task/topic id: "+e);
        })
    }, [])

    return(
        <div>
            <div className="fs-1 mb-1 d-flex justify-content-center">
                Topic
            </div>
            <div className="">
                {topic !== undefined ? <Topic topic={topic} /> : null }
            </div>
            <div className="mt-5 mb-1 fs-1 d-flex justify-content-center">
                {sessions.length !== 0 ? "Sessions created from this topic:" : "No sessions created from this topic yet" }
            </div>
            <div className="d-flex justify-content-center flex-wrap">
                {sessions.map(
                        (session: any) =>

                            <SessionComponent key={session.id+"session"} session={session} />

                    )
                }
            </div>
        </div>
    )
}

export default TopicSingle;
