import React, { Component, Fragment } from 'react'
import { Alert, Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import GalleryImageComponent from './Components/GalleryImageComponent'

import GalleriesService from '../../services/databases/galleriesService'
import MediasService from '../../services/databases/mediasService'

class MediaGallery extends Component {
    constructor(props) {
        super(props)
    
        this.getInitialData = this.getInitialData.bind(this)

        this.state = {
            ...props,

            gallery: {
                _id: 0,
                name: '',
                description: '',
                medias: [],
                createdAt : new Date(),
                updatedAt: new Date()
            },

            alertText: '',

            images: [],
        }

        this.getInitialData()
    }

    getInitialData() {
        // TODO: Add media retrieval
        let galleriesService = new GalleriesService()
        galleriesService.findById(this.state.match.params.id, (error, item) => {
            if (error) {
                console.log(error)
            }
            else {
                if (item == null) {
                    // Gallery not found.
                    this.setState({alertText: 'La gallerie qui a pour id ' + this.state.match.params.id + ' n\'a pas été trouvée.'})
                }
                else {
                    this.setState({gallery: item})

                    // Get medias
                    let mediasService = new MediasService()
                    mediasService.find({_id: { $in: item.medias}}, (error, items) => {
                        if (error) {
                            console.log(error)
                        }
                        else {
                            let images = this.state.images
                            images.push(...items)
                            this.setState({images: images})
                        }
                    })
                }
            }
        })
    }

    render() {

        const isAlertVisible = this.state.alertText != ''

        const images = this.state.images.map((image, key) => {
            return (<GalleryImageComponent {...image} key={key} />)
        })

        return(
            <div className="animated fadeIn">
            {isAlertVisible && <Alert color="danger">{this.state.alertText}</Alert>}
            <Card>
                <CardHeader>
                    <CardTitle>{this.state.gallery.name}</CardTitle>
                </CardHeader>
                <CardBody>
                    <CardText><small className="text-muted">Créé le {this.state.gallery.createdAt.toLocaleString('fr-FR')} / Mis à jour le {this.state.gallery.updatedAt.toLocaleString('fr-FR')}</small></CardText>
                    <CardText>{this.state.gallery.description}</CardText>
                    <section className="media-gallery">
                        {images}
                    </section>
                </CardBody>
            </Card>
            </div>
        )
    }
}

export default MediaGallery 