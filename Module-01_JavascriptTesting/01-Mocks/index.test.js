const { errors } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')

;

(async() => {
    {
        const filePath = '../mocks/emptyFile-invalid.csv';
        const rejection = new Error(errors.FILE_LENGTH);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);
    } {
        const filePath = '../mocks/fourItems-invalid.csv';
        const rejection = new Error(errors.FILE_LENGTH);
        const result = File.csvToJson(filePath);
        await rejects(result, rejection);
    } {
        Date.prototype.getFullYear = () => 2020;
        const filePath = '../mocks/threeItems-valid.csv';
        const result = await File.csvToJson(filePath);
        const expected = [{
                "name": "Eric kWendel",
                "id": 123,
                "profession": "Javascript Instructor",
                "birthday": 1995
            },
            {
                "name": "Xuxa da Silva",
                "id": 321,
                "profession": "Javascript specialist",
                "birthday": 1940
            },
            {
                "name": "Joaozinho",
                "id": 231,
                "profession": "Java developer",
                "birthday": 1990
            }
        ];

        deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
    }
})();