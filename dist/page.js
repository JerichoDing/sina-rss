const list = document.querySelector(".list");
getLvv()
function changeList() {
  let selectedIndex = document.getElementById("select").selectedIndex;
  if (selectedIndex === 1) {
    getSina();
  }else{
    getLvv()
  }
}
function getSina() {
  loading();
  fetch("./rss.json").then(async function (response) {
    let res = await response.json();
    let items = res.items;
    render(items);
  });
}
function getLvv() {
  loading();
  fetch("./lvv.json").then(async function (response) {
    let res = await response.json();
    let items = res.items;
    render(items);
  });
}
function render(items) {
  setTimeout(() => {
    list.innerHTML = "";
    items.forEach((i) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      const timeObj = new Date(i.date_modified);
      p.innerHTML = `<a href="${i.url}" target="_blank">${i.title}</a> （<span>${timeObj.getHours()}:${timeObj.getMinutes()}</span>）`;
      li.appendChild(p);
      list.appendChild(li);
    });
  }, 100);
}
function loading() {
  let innerHTML = "";
  for (let i = 0; i < 15; i++) {
    innerHTML += `<div class="notification is-info is-light"></div>`;
  }
  list.innerHTML = innerHTML;
}

window.onload = function () {
  if (window.console) {
    console.log(
      "%c ᕦ 每日全球财经新闻  copyright from Sina ᕤ",
      "color:#2cccd3;24px -apple-system,Microsoft YaHei,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,sans-serif"
    );
  }
};
