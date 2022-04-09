import React, { Component } from 'react'
import Checkpoints from './Checkpoints';
import Readme from './Readme';
class StudentSide extends Component {


    constructor(props) {
        super()
        this.state = {}
        let result = {  //TODO - dane z endpointu
            checkpoints: [
                {
                    title: "checkpoint1",
                    desc: "description of checkpoimnt 1",
                    cmd: "git push checkpoint1",

                }
            ],
            readme: "https://api.github.com/repos/adafruit/Adafruit_CircuitPython_CharLCD/contents/README.rst"
        }
        this.state = (result)
    }

    render() {
        return (
            // {/* <nav>
            //     <div id="control">
            //       <a href="/">control</a>
            //     </div>
            //     <div id="content">
            //       <a href="/">content</a>
            //     </div>
            //   </nav> */}
            <section >
                <div id="left">
                    <Checkpoints checkpoints={this.state.checkpoints}></Checkpoints>
                </div>
                <div id="right">
                    <Readme readme={this.state.readme}>

                    </Readme>
                </div>
            </section >

        );
    }

}
export default StudentSide
