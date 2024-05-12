const cheerio = require('cheerio');
const { URLSupport } = require('./URLSupport');
require("dotenv").config()

const HOST = process.env.HOST

const SITE_MAP_SECTION = [, "artikel", "kategori artikel", "resep", "kategori resep", ,]
function getSectionOrder(sectionName) {
    return SITE_MAP_SECTION.indexOf(sectionName) + 1
}
function getSection(rawDom, sectionName) {
    const $ = cheerio.load(rawDom);
    return {
        root: $,
        section: $(`.container section:nth-of-type(${getSectionOrder(sectionName)})`)
    };
}

const SiteMap = {
    getRecipeCategories: function (req, res, response) {
        try {
            const { root: $, section } = getSection(response.data, "kategori resep");
            let categories = [];

            section.find('li a').each((index, element) => {
                let category, url, slug;
                url = $(element).attr("href")
                slug = URLSupport.getPathname(url, 1)
                category = slug.replace(/-/g, " ")
                categories.push({
                    slug: slug,
                    name: category,
                    url: `${HOST}/api/recipes/category/${slug}`,
                });
            })

            return res.json({
                method: req.method,
                status: true,
                results: categories
            });
        } catch (error) {
            throw error
        }
    },

    getArticleCategories: function (req, res, response) {
        try {
            const { root: $, section } = getSection(response.data, "kategori artikel");
            let categories = [];

            section.find('li a').each((index, element) => {
                let category, url, slug;
                url = $(element).attr("href")
                slug = URLSupport.getPathname(url, 0)
                category = slug.replace(/-/g, " ")
                categories.push({
                    slug: slug,
                    name: category,
                    url: `${HOST}/api/articles/category/${slug}`,
                });
            })

            return res.json({
                method: req.method,
                status: true,
                results: categories
            });
        } catch (error) {
            throw error
        }
    }
}

module.exports = { SiteMap }