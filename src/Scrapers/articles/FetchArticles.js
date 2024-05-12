const cheerio = require('cheerio');
const { URLSupport } = require('../URLSupport');

const fetchArticles = (req, res, response) => {
    try {
        const $ = cheerio.load(response.data);
        const element = $('._articles-list');
        let articles = [];
        element.find('._article-card .card').each((i, e) => {
            articles.push({
                slug: URLSupport.getPathname($(e).find('h3 a').attr('href'), 1),
                title: $(e).find('h3 a').attr('data-tracking-value'),
                thumbnail: $(e).find('picture').find('img').attr('data-src').trim(),
                category: {
                    slug: URLSupport.getPathname($(e).find('h3 a').attr('href'), 0),
                    name: URLSupport.getPathname($(e).find('h3 a').attr('href'), 0).replace(/-/g, " "),
                }
            });
        });
        function getTotalPages(href, iteration = 0) {
            if (!href?.includes("/page/")) {
                return 0
            }
            const total = parseInt(URLSupport.getPathname(href, iteration))
            if (isNaN(total)) {
                return getTotalPages(href, iteration += 1)
            } else {
                if (!href.includes("/page/" + total)) {
                    return 0
                }
                return total
            }
        }
        res.json({
            method: req.method,
            status: true,
            pages: getTotalPages($("._pagination-button a.last").attr("href")),
            results: articles
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { fetchArticles }