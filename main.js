ohmygah = new Audio("./media/oh-my-gah.mp3");
nuhuh = new Audio("./media/sectionfail.mp3");
daiohList = [
  "azuman",
  "daio",
  "kiyohiko",
  "azuma",
  "ayumu",
  "kasuga",
  "osak",
  "chiy",
  "mihama",
  "sakak",
  "kagur",
  "tom",
  "takin",
  "minamo",
  "nyam",
  "kurosaw",
  "kaori",
  "yukar",
  "koyomi",
  "mizuhar",
  "yom",
  "chihir",
  "oh my gah",
  "sata",
  "andagi",
  "america ya"
];
urlParams = new URLSearchParams(window.location.search);
// i don't care that this isn't asynchronous
function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function truncateIt(txt, len) {
  if (txt.length > len) {
    return txt.slice(0, len) + "...";
  } else {
    return txt;
  }
}

function getDuration(time) {
  if (time >= 60 && time < 3600) {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return min.toString() + ":" + sec.toString().padStart(2, "0");
  } else if (time >= 3600) {
    const hour = Math.floor(time / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = time % 60;
    return (
      hour.toString() +
      ":" +
      min.toString().padStart(2, "0") +
      ":" +
      sec.toString().padStart(2, "0")
    );
  } else {
    return "0:" + time.toString().padStart(2, "0");
  }
}


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function containsDaioh(string) {
  const lowerCaseString = string.toLowerCase();
  return daiohList.some((substring) =>
    lowerCaseString.includes(substring.toLowerCase()),
  );
}

function sanitizeString(input) {
	// i hate regex
	const regex = /[a-zA-Z0-9+\-!?.%]/g;
	return input.replace(/ /g, '+').match(regex)?.join('') || '';
}


function doSearch() {
	window.location = "./search.html?q=" + encodeURIComponent(sanitizeString(document.getElementById('searchbar').value))
}

    document.getElementById('searchbar').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            doSearch()
        }
    });
	
	 document.getElementById('searchbutton').addEventListener('click', function() {
        doSearch()
    });