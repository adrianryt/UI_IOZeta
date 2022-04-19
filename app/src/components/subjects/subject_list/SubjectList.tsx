import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import Subject from "../../../objects/Subject";
import SubjectComponent from "../subject/SubjectComponent";

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
            {subjectComponents}
        </div>
    )
}

export default SubjectList;