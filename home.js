results = JSON.parse(
  httpGet(
    "https://vid.daguil.com/api/v1/search?q=azumanga+daioh&sort=date&type=video",
  ),
);

for (let i = 0; i < results.length; i++) {
  // is this code super shitty? yes. do i care? no lol
  video = document.createElement("div");
  video.classList.add("video");
  video.innerHTML =
    '<div class="thumbdiv"><a href="./watch.html?v=' +
    results[i]["videoId"] +
    '" style="text-decoration:none"><img src="https://i.ytimg.com/vi/' +
    results[i]["videoId"] +
    '/default.jpg" class="thumbnail"></a><div class="duration"> ' +
    getDuration(results[i]["lengthSeconds"]) +
    ' </div></div><div class="vidinfo"><div class="vidtitle"><a href="./watch.html?v=' +
    results[i]["videoId"] +
    '"> ' +
    truncateIt(results[i]["title"], 64) +
    ' </a></div><div class="viddesc">' +
    truncateIt(results[i]["description"], 100) +
    '</div><div class="viddetails"><img src="./media/star.png"><div class="viddate"> ' +
    results[i]["publishedText"] +
    '</div><div class="vidviews"> ' +
    results[i]["viewCountText"] +
    ' </div><div class="vidchannel"><a href="javascript:nuhuh.play()">' +
    truncateIt(results[i]["author"], 32) +
    "</a></div></div></div>";
  document.getElementById("videos").appendChild(video);
}
console.log("finally");
