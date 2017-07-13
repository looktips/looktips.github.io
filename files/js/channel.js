var chan = '',
	cid = '',
	page = 0,
	pagenum = 24,
	vlist = '',
	chantitle = '',
	website = ' - 7buu.com';
var timeout;
var timeoutstr = '<div class="loading" onclick="location.reload();"><p>连接超时，点击重新加载...</p></div>'

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = decodeURI(window.location.search.substr(1)).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
};

function jsonpChannel(result) {
	var chanlist = result['channel'];
	if (chanlist !== null) {
		if (GetQueryString("cid") !== null) {
			cid = GetQueryString("cid");
			document.title = chantitle.replace(chantitle, chantitle + " - " + GetQueryString("ctitle")) + website;
			document.getElementById("p_header").innerHTML = GetQueryString("ctitle");

		} else {
			document.title = chantitle.replace(chantitle, chantitle + " - " + chanlist[0]['title'] + website);
			document.getElementById("p_header").innerHTML = chanlist[0]['title'];
			cid = chanlist[0]['cid'];
		};
		console.info('chanlist:' + chanlist.length);
		clist = [];
		for (var i in chanlist) {
			var ctitle = chanlist[i]['title'];
			var cids = chanlist[i]['cid'];
			if (cids !== cid) {
				if (chanlist[i]['box']) {
					var box = chanlist[i]['box'];
					var item = '<a class="chan_btn" href="channel.html?channel=chanstr&cid=cidstr&ctitle=titlestr&listbox=ul_btn">titlestr</a>'.replace('chanstr', chan).replace('cidstr', cids).replace(/titlestr/g, ctitle).replace(/ul_btn/g, chanlist[i]['box']);
				} else {
					var item = '<a class="chan_btn" href="channel.html?channel=chanstr&cid=cidstr&ctitle=titlestr">titlestr</a>'.replace('chanstr', chan).replace('cidstr', cids).replace(/titlestr/g, ctitle);
				}
			} else {
				var item = '<a class="chan_btn active" href="channel.html?channel=chanstr&cid=cidstr&ctitle=titlestr">titlestr</a>'.replace('chanstr', chan).replace('cidstr', cids).replace(/titlestr/g, ctitle);
			}
			clist.push(item);
		};
		document.getElementById("channel_nav").innerHTML = clist.join("");
		loading();
	}
}

function channel(channel) {
	var JSONP = document.createElement("script");
	JSONP.type = "text/javascript";
	JSONP.src = "files/json/channel.js".replace('channel', channel);
	document.getElementsByTagName("head")[0].appendChild(JSONP);
	document.getElementById("loading").innerHTML = '<div class="loading loaded"><p>正在加载数据...</p></div>';
	timeout = setTimeout('document.getElementById("loading").innerHTML = timeoutstr', 10000)
};

var chan = GetQueryString("channel");

if (chan !== null) {
	if (chan == 'kid') {
		chantitle = '启蒙';
		document.title = chantitle;
		document.querySelectorAll('a.nav_btn')[1].setAttribute("class", "nav_btn active");
		channel('kid');
	}
	if (chan == 'cartoon') {
		chantitle = '动画';
		document.title = chantitle;
		document.querySelectorAll('a.nav_btn')[2].setAttribute("class", "nav_btn active");
		channel('cartoon');
	}
	if (chan == 'parents') {
		chantitle = '育儿';
		document.title = chantitle;
		document.querySelectorAll('a.nav_btn')[3].setAttribute("class", "nav_btn active");
		var stylep = document.createElement("style");
		stylep.type = "text/css";
		stylep.innerHTML = ".ul_img li{width: 92%;}@media screen and (min-width: 768px) {.ul_img li {width: 47%;border: medium double #f4f4f4;border-radius: 7px;padding:0;margin: 5px;}.ul_img img {border: 1px dashed #b1b1b1;}}";
		document.getElementsByTagName("head")[0].appendChild(stylep);
		channel('parents');
	}
}

function jsonpChan(result) {
	clearTimeout(timeout);
	vlist = result;
	getpage();
};

function loading() {
	var JSONP = document.createElement("script");
	JSONP.type = "text/javascript";
	JSONP.src = "files/json/chan/cid.js".replace('chan', chan).replace('cid', cid);
	document.getElementsByTagName("head")[0].appendChild(JSONP);
};

function getpage() {
	if (vlist !== null) {
		console.info(vlist.length);
		if (GetQueryString("listbox") == 'ul_btn') {
			vids = [];
			for (var i = 0; i < vlist.length; i++) {
				var vtitle = vlist[i]['title'];
				var vid = vlist[i]['vid'];
				var item = "<li><a href='player.html?vid=n0020yrnly7&id=idstr_&title=titlevar&channel=chanstr&cid=cidstr&listbox=ul_btn'><span>titlevar</span></a></li>".replace(/titlevar/g, vtitle).replace(/idstr_/g, i).replace(/n0020yrnly7/g, vid).replace(/chanstr/g, chan).replace(/cidstr/g, cid);
				vids.push(item)
			}
			var ul_btn = document.createElement('ul');
			ul_btn.id = 'ul_btn';
			ul_btn.innerHTML = vids.join("");
			ul_btn.setAttribute("class", "ul_btn");
			document.getElementById("listmain").appendChild(ul_btn);
			document.getElementById("loading").innerHTML = '<div class="loading loaded" onclick="javascript:scrollTo( 0, 0 );"><p>回到顶部</p></div>';
		} else {
			vids = [];
			for (var i = page * pagenum; i < (page + 1) * pagenum && i < vlist.length; i++) {
				var vtitle = vlist[i]['title'];
				var vid = vlist[i]['vid'];
				var item = "<li><a href='player.html?vid=n0020yrnly7&id=idstr_&title=titlevar&channel=chanstr&cid=cidstr'><img src='http://puui.qpic.cn/qqvideo_ori/0/n0020yrnly7_496_280/0' alt='titlevar'><p>titlevar</p></a></li>".replace(/n0020yrnly7_496_280/g, vid + '_496_280').replace(/titlevar/g, vtitle).replace(/idstr_/g, i).replace(/n0020yrnly7/g, vid).replace(/chanstr/g, chan).replace(/cidstr/g, cid);
				vids.push(item);
			}
			var ul_img = document.createElement('ul');
			ul_img.id = 'ul_img';
			ul_img.setAttribute("class", "ul_img");
			ul_img.innerHTML = vids.join("");
			document.getElementById("listmain").appendChild(ul_img);
			page += 1;
			if (vlist.length > page * pagenum) {
				document.getElementById("loading").innerHTML = '<div class="loading" onclick="getpage()"><p>点击加载更多...</p></div>'.replace('cid', cid);
			} else {
				document.getElementById("loading").innerHTML = '<div class="loading loaded" onclick="javascript:scrollTo( 0, 0 );"><p>回到顶部</p></div>';
			}
		}
	}
	_hmt.push(['_trackPageview', 'channel.html?uv&cid=cidstr&channel=channelstr&page=pagestr'.replace(/cidstr/g, GetQueryString("cid")).replace(/channelstr/g, GetQueryString("channel")).replace(/pagestr/g, page)]);
}