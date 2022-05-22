import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SessionComponent from "./SessionComponent";
import CookieService from "../../objects/services/CookieService";

const Sessions = () => {
    const [sessions, setSessions] = useState([])
    useEffect(() => {
        axios({
            url: `http://localhost:8080/sessions/all?lecturer_id=${CookieService.getCookie("lecturer_id")}`,
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${CookieService.getCookie("access_token")}`
            }
        }).then((response: any) => {
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
                        <SessionComponent key={session.id+"session"} session={session} />
                )}
            </div>

        </>
    );

}

export default Sessions;
