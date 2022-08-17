const channelItemsSection = document.querySelector(".channel-items");
const newsSection = document.querySelector(".news-items");

const channelItems = document.querySelectorAll(".channel-item");
const newsItems = document.querySelectorAll(".news-item");

fetch("/sources")
  .then((response) => response.json())
  .then((data) => {
    data["sources"].slice(0, 7).forEach((channel) => {
      displayChannel(channel);
    });
  })
  .catch((err) => console.log(err));

fetch("/news/?search=q&sources=al-jazeera-english&language=en").then((response) =>
  response.json().then((data) => {
    data["articles"].forEach((article) => {
      displayNews(article);
    });
  })
);

function getChannelImage(id) {
  if (id == "abc-news") {
    return "images/channels/abc.png";
  } else if (id == "al-jazeera-english") {
    return "images/channels/aljazeera.png";
  } else if (id == "abc-news") {
    return "images/channels/abc.png";
  } else if (id == "bbc-news") {
    return "images/channels/bbc-news.png";
  } else if (id == "google-news") {
    return "images/channels/google-news.png";
  } else {
    return "images/channels/channel-news.jpg";
  }
}

function displayChannel(channel) {
  const channelItemDiv = document.createElement("div");
  channelItemDiv.className = "channel-item";

  channelItemDiv.addEventListener("click", (e) => {
    // channelItems.forEach((item) => item.classList.remove("active"));
    e.target.classList.add("active");
  });

  channelItemDiv.addEventListener("dblclick", (e) => {
    window.open(channel.url, "_blank");
  });

  const channelImage = document.createElement("img");
  channelImage.src = getChannelImage(channel.id);

  const channelTitle = document.createElement("h3");
  channelTitle.textContent = channel.name;

  channelItemDiv.appendChild(channelImage);
  channelItemDiv.appendChild(channelTitle);

  channelItemsSection.appendChild(channelItemDiv);
}

function displayNews(newsObj) {
  const newsItemDiv = document.createElement("div");
  newsItemDiv.className = "news-item";

  newsItemDiv.addEventListener("click", (e) => {
    window.open(newsObj.url, "_blank");
  });

  const newsImageDiv = document.createElement("div");
  newsImageDiv.className = "image";

  const newsImage = document.createElement("img");
  newsImage.src = newsObj["urlToImage"];

  newsImageDiv.appendChild(newsImage);

  const detailsDiv = document.createElement("div");
  detailsDiv.className = "details";

  const title = document.createElement("h3");
  title.textContent = newsObj.title;

  const metaDiv = document.createElement("div");
  metaDiv.className = "meta";

  const author = document.createElement("span");
  author.className = "author";
  author.textContent = newsObj.author;

  const source = document.createElement("span");
  source.className = "source";
  source.textContent = newsObj.source.name;

  metaDiv.appendChild(author);
  metaDiv.appendChild(source);

  detailsDiv.appendChild(title);
  detailsDiv.appendChild(metaDiv);

  newsItemDiv.appendChild(newsImageDiv);
  newsItemDiv.appendChild(detailsDiv);

  newsSection.appendChild(newsItemDiv);
}
