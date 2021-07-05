require('dotenv').config();
const fetch = require('node-fetch');

module.exports = {
    isValidUrl: (url) => {
        let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
        return regEx.test(url);
    },

    stringSanitizer: (parameter) => {
        parameter = parameter.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
        return parameter.trim();
    },

    //  promisify this later
    sendBroadcastMessage: async (url, data) => {
        await fetch(url, { method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(data) 
        })
        .then(res => res.json())
        .catch(err => {
            return err;
        });
    }
};