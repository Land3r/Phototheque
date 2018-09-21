import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GalleryImageComponent extends Component {
  constructor(props) {
    super(props);

    this.toggleSidePanelItem = this.toggleSidePanelItem.bind(this);

    const name = props.path;
    this.state = {
      ...props,
    };
  }

  toggleSidePanelItem(media) {
    const { setSidePanelItem } = this.props;
    setSidePanelItem(media);
  }

  render() {
    return (
      <img src={this.state.path} onClick={(e) => { this.toggleSidePanelItem({ ...this.state }); }} />
    );
  }
}

GalleryImageComponent.propTypes = {
  setSidePanelItem: PropTypes.func.isRequired,
};

export default GalleryImageComponent;
