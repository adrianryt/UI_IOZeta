import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Subject from "../../../objects/Subject";
import SubjectComponent from "../subject/SubjectComponent";
import {Link} from "react-router-dom";

const SubjectList = () => {

    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        axios.get("/mocked_subjects.json").then((response) => {
            setSubjects(response.data);
        }).catch((e) => {
            console.error("cannot fetch subjects: "+e);
        })
    }, [])

    const subjectComponents = subjects.map((subject) => <SubjectComponent subject={subject} key={subject.name+""+subject.lecturer.name+""+subject.lecturer.surname+""+subject.repoName} />)

    return(
        <div>
            <Link to="/subjects/new" className="btn btn-secondary ms-2 mt-2 mb-5">Add new Subject</Link>
            {subjectComponents}
        </div>
    )
}

export default SubjectList;