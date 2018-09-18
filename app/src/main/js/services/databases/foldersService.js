import AbstractDatabaseService from './abstractDatabaseService'

class FoldersService extends AbstractDatabaseService {
    constructor() {
        super('Folders')
    }

    init() {
        // Index
        this.db.ensureIndex({fieldName: 'directory', unique: true})

        // Sample data
        this.insert([{
            directory: 'C:\\Users\\ngordat\\Downloads\\exif-samples-master',
            date_last_scan: 1536912951,
            total_media: 47
        }], (error, items) => {
            console.log('Folders DB initialized.')
        })
    }

    reset() {
        this.remove({}, {multi: true}, (error, items) => {
            console.log('Folders DB reset.')
        })
    }
}

export default FoldersService