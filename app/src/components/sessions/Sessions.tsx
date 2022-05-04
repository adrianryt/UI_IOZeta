import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SessionComponent from "./SessionComponent";

const Sessions = () => {
    const [sessions, setSessions] = useState([])
    useEffect(() => {
        axios.get("/mocked_sessions.json")
            .then((response: any) => {
                setSessions(response.data)
            }).catch((e) => {
                console.error("cannot fetch progress data: " + e);
            })
    }, [])
    return (
        <>
            <div className="m-lg-3">
                {sessions.map(
                    (session: any) =>
                        <SessionComponent session={session} />
                )}
            </div>

        </>
    );

}

export default Sessions;
