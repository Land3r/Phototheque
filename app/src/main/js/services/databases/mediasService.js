import AbstractDatabaseService from './abstractDatabaseService'

class MediasService extends AbstractDatabaseService {
    constructor() {
        super('Medias')
    }

    init() {
        // Index
        this.db.ensureIndex({fieldName: 'path', unique: true})

        console.log('Medias DB initialized.')
    }

    reset() {
        this.remove({}, {multi: true}, (error, items) => {
            console.log('Medias DB reset.')
        })
    }
}

export default MediasService