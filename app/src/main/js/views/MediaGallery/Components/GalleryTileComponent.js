import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Badge } from 'reactstrap';
import MediasService from '../../../services/databases/mediasService';
import { Link } from 'react-router-dom';

class GalleryTileComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.image != state.image) {
      state.image = props.image;
    }
    return state;
  }

  /**
   * Render lifecycle method.
   * See https://reactjs.org/docs/react-component.html#render for more info.
   */
  render() {
    return (
      <Card>
        <Link to={`/galleries/${this.state._id}`}>
          <CardImg top width="100%" src={this.state.image} alt={this.state.name} />
        </Link>
        <CardBody>
          <CardTitle>
            {this.state.name}&nbsp;
            <Badge color="primary" pill>{/*this.state.medias.length*/}</Badge>
          </CardTitle>
          <CardText><small className="text-muted">Créé le {this.state.createdAt.toLocaleString('fr-FR')} / Mis à jour le {this.state.updatedAt.toLocaleString('fr-FR')}</small></CardText>
          <CardText>{this.state.description}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default GalleryTileComponent;
