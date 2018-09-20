const fs = require('fs')

class ScannerService {
    constructor() {
    }

    readFile(fileUri) {
        return fs.readFileSync(fileUri)
    }

    readExifData(fileContent, file) {
        try {
            let parser = require('exif-parser').create(fileContent);
            let result = parser.parse()
            result.filepath = file
            return result
        } catch (error) {
            console.log('Invalid exif found')
        }
    }
}



export default ScannerService