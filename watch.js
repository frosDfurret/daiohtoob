ohmygah = new Audio('./media/oh-my-gah.mp3');
nuhuh = new Audio('./media/sectionfail.mp3');
daiohList = ['azumanga','daioh','kiyohiko','azuma','ayumu','kasuga','osaka','chiyo','mihama','sakaki','kagura','tomo','takino','minamo','kurosawa','kaori','kaorin','yukari','koyomi','mizuhara','yomi','chihiro','oh my gah']
urlParams = new URLSearchParams(window.location.search);
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

function containsDaioh(string) {
  const lowerCaseString = string.toLowerCase();
  return daiohList.some(substring => lowerCaseString.includes(substring.toLowerCase()));
}



video = JSON.parse(httpGet('https://vid.daguil.com/api/v1/videos/' + urlParams.get('v')))
if (containsDaioh(video["title"]) || containsDaioh(video["descriptionHtml"]) || containsDaioh(video["author"]) || containsDaioh(video["keywords"].toString())) {
	console.log('Daioh verified.')
} else {
	ohmygah.play()
	alert('ERROR: Video does not pass the Daioh check.')
	window.location = './index.html'
	throw new Error('OH MY GAH.')
}
document.getElementById('videotitle').innerHTML = video["title"]
document.getElementById('vidsource').src = video["formatStreams"][0]["url"]
document.getElementById('videoplayer').load()
//todo: some numbers need to have dash seperators
document.getElementById('watchlikes').innerHTML = video["likeCount"] + ' likes'
document.getElementById('watchviews').innerHTML = '<b>' + video["viewCount"] + '</b> views'
document.getElementById('watchdate').innerHTML = 'Uploaded ' + video["publishedText"]
// document.getElementById('commentcount').innerHTML = '(' + video["viewCount"] + ')'
document.getElementById('watchsubs').innerHTML = video["subCountText"] + ' subscribers'
document.getElementById('watchpfp').src = video["authorThumbnails"][1]["url"]
document.getElementById('watchauthor').innerHTML = truncateIt(video["author"],32)
document.getElementById('watchdescription').innerHTML = truncateIt(video["descriptionHtml"],200)
document.getElementById('subbutton').onclick = function(){window.open('https://www.youtube.com/channel/'+ video['authorId'] +'?sub_confirmation=1', '_blank');}
document.title = 'DaiohToob - ' + video["title"]

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