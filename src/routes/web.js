const { Scrapper } = require('../Scrapers/Scrapper');

const route = require('express').Router();

route.get(['/', '/api'], (req, res) => {
    res.json({
        method: req.method,
        message: 'Read about API documentation below.',
        documentation: 'https://github.com/Rynare/kulinery-api',
        status: 'active',
        lets_connected: {
            github: 'https://github.com/Rynare',
            facebook: "https://www.facebook.com/fahimdb",
            instagram: "https://www.instagram.com/darkchocolates49",
        }
    });
});

route.get('/api/recipes', Scrapper.getRecipes);
route.get('/api/recipes/page/:page', Scrapper.getRecipesOnPage);
route.get('/api/recipes/categories', Scrapper.getRecipeCategories);
route.get('/api/recipes/category/:category', Scrapper.getRecipesByCategory);
route.get('/api/recipes/category/:category/:page', Scrapper.getRecipesByCategoryOnPage);
route.get('/api/recipes/search/:keyword', Scrapper.getSearchRecipes);
route.get('/api/recipes/search/:keyword/:page', Scrapper.getSearchRecipesOnPage);
route.get('/api/recipe/:slug', Scrapper.getRecipeDetail);

route.get('/api/articles', Scrapper.getArticles);
route.get('/api/articles/page/:page', Scrapper.getArticlesOnPage);
route.get('/api/articles/categories', Scrapper.getArticleCategories);
route.get('/api/articles/category/:category', Scrapper.getArticleByCategory);
route.get('/api/articles/category/:category/:page', Scrapper.getArticleByCategoryOnPage);
route.get('/api/article/:category_slug/:article_slug', Scrapper.getArticleDetail);

route.get('*', (req, res) => {
    res.status(404).json({
        method: req.method,
        message: 'Sorry, your request was not found on the server.',
        status: false,
    });
});

module.exports = { route };
