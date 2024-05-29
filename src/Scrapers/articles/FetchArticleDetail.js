const cheerio = require('cheerio');

const fetchArticleDetail = async (req, res, response) => {
    try {
        const $ = cheerio.load(response.data);
        const element = $('.content');

        let title, thumbnail, author, published, description, filtered = [];
        let article_object = {};
        title = element.find('._article-header').find('.title').text();
        author = element.find('.info').find('.author').text().split('|');
        published = author[1].trim();
        author = author[0].trim();
        thumbnail = element.find('picture.thumbnail').find('img').attr('src') || '';
        
        element.find('._rich-content > *').each((i, e) => {
    const allowedHtmlTags = [
        'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol'
    ];

    $(e).find('noscript, figure').remove();

    const tagName = $(e).get(0).tagName.toLowerCase();

    if (allowedHtmlTags.includes(tagName)) {
        if ($(e).find("a").length > 0) {
            $(e).find("a").each((j, a) => {
                const newElement = $('<span>');
                const content = $(a).text();
                newElement.text(content);
                $(a).replaceWith(newElement);
            });
        }

        if ($(e).text().replace(/\n/g, '').trim().length >= 1) {
            const newElement = $(`<${tagName}>`);
            const content = $(e).html();
            newElement.html(content);
            filtered.push($.html(newElement));
        }
    }
});

        article_object.title = title.trim();
        article_object.thumb = thumbnail.trim();
        article_object.author = author;
        article_object.date_published = published;
        article_object.description = filtered.join("");

        res.json({
            method: req.method,
            status: true,
            results: article_object
        });

    } catch (error) {
        throw error;
    }
}

module.exports = { fetchArticleDetail }