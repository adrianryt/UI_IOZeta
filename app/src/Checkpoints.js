import React, { Component } from 'react'
import { Button } from "react-bootstrap";

class Checkpoints extends Component {

    render() {
        console.log(this.props)

        return (

            < ol >
                {
                    this.props.checkpoints.map((checkpoint) =>
                        <li key={checkpoint.title}>
                            <h3>{checkpoint.title}</h3>
                            <p>{checkpoint.desc}</p>
                            <input type="text" readOnly
                                value={checkpoint.cmd}>
                            </input>
                            <Button onClick={() => {
                                navigator.clipboard.writeText(checkpoint.cmd);  //kopiuj komendę gitową do schowka
                            }
                            }>Skopiuj</Button>
                        </li>
                    )
                }
            </ol >

        )
    }
}

export default Checkpoints;
