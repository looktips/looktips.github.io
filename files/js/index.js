var timeout;
var timeoutstr = '<div class="loading" onclick="location.reload();"><p>连接超时，点击重新加载...</p></div>';


function jsonpIndex(result) {
	clearTimeout(timeout);
	document.getElementById("loading").innerHTML = '<div class="loading loaded" onclick="javascript:scrollTo( 0, 0 );"><p>回到顶部</p></div>';
	var chanlist = result;
	chans = [];
	for (var i in chanlist) {
		console.info([i]);
		var cid = chanlist[i]['cid'];
		var ctitle = chanlist[i]['ctitle'];
		var channel = chanlist[i]['channel'];
		var id = i;
		var vids = [];
		for (var i in chanlist[id]['vlist']) {
			var vid = chanlist[id]['vlist'][i]['vid'];
			var title = chanlist[id]['vlist'][i]['title'];
			var item = '<li><a href="player.html?vid=vidstr&id=idstr_&title=titlestr&channel=chanstr&cid=cidstr"><img src="http://puui.qpic.cn/qqvideo_ori/0/n0020yrnly7_496_280/0" alt="titlestr"><p>titlestr</p></a></li>'.replace(/n0020yrnly7_496_280/g,vid+'_496_280').replace(/titlestr/g,title).replace(/idstr_/g,i).replace(/vidstr/g,vid).replace(/cidstr/g,cid).replace(/chanstr/g,channel);
			vids.push(item);
		}
		var ctem = '<div class="listbox"><div class="listbox_header"><p class="p_header">ctitlestr</p><a href="channel.html?channel=chanstr&cid=cidstr&ctitle=ctitlestr"><p class="p_more">查看更多 ></p></a></div><ul class="ul_img">listr</ul></div>'.replace(/ctitlestr/g,ctitle).replace(/chanstr/g,channel).replace(/cidstr/g,cid).replace(/listr/g,vids.join(""));
		chans.push(ctem);
	}
	document.getElementById("listbox").innerHTML=chans.join("");
	
}

function index() {
	var JSONP = document.createElement("script");
	JSONP.type = "text/javascript";
	JSONP.src = "files/json/index.js";
	document.getElementsByTagName("head")[0].appendChild(JSONP);
	document.getElementById("loading").innerHTML = '<div class="loading loaded"><p>正在加载数据...</p></div>';
	timeout = setTimeout('document.getElementById("loading").innerHTML = timeoutstr', 10000);
};

index()