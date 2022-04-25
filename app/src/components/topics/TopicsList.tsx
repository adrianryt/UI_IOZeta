import * as React from "react";
import TopicObject from "../../objects/TopicObject";
import {useEffect, useState} from "react";
import axios from "axios";
import Topic from "./Topic";
import {Dropdown, DropdownButton} from "react-bootstrap";

const TopicsList = () => {

    const [allTopics, setAllTopics] = useState<TopicObject[]>([]);
    const [topicsComponents, setTopicsComponent] = useState([]);

    useEffect(() => {
        axios.get("/mocked_topics.json").then((response) => {
            setAllTopics(response.data);
            setTopicsComponent(response.data.map((topic: TopicObject) => <Topic key={topic.title+topic.description+topic.subject} topic={topic}/>));
        }).catch((e) => {
            console.error("cannot fetch topics: "+e);
        });
    },[]);

    const filterTopics = (subject: string) => {
        if(subject === 'all') {
            setTopicsComponent(allTopicsComponents);
            return;
        }
        const filteredTopics = allTopicsComponents.filter(topic => topic.props.topic.subject === subject);
        setTopicsComponent(filteredTopics);
    }

    const dropdownItems = allTopics
        .map(topic => topic.subject)
        .filter((n, i, self) => self.indexOf(n) === i)
        .map(topic =>
            <Dropdown.Item id={topic} onClick={() => filterTopics(topic)}>{topic}</Dropdown.Item>
        );
    dropdownItems.unshift(<Dropdown.Item id="All" onClick={() => filterTopics('all')}>All</Dropdown.Item>);

    // I dont like this line :/
    const allTopicsComponents = allTopics.map(topic => <Topic key={topic.title+topic.description+topic.subject} topic={topic}/>);

    return(
        <div className="m-lg-2">
            <DropdownButton className="m-2" id="dropdown-basic-button" title="Select topic">
                {dropdownItems}
            </DropdownButton>
            {topicsComponents}
        </div>
    )
}

export default TopicsList;
