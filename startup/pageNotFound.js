const reaponseMessages = require('../src/helpers/responseMessages');
const message = 'Sorry, the resource you are looking for was not found.';

module.exports = function (app) {
    app.get('*', (req, res) => { return reaponseMessages.notFound(message, res); });
    app.post('*', (req, res) => { return reaponseMessages.notFound(message, res); });
    app.put('*', (req, res) => { return reaponseMessages.notFound(message, res); });
    app.delete('*', (req, res) => { return reaponseMessages.notFound(message, res); });
};