import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import TopicObject from "../../objects/TopicObject";
import Topic from "./Topic";
import {useParams} from "react-router-dom";
import CookieService from "../../objects/services/CookieService";

const TopicSingle = () => {


    const [topic, setTopic] = useState<TopicObject | undefined>(undefined);
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
    }, [])

    return(
        <div>
            {topic !== undefined ? <Topic topic={topic} /> : null }
        </div>
    )
}

export default TopicSingle;
