const URLSupport = {
    getParameter: function (url, whatYouNeed) {
        const params = new URLSearchParams(url);
        return params.get(whatYouNeed)
    },
    getPathname: function (urlString, index) {
        const parsedUrl = new URL(urlString);
        let pathname = parsedUrl.pathname;
        pathname = pathname.replace(/^\/+|\/+$/g, '');
        const parts = pathname.split('/');
        return parts[index];
    }
}

module.exports = { URLSupport }