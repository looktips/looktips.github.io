var channel = GetQueryString("channel");
var cid = GetQueryString("cid");
var vid = '',
	id = 0,
	vlist = '',
	listrange = 40;
	listrange_img = 6;
var website = ' - 7buu.com';
var timeout;
var timeoutstr = '<div class="loading" onclick="location.reload();"><p>连接超时，点击重新加载...</p></div>'

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = decodeURI(window.location.search.substr(1)).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

vtitle = GetQueryString("title");
document.title = GetQueryString("title") + website;
document.getElementById("video_title").innerHTML = vtitle;

vurl = 'https://v.qq.com/iframe/player.html?vid=' + GetQueryString("vid") + '&tiny=1&auto=1';
document.getElementById("qplayer").src = vurl;



function jsonpChan(result) {
	clearTimeout(timeout);
	document.getElementById("loading").innerHTML = '<div class="loading loaded" onclick="javascript:scrollTo( 0, 0 );"><p>回到顶部</p></div>';
	vlist = result;
	id = GetQueryString("id");
	vid = GetQueryString("vid");
	play(vid, id);
}

function play(vid, id) {
	scrollTo( 0, 0 );
	console.info(vid, id);
	listbox = GetQueryString("listbox");
	if (listbox == 'ul_btn') {
		vtitle = vlist[id]['title'];
		document.title = vtitle + website;
		document.getElementById("video_title").innerHTML = vtitle;
		vurl = '<script type="text/javascript">var videobox = document.getElementById("videobox");var w = videobox.offsetWidth;videobox.style.height = parseInt(w / 16 * 9.1) + "px";</script><iframe id="qplayer" frameborder="0" width="100%" height="100%" src="https://v.qq.com/iframe/player.html?vid=n0020yrnly7&tiny=1&auto=1" allowfullscreen></iframe>'.replace('n0020yrnly7', vid);
		document.getElementById("videobox").innerHTML = vurl;

		if (id == 0) {
			i = id;
			vRange = id + listrange;
		} else {
			i = id - 1;
			vRange = id - 1 + listrange;
		}
		if ((vlist.length - i) < listrange) {
			if ((vlist.length - listrange) < 0) {
				i = 0;
			} else {
				i = vlist.length - listrange;
			}
		}
		vids = [];
		for (i; i < vRange && i < vlist.length; i++) {
			var vtitle = vlist[i]['title'];
			var vid = vlist[i]['vid'];
			var item = '<li onclick = "play(vidstr,idstr);"><a><span>titlevar</span></a></li>'.replace(/titlevar/g, vtitle).replace(/vidstr/g, "'" + vid + "'").replace(/idstr/g, "'" + i + "'");
			if (i == id) {
				item = item.replace('<li', '<li class="active"');
			}
			vids.push(item);
		}
		ul_btn = '<ul id="ul_btn" class="ul_btn">' + vids.join("") + '</ul>';
		document.getElementById("relative").innerHTML = ul_btn;
	} else {
		vtitle = vlist[id]['title'];
		document.title = vtitle + website;
		document.getElementById("video_title").innerHTML = vtitle;
		vurl = '<script type="text/javascript">var videobox = document.getElementById("videobox");var w = videobox.offsetWidth;videobox.style.height = parseInt(w / 16 * 9.1) + "px";</script><iframe id="qplayer" frameborder="0" width="100%" height="100%" src="https://v.qq.com/iframe/player.html?vid=n0020yrnly7&tiny=1&auto=1" allowfullscreen></iframe>'.replace('n0020yrnly7', vid);
		document.getElementById("videobox").innerHTML = vurl;
		
		if (id == 0) {
			i = id;
			vRange = id + listrange_img;
		} else {
			i = id - 1;
			vRange = id - 1 + listrange_img;
		}
		if ((vlist.length - i) < listrange_img) {
			if ((vlist.length - listrange_img) < 0) {
				i = 0;
			} else {
				i = vlist.length - listrange_img;
			}
		}
		vids = [];
		for (i; i < vRange && i < vlist.length; i++) {
			var vtitle = vlist[i]['title'];
			var vid = vlist[i]['vid'];
			var item = '<li onclick = "play(vidstr,idstr);"><a><img src="http://puui.qpic.cn/qqvideo_ori/0/n0020yrnly7_496_280/0" alt="titlevar"><p>titlevar</p></a></li>'.replace(/titlevar/g, vtitle).replace(/n0020yrnly7_496_280/g, vid + '_496_280').replace(/vidstr/g, "'" + vid + "'").replace(/idstr/g, "'" + i + "'");
			if (i == id) {
				item = item.replace('<li', '<li class="active"');
			}
			vids.push(item);
		}
		ul_img = '<ul id="ul_img" class="ul_img">' + vids.join("") + '</ul>';
		document.getElementById("relative").innerHTML = ul_img;
	}
	_hmt.push(['_trackPageview', 'player.html?pv&vid=vidstr&cid=cidstr&channel=channelstr'.replace(/vidstr/g, vid).replace(/cidstr/g, cid).replace(/channelstr/g, channel)]);
}

var JSONP = document.createElement("script");
JSONP.type = "text/javascript";
JSONP.src = "files/json/chanstr/jsonpCallback.js".replace('chanstr', channel).replace('jsonpCallback', cid);
document.getElementsByTagName("head")[0].appendChild(JSONP);
document.getElementById("loading").innerHTML = '<div class="loading loaded"><p>正在加载数据...</p></div>';
timeout = setTimeout('document.getElementById("loading").innerHTML = timeoutstr', 10000);