import * as React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

type propsType = {
    session: any
}

const SubjectComponent = ({ session }: propsType) => {
    return (
        <Card className="ms-2 mb-5 mt-5 m-lg-3 border-3 col-sm-10 col-md-8 col-lg-6 col-11">
            <Card.Header className="bg bg-info fs-5">
                {session.name} | {session.active ? "active" : "closed"}
            </Card.Header>
            <Card.Body>
                <div>
                    <p>Join code: {session.accessCode}</p>
                    {!session.active && <Link to={"/dashboard/" + session.id} className="btn btn-primary mt-2">Open session</Link>}
                    {session.active && <Button className="btn btn-primary">Close session</Button>}
                    {session.active && <Link to={"/dashboard/" + session.id} className="btn btn-primary mt-3">Resume session</Link>}
                    {/* <Link to={"/dashboard/" + session.id} className="btn btn-primary">Open session</Link> */}
                    {/* ^getting certain session data */}
                </div>
            </Card.Body>
        </Card>
    )
}

export default SubjectComponent;
