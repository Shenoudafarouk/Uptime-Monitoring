const util = require('util');
const fs = require('fs')
const readFile = util.promisify(fs.readFile);

module.exports.loadSupportedLanguages = async function () {
    const languagesFile = await readFile(`${process.env.LANGUAGE_FILE_PATH}`, 'utf8');
    const languagesJson = JSON.parse(languagesFile);
    return languagesJson.languages
}

