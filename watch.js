document.addEventListener('DOMContentLoaded', function () {
    const checkbox = document.getElementById('fillcheckbox');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            document.getElementById("videoplayer").style.objectFit = "cover"
			localStorage.setItem("fillvideo", true);
        } else {
            document.getElementById("videoplayer").style.objectFit = "contain"
			localStorage.setItem("fillvideo", false);
        }
    });
});

video = JSON.parse(
  httpGet("https://vid.daguil.com/api/v1/videos/" + urlParams.get("v")),
);
if (
  containsDaioh(video["title"]) ||
  containsDaioh(video["descriptionHtml"]) ||
  containsDaioh(video["author"]) ||
  containsDaioh(video["keywords"].toString())
) {
  console.log("Daioh verified.");
} else {
  ohmygah.play();
  alert("ERROR: Video does not pass the Daioh check.");
  window.location = "./index.html";
  throw new Error("OH MY GAH.");
}
document.getElementById("videotitle").innerHTML = video["title"];
document.getElementById("vidsource").src = video["formatStreams"][0]["url"];
document.getElementById("videoplayer").load();
//todo: some numbers need to have dash seperators
document.getElementById("watchlikes").innerHTML =
  numberWithCommas(video["likeCount"]) + " likes";
document.getElementById("watchviews").innerHTML =
  "<b>" + numberWithCommas(video["viewCount"]) + "</b> views";
document.getElementById("watchdate").innerHTML =
  "Uploaded " + video["publishedText"];
// document.getElementById('commentcount').innerHTML = '(' + video["viewCount"] + ')'
document.getElementById("watchsubs").innerHTML =
  video["subCountText"] + " subscribers";
document.getElementById("watchpfp").src = video["authorThumbnails"][1]["url"];
document.getElementById("watchauthor").innerHTML = truncateIt(
  video["author"],
  32,
);
document.getElementById("watchdescription").innerHTML = truncateIt(
  video["descriptionHtml"],
  200,
);
document.getElementById("subbutton").onclick = function () {
  window.open(
    "https://www.youtube.com/channel/" +
      video["authorId"] +
      "?sub_confirmation=1",
    "_blank",
  );
};
document.title = "DaiohToob - " + video["title"];

if (localStorage.getItem("fillvideo") == "true") {
	document.getElementById('fillcheckbox').checked = true
} else {
	document.getElementById('fillcheckbox').checked = false
	document.getElementById("videoplayer").style.objectFit = "contain"
}

/*
results = JSON.parse(httpGet('https://vid.daguil.com/api/v1/search?q=azumanga+daioh&sort=date&type=video'))

for (let i = 0; i < results.length; i++) {
  // is this code super shitty? yes. do i care? no lol
  video = document.createElement('div')
  video.classList.add('video')
  video.innerHTML = '<div class="thumbdiv"><a href="./watch.html?v='+results[i]["videoId"]+'" style="text-decoration:none"><img src="https://i.ytimg.com/vi/'+results[i]["videoId"]+'/default.jpg" class="thumbnail"></a><div class="duration"> '+getDuration(results[i]["lengthSeconds"])+' </div></div><div class="vidinfo"><div class="vidtitle"><a href="./watch.html?v='+results[i]["videoId"]+'"> '+truncateIt(results[i]["title"],64)+' </a></div><div class="viddesc">'+truncateIt(results[i]["description"],100)+'</div><div class="viddetails"><img src="./media/star.png"><div class="viddate"> '+results[i]["publishedText"]+'</div><div class="vidviews"> '+results[i]["viewCountText"]+' </div><div class="vidchannel"><a href="./channel.html?c='+results[i]["authorId"]+'">'+truncateIt(results[i]["author"],32)+'</a></div></div></div>'
	document.getElementById('videos').appendChild(video)
}
console.log('finally')
*/
