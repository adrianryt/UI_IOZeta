import * as React from "react";
import {Link} from "react-router-dom";

const Teacher = () => {
    return (
        <>
            <div className="m-3 d-flex flex-column">
                <div className="mb-3">
                    <Link to="/topics" className="btn btn-outline-dark m-0">Topics</Link>
                </div>

                <div className="mb-3">
                    <Link to="/topics/new" className="btn btn-outline-dark m-0">Add new Topic</Link>
                </div>

                <div className="mb-3">
                    <Link to="/subjects" className="btn btn-outline-dark m-0>">Subjects</Link>
                </div>

                <div className="mb-3">
                    <Link to="/subjects/new" className="btn btn-outline-dark m-0>">Add new subjects</Link>
                </div>

                <div className="mb-3">
                    <Link to="/sessions" className="btn btn-outline-dark m-0>">Sessions</Link>
                </div>
            </div>
        </>

    );
}

export default Teacher;
