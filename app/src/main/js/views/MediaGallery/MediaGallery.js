import React, { Component, Fragment } from 'react'

class MediaGallery extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            images: [],
            fadeIn: true,
            timeout: 300
        }
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
        this.populateImages()
    }

    render() {
        return(
            <div className="animated fadeIn">
                <section className="media-gallery">
                    {this.state.images.map(image => (
                        <img src={image.src} alt={image.alt} />
                    ))}
                </section>
            </div>
        )
    }
}

export default MediaGallery 