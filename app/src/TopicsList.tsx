import * as React from "react";
import TopicObject from "./objects/TopicObject";
import {useEffect, useState} from "react";
import axios from "axios";
import Topic from "./Topic";

const TopicsList = () => {

    const [topics, setTopics] = useState<TopicObject[]>([]);

    useEffect(() => {
        axios.get("/mocked_topics.json").then((response) => {
            setTopics(response.data)
        }).catch((e) => {
            console.error("cannot fetch topics: "+e);
        })
    }, [])

    const topicsComponents = topics.map(topic => <Topic key={topic.title+topic.description+topic.subject} topic={topic}/>)

    return(
        <div>
            {topicsComponents}
        </div>
    )
}

export default TopicsList;
