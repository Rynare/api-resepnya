const CORS_OPTION = {
    origin: ["https://*", "http://*"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

module.exports = { CORS_OPTION }