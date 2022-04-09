import React, { Component } from 'react'

class Readme extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount = () => {
        fetch(this.props.readme).then((response) => {
            return response.json()
        }).then((result) => {
            this.setState({ readme: Buffer.from(result.content,"base64") }) //TODO - formatowanie
        })
    }
    render() {
        return (
            <div id="readme">
                <pre>{this.state.readme}</pre>
            </div>
        )
    }

}
export default Readme
