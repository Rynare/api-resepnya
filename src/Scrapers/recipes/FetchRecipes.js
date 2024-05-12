const cheerio = require('cheerio');
const { URLSupport } = require('../URLSupport.js');

const fetchRecipes = (req, res, response) => {
    try {
        const $ = cheerio.load(response.data);
        const element = $('._recipes-list');
        let recipe_list = [];
        element.find('._recipe-card .card').each((i, e) => {
            let calories = [
                URLSupport.getParameter($(e).find('._recipe-features a.icon_fire').attr("href"), "filters"),
                $(e).find('._recipe-features a.icon_fire').text().trim()
            ]
            recipe_list.push({
                slug: $(e).find('h3 a').attr('href').split('/')[4],
                title: $(e).find('h3 a').attr('data-tracking-value'),
                thumbnail: $(e).find('picture img').attr('data-src'),
                duration: URLSupport.getParameter($(e).find('._recipe-features a').attr("href"), "time"),
                difficulty: URLSupport.getParameter($(e).find('._recipe-features a.icon_difficulty').attr("href"), "difficulty"),
                calories: (calories[0] !== null && calories[1] !== '') ?
                    calories :
                    []
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
            results: recipe_list
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { fetchRecipes }