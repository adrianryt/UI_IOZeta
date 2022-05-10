import * as React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type propsType = {
    session: any
}



const SubjectComponent = ({ session }: propsType) => {

    function translateStatus(status: Number) {  //there should be an enum for checkpoint status
        if (status == 0) return "closed"
        if (status == 1) return "open"
        return "-"
    }

    return (
        <Card className="ms-2 mb-5 m-lg-3 border-3 col-sm-10 col-md-8 col-lg-6 col-11">
            <Card.Header className="bg bg-info">
                {session.id} | {session.displayName} | {translateStatus(session.status)}
            </Card.Header>
            <Card.Body>
                <div>

                    {session.status == 0 && <Link to={"/dashboard/" + session.id} className="btn btn-primary">Open session</Link>}
                    {session.status == 1 && <Button className="btn btn-primary">Close session</Button>}
                    {session.status == 1 && <Link to={"/dashboard/" + session.id} className="btn btn-primary mt-3">Resume session</Link>}
                    {/* <Link to={"/dashboard/" + session.id} className="btn btn-primary">Open session</Link> */}
                    {/* ^getting certain session data */}
                </div>
            </Card.Body>
        </Card>
    )
}

export default SubjectComponent;
