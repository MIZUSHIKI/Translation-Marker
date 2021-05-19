function Save() {
  var height = document.getElementById('input_height').value;
  var color  = document.getElementById('input_color').value;
  var where  = document.getElementById('input_where').value;
  var onlyCheck = document.getElementById('onlyCheck').checked;
  var onlySites  = document.getElementById('input_onlySites').value;

  chrome.storage.sync.set({	'height': height,
  							'color': color,
  							'where': where,
  							'onlyCheck' : onlyCheck,
  							'onlySites' : onlySites
  							});
}

function Load() {
  chrome.storage.sync.get({	height:60,
  							color:'#ffff60',
  							where:'font[style="vertical-align: inherit;"]',
  							onlyCheck : false,
  							onlySites : 'https://www.youtube.com/*\nhttps://twitter.com/*'
  							}, function (items) {
    document.getElementById('input_height').value = items.height;
    document.getElementById('input_color').value = items.color;
    document.getElementById('marker_color_label').textContent = items.color;
    document.getElementById('input_where').value = items.where;
    document.getElementById('onlyCheck').checked = items.onlyCheck;
    document.getElementById('input_onlySites').value = items.onlySites;
  	visible_onlySites( items.onlyCheck );
  });
}

function Default() {
  chrome.storage.sync.set({	'height': 60,
  							'color': '#ffff60',
  							'where':'font[style="vertical-align: inherit;"]',
  							'onlyCheck' : false
  							 }, function () {
    Load()
  });
}

function DOMed() {
  //addEventListener
  document.getElementById('input_color').addEventListener('change', function(){
    document.getElementById('marker_color_label').textContent = this.value;
  });
  document.getElementById('onlyCheck').addEventListener('click', function(){
  	visible_onlySites( this.checked );
  });
  document.getElementById('save_button').addEventListener('click', Save);
  document.getElementById('default_button').addEventListener('click', Default);
  Location();
  Load();
}
function visible_onlySites( visible ){
	if( visible ){
	  document.getElementById('input_onlySites').style.display = "block";
	}
	else {
	  document.getElementById('input_onlySites').style.display = "none";
	}
}
function Location(){
    document.getElementById('h2_option').textContent = chrome.i18n.getMessage("options")+' - Translation Marker';
    document.getElementById('label_markerWidth').textContent = chrome.i18n.getMessage("markerWidth");
    document.getElementById('label_markerColor').textContent = chrome.i18n.getMessage("markerColor");
    document.getElementById('summary_advancedSettings').textContent = chrome.i18n.getMessage("advancedSettings");
    document.getElementById('label_onlySites').textContent = chrome.i18n.getMessage("onlySites");
    document.getElementById('label_translatedLocation').textContent = chrome.i18n.getMessage("translatedLocation");
    document.getElementById('save_button').textContent = chrome.i18n.getMessage("save");
    document.getElementById('default_button').textContent = chrome.i18n.getMessage("default");
}

document.addEventListener('DOMContentLoaded', DOMed);
