require('dotenv').config();

const { AxiosServices } = require('../service/axios-services');
const { SiteMap } = require('./SiteMap');
const { fetchArticleDetail } = require('./articles/FetchArticleDetail');
const { fetchArticles } = require('./articles/FetchArticles');
const { fetchRecipeDetail } = require('./recipes/FetchRecipeDetail');
const { fetchRecipes } = require('./recipes/FetchRecipes');

const baseUrl = process.env.SCRAP_TARGET_URL

async function fetchDataAndProcess(req, res, url, processDataFunc) {
    try {
        const response = await AxiosServices.fetchData(url);
        return processDataFunc(req, res, response);
    } catch (error) {
        res.status(500).json({
            method: req.method,
            status: false,
            error: {
                message: 'An error occurred while fetching or processing the data.',
                ...error
            }
        });
    }
}

const Scrapper = {
    getRecipes: async (req, res) => {
        const url = `${baseUrl}/resep/`;
        return fetchDataAndProcess(req, res, url, fetchRecipes);
    },

    getRecipesOnPage: async (req, res) => {
        const page = req.params.page;
        const url = `${baseUrl}/resep/page/${page}`;
        return fetchDataAndProcess(req, res, url, fetchRecipes);
    },

    getRecipesByCategory: async (req, res) => {
        const category = req.params.category_slug;
        const url = `${baseUrl}/resep/${category}`;
        return fetchDataAndProcess(req, res, url, fetchRecipes);
    },

    getRecipesByCategoryOnPage: async (req, res) => {
        const category = req.params.category_slug;
        const page = req.params.page;
        const url = `${baseUrl}/resep/${category}/page/${page}`;
        return fetchDataAndProcess(req, res, url, fetchRecipes);
    },

    getRecipeCategories: async (req, res) => {
        const url = `${baseUrl}/site-map/`;
        return fetchDataAndProcess(req, res, url, SiteMap.getRecipeCategories);
    },

    getRecipeDetail: async (req, res) => {
        const slug = req.params.slug;
        const url = `${baseUrl}/resep/${slug}`;
        return fetchDataAndProcess(req, res, url, fetchRecipeDetail);
    },

    getSearchRecipes: async (req, res) => {
        const query = req.params.keyword;
        const url = `${baseUrl}/?s=${query}`;
        return fetchDataAndProcess(req, res, url, fetchRecipes);
    },

    getSearchRecipesOnPage: async (req, res) => {
        const query = req.params.keyword;
        const page = req.params.page;
        const url = `${baseUrl}/page/${page}/?s=${query}`;
        return fetchDataAndProcess(req, res, url, fetchRecipes);
    },

    getArticles: async (req, res) => {
        const url = `${baseUrl}/artikel`;
        return fetchDataAndProcess(req, res, url, fetchArticles);
    },

    getArticlesOnPage: async (req, res) => {
        const page = req.params.page;
        const url = `${baseUrl}/artikel/page/${page}`;
        return fetchDataAndProcess(req, res, url, fetchArticles);
    },

    getArticleByCategory: async (req, res) => {
        const category = req.params.category_slug;
        const url = `${baseUrl}/${category}`;
        return fetchDataAndProcess(req, res, url, fetchArticles);
    },

    getArticleByCategoryOnPage: async (req, res) => {
        const category = req.params.category_slug;
        const page = req.params.page;
        const url = `${baseUrl}/${category}/page/${page}`;
        return fetchDataAndProcess(req, res, url, fetchArticles);
    },

    getArticleCategories: async (req, res) => {
        const url = `${baseUrl}/site-map/`;
        return fetchDataAndProcess(req, res, url, SiteMap.getArticleCategories);
    },

    getArticleDetail: async (req, res) => {
        const category_slug = req.params.category_slug;
        const article_slug = req.params.article_slug;
        const url = `${baseUrl}/${category_slug}/${article_slug}`;
        return fetchDataAndProcess(req, res, url, fetchArticleDetail);
    },
}

module.exports = { Scrapper }