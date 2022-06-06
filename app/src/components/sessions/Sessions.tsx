import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SessionComponent from "./SessionComponent";
import CookieService from "../../objects/services/CookieService";

type propsType = {
    sessionsPresentMessage: string,
    noSessionsMessage: string
}

const Sessions = ({sessionsPresentMessage="Active sessions:", noSessionsMessage="No sessions active"}: propsType) => {
    const [sessions, setSessions] = useState([])
    useEffect(() => {
        axios({
            url: `http://localhost:8080/sessions/active-sessions?lecturer_id=${CookieService.getCookie("lecturer_id")}`,
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
        <div>
            <div className="fs-1 d-flex justify-content-center">
                {sessions.length !== 0 ? sessionsPresentMessage : noSessionsMessage }
            </div>
            <div className="m-lg-3 d-flex justify-content-center flex-wrap">
                {sessions.map(
                    (session: any) =>
                        <SessionComponent key={session.id+"session"} session={session} />
                )}
            </div>

        </div>
    );

}

export default Sessions;
