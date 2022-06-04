import * as React from "react";
import TopicObject from "../../objects/TopicObject";
import { useEffect, useState } from "react";
import axios from "axios";
import Topic from "./Topic";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {Link} from "react-router-dom";
import "./TopicList.css"
import CookieService from "../../objects/services/CookieService";


const TopicsList = () => {

    const [allTopics, setAllTopics] = useState<TopicObject[]>([]);
    const [topicsComponents, setTopicsComponent] = useState<JSX.Element[]>([]);

    useEffect(() => {
        axios.get("https://io-spring-demo.herokuapp.com/task/all", {
            headers: {
                "Authorization": `Bearer ${CookieService.getCookie("access_token")}`
            }
        }).then((response) => {
            setAllTopics(response.data);
            setTopicsComponent(response.data.map((topic: TopicObject) => <Topic key={topic.title + topic.subject + topic.repoName} topic={topic} />));
        }).catch((e) => {
            console.error("cannot fetch topics: " + e);
        });
    }, []);

    const filterTopics = (subject: string) => {
        if (subject === 'all') {
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
    const allTopicsComponents = allTopics.map(topic => <Topic key={topic.title + topic.repoName + topic.subject} topic={topic} />);

    return (
        <>
            <div className="topic-list-flex px-3 my-3 d-flex row align-items-stretch">
                <div className="col-12 col-md-2">
                    <Link to="/topics/new" className="btn btn-secondary h-100 ">Add new Topic</Link>

                </div>
                <div className="col-12 col-md-2">
                    <DropdownButton id="dropdown-basic-button" title="Select subject" className="h-100 d-flex align-items-stretch">
                        {dropdownItems}
                    </DropdownButton>
                </div>

            </div>
            <h2 className="mx-auto text-center">Topics</h2>
            <div className="m-lg-2">
                {topicsComponents}
            </div>
        </>
    )
}

export default TopicsList;
