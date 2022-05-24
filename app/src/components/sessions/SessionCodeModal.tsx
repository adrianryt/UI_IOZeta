import * as React from "react";
import {Modal} from "react-bootstrap";
import {useState} from "react";

const SessionCodeModal = (props: {sessionCode: string, show: boolean, handleClose: () => void, handleShow: () => void}) => {




    return(
        <div>
            <Modal show={props.show} onHide={props.handleClose} onShow={props.handleShow} className="fade" centered={true}>
                    <Modal.Body className="d-flex justify-content-center align-content-center">
                        <div style={{fontSize: 100}}>
                            {props.sessionCode}
                        </div>
                    </Modal.Body>
            </Modal>
        </div>
    );

}

export default SessionCodeModal;
