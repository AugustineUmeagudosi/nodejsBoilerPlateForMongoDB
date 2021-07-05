module.exports = {
    notFound: ( message, res ) => {
        return res.status(404).json({ status: 'Not found', message: message, data:[] });
    },

    badRequest: ( message, res ) => {
        return res.status(400).json({ status: 'Bad request', message: message, data:[] });
    },

    forbidden: ( message, res ) => {
        return res.status(403).json({ status: 'Forbidden', message: message, data:[] });
    },

    success: ( message, data, res ) => {
        return res.status(200).json({ status: 'success', message: message, data: data });
    },

    created: ( message, data, res ) => {
        return res.status(201).json({ status: 'created', message: message, data: data });
    },

    successfulLogin: ( token, message, data, res ) => {
        return res.header('Authorization', token).status(200).json({ status: 'success', message: message, data: data });
    },

    noContent( message, res ){
        return res.status(204).json({  status: 'No content', message: message });
    },

    partialContent: (message, data, res) => {
        return res.status(206).json({ status: 'Partial content', message: message, data: data });
    },

    unauthorized: (message, res) => {
        return res.status(401).json({ status: 'Unauthorized', message: message || "You don't have permission to view this resource.", data: [] });
    },

    notAcceptable: ( res ) => {
        return res.status(406).json({ status: 'Not Acceptable.', message: 'Input unacceptable',  data:[] });
    },

    internalServerError: ( message, res ) => {
        return res.status(500).json({ status: 'Internal Server error', message: message, data:[] });
    },

    globalErrorReporter: ( message, status, res ) => {
        return res.status(status).json({ status: 'Internal Server error', message: message });
    }
};