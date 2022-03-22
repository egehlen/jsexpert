const { readFile } = require('fs/promises');
const { join } = require('path');
const { errors } = require('./constants');
const User = require('./user');

const DEFAULT_OPTIONS = {
    maxLines: 3,
    fields: ['id', 'name', 'profession', 'age']
};

class File {
    static async csvToJson(filePath) {
        const content = await this.getFileContent(filePath);

        const validation = this.isValid(content);
        if (!validation.valid) throw new Error(validation.error);

        const parsedContent = this.parseCsvToJson(content);
        return parsedContent;
    }

    static parseCsvToJson(csvString) {
        const lines = csvString.split('\n');
        const firstLine = lines.shift();
        const header = firstLine.split(',');
        const content = lines.map(line => {
            const columns = line.split(',');
            let user = {};

            for (const index in columns) {
                user[header[index].replace(/(\r\n|\n|\r)/gm, '')] = columns[index].replace(/(\r\n|\n|\r)/gm, '');
            }

            return new User(user);
        });

        return content;
    }

    static async getFileContent(filePath) {
        filePath = join(__dirname, filePath);
        return (await readFile(filePath)).toString('utf-8');
    }

    static isValid(csvString, options = DEFAULT_OPTIONS) {
        const [header, ...content] = csvString.split('\n');

        const sanitizedHeader = header.replace(/(\r\n|\n|\r)/gm, '');
        const isHeaderValid = sanitizedHeader === options.fields.join(',');

        if (!isHeaderValid) {
            return { error: errors.FILE_FIELDS, valid: false };
        }

        const isContentLengthAcceptable = (content.length > 0 && content.length <= options.maxLines);

        if (!isContentLengthAcceptable) {
            return { error: errors.FILE_LENGTH, valid: false };
        }

        return { valid: true }
    }
}

module.exports = File;