import React, { Component } from 'react';
import { Row, Col, Button, Tooltip } from 'reactstrap';

class DirectoryComponent extends Component {
  constructor(props) {
    super(props);

    this.toggleTooltip = this.toggleTooltip.bind(this);

    this.state = {
      ...props,
      isOpen: false,

      createdAt: new Date(),
      date_last_scan: new Date()
    };
  }

  toggleTooltip() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  /**
   * Render lifecycle method.
   * See https://reactjs.org/docs/react-component.html#render for more info.
   */
  render() {
    return (
      <li key={this.state.id} >
        <span id={`DirectoryComponent${this.state._id}`}>
          {this.state.directory}
        </span>
                &nbsp;
        <span className="badge badge-primary badge-pill">{this.state.medias_total}</span>
        <Tooltip placement="top" autohide isOpen={this.state.isOpen} target={`DirectoryComponent${this.state._id}`} toggle={this.toggleTooltip}>
          Ajouté le {this.state.createdAt.toLocaleString('fr-FR')}, dernier scan le {this.state.date_last_scan.toLocaleString('fr-FR')}
        </Tooltip>
      </li>
    );
  }
}

export default DirectoryComponent;
