const CORS_OPTION = {
    origin: [
        'http://localhost:3000',
        'https://api-resepnya.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

module.exports = { CORS_OPTION }