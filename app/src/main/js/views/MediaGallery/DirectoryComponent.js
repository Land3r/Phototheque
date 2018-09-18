import React, { Component } from 'react'
import { Row, Col, Button, Tooltip } from 'reactstrap'

class DirectoryComponent extends Component {
    constructor(props) {
        super(props)

        this.toggleTooltip = this.toggleTooltip.bind(this)

        this.state = {
            ...props,
            isOpen: false
        }

        console.log('Total state: ' +JSON.stringify(this.state))
    }

    toggleTooltip() {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        return(
            <li key={this.state.id} >
                <span id={"DirectoryComponent" + this.state._id}>
                    {this.state.directory}
                </span>
                &nbsp;
                <span className="badge badge-primary badge-pill">{this.state.total_media}</span>
                <Tooltip placement="top" autohide={true} isOpen={this.state.isOpen} target={"DirectoryComponent" + this.state._id} toggle={this.toggleTooltip}>
                    Ajouté le {this.state.createdAt.toString()}, dernier scan le {this.state.date_last_scan.toString()}
                </Tooltip>
            </li>
        )
    }
}

export default DirectoryComponent