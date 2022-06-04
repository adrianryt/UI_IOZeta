import * as React from "react";
import {Link} from "react-router-dom";
import "./teacher.css"

const Teacher = () => {
    return (
        <div className="teacher-main-menu">
            <div className="d-flex flex-column gap-lg-3 gap-2 align-content-center justify-content-center position-absolute h-100 w-100">
                {/*<div className="mb-3 d-flex justify-content-center">*/}
                {/*    <Link to="/topics" className="btn btn-outline-dark m-0 col-xxl-3 col-xl-4 col-lg-6 col-md-8 col-sm-9 col-10 d-block">Topics</Link>*/}
                {/*</div>*/}

                {/*<div className="mb-3 d-flex justify-content-center">*/}
                {/*    <Link to="/topics/new" className="btn btn-outline-dark m-0 col-xxl-3 col-xl-4 col-lg-6 col-md-8 col-sm-9 col-10 d-block">Add new Topic</Link>*/}
                {/*</div>*/}

                <div className="mb-3 d-flex justify-content-center">
                    <Link to="/subjects" className="btn btn-outline-dark m-0 col-xxl-3 col-xl-4 col-lg-6 col-md-8 col-sm-9 col-10 d-block">Subjects</Link>
                </div>

                <div className="mb-3 d-flex justify-content-center">
                    <Link to="/subjects/new" className="btn btn-outline-dark m-0 col-xxl-3 col-xl-4 col-lg-6 col-md-8 col-sm-9 col-10 d-block">Add new subjects</Link>
                </div>

                <div className="mb-3 d-flex justify-content-center">
                    <Link to="/sessions" className="btn btn-outline-dark m-0 col-xxl-3 col-xl-4 col-lg-6 col-md-8 col-sm-9 col-10 d-block">Active sessions</Link>
                </div>
            </div>
        </div>

    );
}

export default Teacher;
