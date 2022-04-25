import * as React from "react";
import TopicsList from "./TopicsList";
import {Link} from "react-router-dom";

const TopicsMain = () => {
    return(
        <div>
            <div className="d-flex gap-3 mb-4 mt-2 m-lg-3">
                <h2>Topics</h2>
                <Link to="/topics/new" className="btn btn-secondary m-0">Add new Topic</Link>
            </div>

            <TopicsList />
        </div>
    )
}

export default TopicsMain;
