import {store} from 'redux'
import FoldersService from './databases/foldersService'
import GalleriesService from './databases/galleriesService'
import MediasService from './databases/mediasService';

class Services {
    constructor() {

    }

    init() {
        const galleriesService = new GalleriesService()
        galleriesService.init()
        
        const foldersService = new FoldersService()
        foldersService.init()

        const mediasService = new MediasService()
        mediasService.init()
    }

    reset() {
        const galleriesService = new GalleriesService()
        galleriesService.reset()
        
        const foldersService = new FoldersService()
        foldersService.reset()

        const mediasService = new MediasService()
        mediasService.reset()
    }

    reinstall() {
        console.log('Reinstalling')
        this.reset()
        this.init()
    }

    reinstallIfNeeded() {
        const galleriesService = new GalleriesService()
        galleriesService.find({'name': 'Non catégorisé'}, (error, items) => {
            if (error) {
                console.log(error)
            }
            else {
                if (items.length == 0) {
                    this.reinstall()
                }
            }
        })
    }
}

export default Services