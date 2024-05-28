const cheerio = require('cheerio');
const moment = require("moment")
const { URLSupport } = require('../URLSupport');

const fetchRecipeDetail = async (req, res, response) => {
    try {
        const $ = cheerio.load(response.data);

        let object = {};

        const elementHeader = $('._recipe-header');
        const elementTips = $('._rich-content');
        const elementTags = $('._global-tags.section-space');
        const elementIngredients = $('div._recipe-ingredients');
        const elementTutorial = $('._recipe-steps');

        let ingredientsArr = [];

        elementIngredients.find('.d-flex').each((i, e) => {
            let term = '';
            let quantity = $(e).find('.part').attr("data-base-quantity");
            let metaIngredient = $(e).find('.item').text().trim().split('\r\t')[0].split('\t');
            let productLink = $(e).find('.item').find('a').text().trim().split('\r\t')[0].split('\t')
            let ingredients

            if (metaIngredient[0] != '' && productLink[0] != '') {
                term = productLink[0].replace("\n", "");
                ingredients = `${quantity} ${term}`;
                ingredientsArr.push(ingredients)
            } else if (
                metaIngredient[0] != "" &&
                metaIngredient[metaIngredient.length - 2] != ""
            ) {
                term = metaIngredient[0].replace("\n", "").trim()
                ingredients = `${quantity} ${term}`;
                ingredientsArr.push(ingredients);
            } else if (metaIngredient[0] != "") {
                term =
                    metaIngredient[0].replace("\n", "").trim() +
                    " " +
                    metaIngredient[metaIngredient.length - 1]
                        .replace("\n", "")
                        .trim();
                ingredients = `${quantity} ${term}`;
                ingredientsArr.push(ingredients);
            }
        });
        let stepArr = [];
        elementTutorial.find('.step').each((i, e) => {
            step = $(e).find(".content").find("p").text();
            resultStep = `${step}`
            stepArr.push(resultStep);
        });

        let calories = [
            URLSupport.getParameter(elementHeader.find('._recipe-features a.icon_fire').attr("href"), "filters"),
            elementHeader.find('._recipe-features a.icon_fire').text().trim()
        ]

        let tipsArr = [];
        elementTips.find("ol li").each((i, e) => {
            li = $(e).text().trim()
            tipsArr.push(li)
        })

        let tagsArr = [];
        elementTags.find("a").each((i,e) => {
            const rawHref = $(e).attr("href")
            const href = new URLSearchParams(rawHref)
            const tag = href.get("filters")
            tagsArr.push(tag)
        })

        const dataPublishedRaw = elementHeader.children().last().find('.author').text().split('|')[1].trim()
        const dataPublishedFormated = moment(dataPublishedRaw, 'MMMM D, YYYY', 'id').format('YYYY-MM-DD');

        object.title = elementHeader.find('header h1').text().replace('\n', '').trim()
        object.thumbnail = elementHeader.find('picture .image').attr('data-src');
        object.author = elementHeader.children().last().find('.author').text().split('|')[0].trim()
        object.datePublished = dataPublishedFormated
        object.description = elementHeader.find('.excerpt').text().trim();
        object.duration = URLSupport.getParameter(elementHeader.find('._recipe-features').find('a:not([data-tracking])').attr("href"), "time");
        object.difficulty = URLSupport.getPathname(elementHeader.find('._recipe-features a.icon_difficulty').attr("href"), "difficulty");
        object.calories = (calories[0] !== null && calories[1] !== '') ? calories : []
        object.portion = elementIngredients.find('.portions #portions-value').text().trim()
        object.ingredients = ingredientsArr;
        object.steps = stepArr;
        object.tips = tipsArr;
        object.tags = tagsArr;

        res.json({
            method: req.method,
            status: true,
            results: object
        });
    } catch (error) {
        throw error;
    }
}

module.exports = { fetchRecipeDetail }