
window.addEventListener("load", init, false);

function init() {
	chrome.storage.sync.get({ onlyCheck:false, onlySites:'https://www.youtube.com/*\nhttps://twitter.com/*' }, function (items) {
	
		if( !items.onlyCheck ){
			setMarkerStyle()
    		return;
		}
	
		var arr = items.onlySites.split(/\r\n|\n/);
		if( items.onlySites == '' ){
			arr = ['https://www.youtube.com/*','https://twitter.com/*'];
		}
		
		for (var i = 0; i < arr.length; i++){
    		if( matchRuleShort(location.href,arr[i]) ){
				setMarkerStyle()
    			return;
    		}
		}
		
	});
}
function setMarkerStyle(){
	const style = document.createElement('style');
	chrome.storage.sync.get({	height:60,
								colorRGBA:'#ffff0066',
								where:'font[style="vertical-align: inherit;"]'
								}, function (items) {
	style.innerHTML = `${items.where}{background:linear-gradient(transparent ${items.height}%, ${items.colorRGBA} ${items.height}%);}`;
		document.body.appendChild(style);
	});
}

//Wildcard comparison
function matchRuleShort(str, rule) {
  var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
}