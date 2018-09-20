import React, { Component, Fragment } from 'react'
import { Alert, Card, CardHeader, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

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
                image: null,
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

    getRandomSize(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    populateImages() {
        var images = []
        for (var i = 0; i < 100; i++) {
            var image = {
                src: 'https://placekitten.com/' + this.getRandomSize(200, 400) + '/' + this.getRandomSize(200, 400),
                alt: 'awesome kittens! :)'
            }
            images.push(image)
        }
        this.setState({images: images})
    }

    componentDidMount() {
        // this.populateImages()
    }

    render() {

        const isAlertVisible = this.state.alertText != ''

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
                        {this.state.images.map((image, key) => (
                            <img src={image.path} key={key}/>
                        ))}
                    </section>
                </CardBody>
            </Card>
            </div>
        )
    }
}

export default MediaGallery 