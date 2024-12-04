document.getElementById('querytext').innerHTML = 'Results for "' + decodeURIComponent(urlParams.get("q")).replace('+', ' ') + '"'
document.title = 'DaiohToob - Results for "' + decodeURIComponent(urlParams.get("q")).replace('+', ' ') + '"'
document.getElementById('searchbar').value = decodeURIComponent(urlParams.get("q")).replace('+', ' ')

results = JSON.parse(
	httpGet(
		"https://vid.daguil.com/api/v1/search?q=" + sanitizeString(urlParams.get("q").replace('+', '%20')) + "azumanga+daioh&type=video",
	),
);

skipped = 0

for (i = 0; i < results.length; i++) {
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
	if (containsDaioh(results[i]["title"]) || containsDaioh(results[i]["author"])) {
		console.log(results[i]["title"])
		document.getElementById("videos").appendChild(video);
	} else {
		skipped += 1
		console.log(containsDaioh(results[i]["title"]) || containsDaioh(results[i]["author"]))
	}
}
if (i == skipped) {
	// i have no idea why the fuck skipped goes up but whatever
	console.log(i)
	console.log(skipped)
	document.getElementById('querytext').innerHTML = 'Found no results for "' + decodeURIComponent(urlParams.get("q")).replace('+', ' ') + '"'
	ohmygah.play()
}
console.log("finally");