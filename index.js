const fetch = require('node-fetch');
const { url } = require('./sina.js');
const Feed = require('feed').Feed;
const fs = require('fs').promises

const feed = new Feed({
  title: '新浪新闻',
  description: '新浪全球实时财经新闻',
  link: 'https://new-rss.netlify.app',
  language: 'zh-CN',
  generator: 'sina news feed generator',
  feedLinks: {
    json: 'https://cdn.jsdelivr.net/gh/JerichoDing/sina-rss@1.1/dist/rss.json',
    rss: 'https://cdn.jsdelivr.net/gh/JerichoDing/sina-rss@1.1/dist/rss.xml'
  },
});


async function main() {
  try {
    const response = await fetch(url, {
      headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10130'}
    });
    const json = await response.json();
    const result = json.result || {};
    if (!result.status || result.status.code !== 0) return;
    const items = result.data.feed.list;

    items.forEach(item => {
      feed.addItem({
        title: item.rich_text,
        id: item.id,
        link: item.docurl,
        content: '',
        date: new Date(item.create_time + '+08:00'),
      });
    });

    await fs.rmdir('./dist', { recursive: true});
    await fs.mkdir('./dist');

    await fs.writeFile('./dist/rss.json', feed.json1());
    await fs.writeFile('./dist/rss.xml', feed.rss2());

    await fs.copyFile('./template/index.html', `./dist/index.html`);
    await fs.copyFile('./template/favicon.ico', `./dist/favicon.ico`);
    await fs.copyFile('./template/page.js', `./dist/page.js`);

    console.log(`successfully`);


    let lvvResult = await fetch(`https://ruanyf.github.io/lvv2-feed/rss.json?t=${new Date().getTime()}`, {
      headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10130'}
    });
    const lvv = await lvvResult.json();
    lvv.title = '聚焦中国，观察全球'
    lvv.description = 'Copyright from https://lvv2.com'
    lvv.home_page_url = 'https://new-rss.netlify.app'
    const lvvFeed = JSON.stringify(lvv,"","\t")
    await fs.writeFile('./dist/lvv.json', lvvFeed);
  } catch (err) {
    throw err;
  }
}

main();
