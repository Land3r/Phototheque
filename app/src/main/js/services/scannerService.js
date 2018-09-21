import fs from 'fs';

class ScannerService {
  constructor() {
  }

  readFile(fileUri) {
    return fs.readFileSync(fileUri);
  }

  readExifData(fileContent, file) {
    try {
      const parser = require('exif-parser').create(fileContent);
      const result = parser.parse();
      result.filepath = file;
      return result;
    } catch (error) {
      console.log('Invalid exif found');
    }
  }
}


export default ScannerService;
