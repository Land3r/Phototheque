import FoldersService from './databases/foldersService'
import GalleriesService from './databases/galleriesService'
import MediasService from './databases/mediasService';
import { config } from '../config/config';

class Services {
    constructor() {
    }

    init() {
        GalleriesService.init()
        FoldersService.init()
        MediasService.init()
    }

    reset() {
        GalleriesService.reset()
        FoldersService.reset()
        MediasService.reset()
    }

    reinstall() {
        console.log('Reinstalling')
        this.reset()
        this.init()
    }

    reinstallIfNeeded() {
        GalleriesService.find({'name': config.DEFAULT_GALLERY.name}, (error, items) => {
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