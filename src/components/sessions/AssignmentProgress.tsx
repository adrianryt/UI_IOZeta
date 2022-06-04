import * as React from "react";
import { Table } from "react-bootstrap";
import CheckpointObject from "../../objects/CheckpointObject";
import { useEffect, useState } from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import SessionDataObject from "../../objects/SessionDataObject";
import CookieService from "../../objects/services/CookieService";

function orderCommits(sData: SessionDataObject) {
    sData.students.forEach(element => {
        element.commits.sort((a, b) => sData.checkpointNames.indexOf(a.checkpointName) < sData.checkpointNames.indexOf(b.checkpointName) ? -1 : 1)
    });
}

const AssignmentProgress = () => {
    const params = useParams();
    const [progress, setProgress] = useState(new SessionDataObject([], []));
    useEffect(() => {
        axios.get("https://io-spring-demo.herokuapp.com/sessions/session-details?session_id=" + params.sessionID, {
            headers: {
                "Authorization": `Bearer ${CookieService.getCookie("access_token")}`
            }
        })

            //axios.get("/mocked_progress.json")
            .then((response: any) => {
                orderCommits(response.data)
                setProgress(response.data)
            }).catch((e) => {
                console.error("cannot fetch progress data: " + e);
            })
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    {progress.checkpointNames.map(
                        (name: String) =>
                            <th scope="col" >{name}</th>
                    )}

                </tr>
            </thead>
            <tbody>


                {progress.students.map(
                    (checkpoint: any) =>
                        <tr>
                            <th scope="row" >{checkpoint.name}</th>
                            {checkpoint.commits.map((commit: any) =>
                                <th scope="row" key={commit.url}>
                                    {commit.url === "" ? "No commit yet" :
                                        <a href={"https://www." + commit.url} target="_blank" >
                                            Link to commit
                                        </a>
                                    }
                                </th>
                            )}
                        </tr>

                )}


            </tbody>
        </Table>
    )

}

export default AssignmentProgress;
