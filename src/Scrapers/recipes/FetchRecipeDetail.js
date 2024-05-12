const cheerio = require('cheerio');
const { URLSupport } = require('../URLSupport');

const fetchRecipeDetail = async (req, res, response) => {
    try {
        const $ = cheerio.load(response.data);

        let object = {};

        const elementHeader = $('._recipe-header');
        const elementNeeded = $('._product-popup');
        const elementIngredients = $('div._recipe-ingredients');
        const elementTutorial = $('._recipe-steps');

        let product_usedArr = [];
        elementNeeded.find('.product-popup-items>div>.card').each((i, e) => {
            const thumbnail = $(e).find('picture.thumbnail').find('img').attr('data-src');
            const name = $(e).find('div.title').text().replace(/\t/g, '');
            product_usedArr.push({
                name: name.trim(),
                thumbnail: thumbnail
            });
        });
        let ingredientsArr = [];
        elementIngredients.find('.d-flex').each((i, e) => {
            let term = '';
            let quantity = $(e).find('.part').text().trim();
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

        object.title = elementHeader.find('header h1').text().replace('\n', '').trim()
        object.thumbnail = elementHeader.find('picture .image').attr('data-src');
        object.author = elementHeader.children().last().find('.author').text().split('|')[0].trim()
        object.datePublished = datePublished = elementHeader.children().last().find('.author').text().split('|')[1].trim()
        object.desc = elementHeader.find('.excerpt').text().trim();
        object.servings = elementHeader.find('._kritique-rate div').attr('style');
        object.duration = URLSupport.getParameter(elementHeader.find('._recipe-features').find('a:not([data-tracking])').attr("href"), "time");
        object.difficulty = URLSupport.getPathname(elementHeader.find('._recipe-features a.icon_difficulty').attr("href"), "difficulty");
        object.calories = (calories[0] !== null && calories[1] !== '') ?
            calories :
            []
        object.product_useds = product_usedArr;
        object.ingredients = ingredientsArr;
        object.steps = stepArr;

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