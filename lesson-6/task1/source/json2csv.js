const fs = require("fs");
const os = require("os");

class Json2csv {
    constructor() {
        this._headers = '';
        this._separator = ';';
        this._data = '';
    }

    parse(inputFile, outputFile) {
        const inputStream = fs.createReadStream(inputFile, {"encoding": "utf8"});
        const outPutStream = fs.createWriteStream(outputFile);

        inputStream.on('data', (chunk) => {
            this._data += chunk;
        });

        inputStream.on('end', () => {
            const csvData = this.convertData();

            outPutStream.write(csvData);
            outPutStream.end();
        });
    }

    convertData() {
        let firstLine = true;

        this._data = JSON.parse(this._data);

        let body = '';

        this._data.forEach((item) => {
            let row = '';
            if (firstLine) {
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                       this._headers += `${key}${this._separator}`;
                    }
                }

                this._headers = this._headers.slice(0, -1);
                this._headers += os.EOL;

                firstLine = false;
            }

            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    if (typeof item[key] === "string") {
                        row += `${item[key].replace(/\r|\r?\n/g, ' ')}${this._separator}`;
                    } else {
                        row += `${item[key]}${this._separator}`;
                    }
                }
            }

            row = row.slice(0, -1);
            row += os.EOL;

            body += row;
        });

        return `${this._headers}${body}`;
    }
}

module.exports = Json2csv;
