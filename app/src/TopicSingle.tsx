import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import TopicObject from "./objects/TopicObject";
import Topic from "./Topic";
import {useParams} from "react-router-dom";

const TopicSingle = () => {

    const [topic, setTopic] = useState<TopicObject>(undefined);
    const params = useParams();

    useEffect(() => {
        axios.get("/topics/"+params.topicID).then((response) => {
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
