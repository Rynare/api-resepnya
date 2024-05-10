const cheerio = require('cheerio');

const fetchArticleDetail = async (req, res, response) => {
    try {
        const $ = cheerio.load(response.data);
        const element = $('.content');

        let title, thumbs, author, published, description, filtered;
        let article_object = {};
        title = element.find('._article-header').find('.title').text();
        author = element.find('.info').find('.author').text().split('|');
        published = author[1].trim();
        author = author[0].trim();
        thumbs = element.find('picture.thumbnail').find('img').attr('data-src');

        element.find('._rich-content').each((i, e) => {
            const checkImg = new RegExp('^<img')
            description = $(e).text().trim().split('\n')
            filtered = description.filter((e) => !checkImg.test(e))
        });

        article_object.title = title.trim();
        article_object.thumb = thumbs.trim();
        article_object.author = author;
        article_object.date_published = published;
        article_object.description = filtered;

        res.send({
            method: req.method,
            status: true,
            results: article_object
        });

    } catch (error) {
        throw error;
    }
}

module.exports = { fetchArticleDetail }