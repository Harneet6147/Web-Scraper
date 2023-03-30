const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const Json2csvParser = require('json2csv').Parser;
const { formatData } = require('./Date_Formatter');
const website = 'https://www.theverge.com/';
const date = new Date();
const FILE_NAME = formatData(date.getDate()) + formatData(date.getMonth() + 1) + date.getFullYear() + '_verge';

const URLS = [
    {
        id: 1,
        url: 'https://www.theverge.com/2023/3/28/23659191/amazon-sidewalk-network-coverage',
    },
    {
        id: 2,
        url: 'https://www.theverge.com/2023/3/28/23659868/amazon-returns-warning-product-reviews-tag-feature',
    },
    {
        id: 3,
        url: 'https://www.theverge.com/23658631/kitchen-cooking-coffee-gadgets-favorite-tech',
    },
    {
        id: 4,
        url: 'https://www.theverge.com/2023/3/29/23662621/google-bard-chatgpt-sharegpt-training-denies',
    },
    {
        id: 5,
        url: 'https://www.theverge.com/2023/3/29/23661826/disney-fired-isaac-perlmutter-marvel',
    },
    {
        id: 6,
        url: 'https://www.theverge.com/2023/3/29/23637956/apple-wwdc-2023-event-date-vr-headset-mac-pro',
    },
    {
        id: 7,
        url: 'https://www.theverge.com/2023/3/29/23662175/instagram-collaborative-collections-shared-with-friends',
    },
    {
        id: 8,
        url: 'https://www.theverge.com/2023/3/29/23661352/last-of-us-part-i-pc-launch-bugs-issues',
    },
    {
        id: 9,
        url: 'https://www.theverge.com/2023/3/29/23662548/netflix-iphone-controller-games-code-test',
    },
    {
        id: 10,
        url: 'https://www.theverge.com/2023/3/29/23661374/elon-musk-ai-researchers-pause-research-open-letter',
    }
];

(async () => {

    let ArticlesData = [];

    for (let article of URLS) {
        const response = await requestPromise({
            uri: article.url,
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'max-age=0',
                'cookie': 'vmidv1=29f9a88d-d1d5-405a-952f-46e055deafbb; _chorus_geoip_continent=AS',
                'referer': 'https://www.theverge.com/',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
            },
        });

        let $ = cheerio.load(response);

        let headline = $('article[class="my-24 mx-auto w-full max-w-container-lg md:mt-16 lg:mt-45"] > div[class="duet--article--lede mx-auto mb-28 w-full md:max-w-container-md lg:mb-36 lg:max-w-none"] > h1').text();
        let URL = article.url;
        let id = article.id;
        let author = website + $('span[class="font-medium uppercase tracking-6"] > a').attr('href');
        let date = $('div[class="duet--article--date-and-comments mb-12 font-polysans text-12 text-gray-5a"] > time[class="duet--article--timestamp font-polysans text-12"]').text();

        ArticlesData.push({
            id,
            headline,
            URL,
            author,
            date
        })
    }

    const fields = ['id', 'URL', 'headline', 'author', 'date'];
    const json2csvParser = new Json2csvParser({ fields });
    const csv = json2csvParser.parse(ArticlesData);
    fs.writeFileSync(`./${FILE_NAME}.csv`, csv, 'utf-8');
    //console.log(csv);
    debugger;


})()