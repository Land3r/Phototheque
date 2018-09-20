import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button , Badge} from 'reactstrap';
import MediasService from '../../../services/databases/mediasService'
import { Link } from 'react-router-dom'

class GalleryTileComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...props
        }
    }

    render() {
        return(
            <Card>
                <Link to={'/galleries/'+this.state._id}>
                    <CardImg top width="100%" src={this.state.image || 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'} alt={this.state.name} />
                </Link>
                <CardBody>
                    <CardTitle>
                        {this.state.name}&nbsp;
                        <Badge color="primary" pill>{this.state.medias.length}</Badge>
                    </CardTitle>
                    <CardText><small className="text-muted">Créé le {this.state.createdAt.toLocaleString('fr-FR')} / Mis à jour le {this.state.updatedAt.toLocaleString('fr-FR')}</small></CardText>
                    <CardText>{this.state.description}</CardText>
                </CardBody>
            </Card>
        )
    }
}

export default GalleryTileComponent