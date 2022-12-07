import * as fs from 'fs';
import * as path from 'path';

const getInput = (inputPath: string): Promise<string> => {
    return new Promise((resolve) => {
        const fullPath = path.join(__dirname, '../', inputPath);

        fs.readFile(fullPath, "utf8", (err, data) => {
            if (err) {
                throw err;
            }

            resolve(data.replaceAll("\r\n", "\n"));
        })
    })
}

export default getInput;