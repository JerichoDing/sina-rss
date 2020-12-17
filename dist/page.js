fetch('./rss.json')
.then(async function (response) {
  const res = await response.json();
  const items = res.items;

  const list = document.querySelector('.list');

  items.forEach(i => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const timeObj = new Date(i.date_modified);
    p.innerHTML = `${i.title} （<a href="${i.url}" target="_blank">${timeObj.getHours()}:${timeObj.getMinutes()}</a>）`;
    li.appendChild(p);
    list.appendChild(li);
  });
})

window.onload = function () {
  if (window.console) {
    console.log('%c ᕦ 每日全球财经新闻  copyright from Sina ᕤ','color:#2cccd3;24px -apple-system,Microsoft YaHei,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,sans-serif')
  }
}