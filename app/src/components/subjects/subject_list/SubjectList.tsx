import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Subject from "../../../objects/Subject";
import SubjectComponent from "../subject/SubjectComponent";
import { Link } from "react-router-dom";
import {useCookies} from "react-cookie";
import CookieService from "../../../objects/services/CookieService";

const SubjectList = () => {

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token', 'username', 'lecturer_id']);

    useEffect( () => {
         axios({
            url: "https://io-spring-demo.herokuapp.com/subjects/all?username=" + cookies['username'],
            method: "get",
            headers: {
                "Authorization": `Bearer ${CookieService.getCookie("access_token")}`
            }
        }).then((response) => {
             setSubjects(response.data);

         }).catch((e) => {
                console.error("cannot fetch subjects: " + e);
            })

    }, [])


    const subjectComponents = subjects.map((subject) => <SubjectComponent subject={subject} key={subject.name + "" + subject.lecturer.name + "" + subject.lecturer.surname} />);

    return (
        <div>
            <div className="px-3 my-3 d-flex row align-items-stretch">
                <div className=" col-12 col-md-2">
                    <Link to="/subjects/new" className="btn btn-secondary h-100">Add new Subject</Link>

                </div>


                <div className="col-12 col-md-2">
                    <Link to="/topics" className="btn btn-secondary h-100">Show all topics</Link>

                </div>
            </div>
            <h1 className="mx-auto text-center">Subjects</h1>
            <div id="subjectsContainer">
                {subjectComponents}
            </div>
        </div>
    )
}

export default SubjectList;
