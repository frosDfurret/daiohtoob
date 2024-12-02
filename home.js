apiurl = "https://invidious.jing.rocks/api/v1/"
ohmygah = new Audio('./media/oh-my-gah.mp3');

// i don't care that this isn't asynchronous
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function truncateIt(txt, len)
{
    if (txt.length > len) {
        return txt.slice(0, len) + '...';
    } else {
        return txt;
    }
}

function getDuration(time) {
	if (time >= 60 && time < 3600) {
		min = Math.floor(time/60)
		sec = time - min * 60
		return min.toString() + ':' + sec.toString().padStart(2, '0')
	} else if (time > 3600) {
		hour = Math.floor(time/60/60)
		min = Math.floor(time/60) - hour * 60
		sec = time - min * 60
		return hour.toString() + ':' + min.toString() + ':' + sec.toString().padStart(2, '0')
	} else {
		return "0:" + time.toString().padStart(2, '0')
	}
}

results = JSON.parse(httpGet(apiurl + 'search?q=azumanga+daioh&sort=date'))

for (let i = 0; i < results.length; i++) {
  // is this code super shitty? yes. do i care? no lol
  video = document.createElement('div')
  video.classList.add('video')
  video.innerHTML = '<div class="thumbdiv"><a href="./watch.html?v='+results[i]["videoId"]+'" style="text-decoration:none"><img src="https://i.ytimg.com/vi/'+results[i]["videoId"]+'/default.jpg" class="thumbnail"></a><div class="duration"> '+getDuration(results[i]["lengthSeconds"])+' </div></div><div class="vidinfo"><div class="vidtitle"><a href="./watch.html?v='+results[i]["videoId"]+'"> '+truncateIt(results[i]["title"],64)+' </a></div><div class="viddesc">'+truncateIt(results[i]["description"],100)+'</div><div class="viddetails"><img src="./media/star.png"><div class="viddate"> '+results[i]["publishedText"]+'</div><div class="vidviews"> '+results[i]["viewCountText"]+' </div><div class="vidchannel"><a href="./channel.html?c='+results[i]["authorId"]+'">'+truncateIt(results[i]["author"],32)+'</a></div></div></div>'
	document.getElementById('videos').appendChild(video)
} 
console.log('finally')
