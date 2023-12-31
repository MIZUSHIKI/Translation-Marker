function Save() {
  var height = PerInv(document.getElementById('input_height').value);
  var color  = '#ffff60';
  var colorRGBA = rgbaToHex(document.getElementById('input_color').value);
  var where  = document.getElementById('input_where').value;
  var onlyCheck = document.getElementById('onlyCheck').checked;
  var onlySites  = document.getElementById('input_onlySites').value;

  chrome.storage.sync.set({	'height': height,
  							'color': color,
  							'colorRGBA': colorRGBA,
  							'where': where,
  							'onlyCheck' : onlyCheck,
  							'onlySites' : onlySites
  							});
}

function Load() {
  chrome.storage.sync.get({	height:60,
  							color:'#ffff60',
                colorRGBA:'',
  							where:'font[style="vertical-align: inherit;"]',
  							onlyCheck : false,
  							onlySites : 'https://www.youtube.com/*\nhttps://twitter.com/*'
  							}, function (items) {
    if(items.colorRGBA == ''){
      if(items.color == '#ffff60'){
        items.colorRGBA = '#ffff0066';
      }else {
        items.colorRGBA = items.color + 'ff';
      }
    }
    document.getElementById('input_height').value = PerInv(items.height);
    $('#input_color').minicolors();
    $('#input_color').minicolors('value',hexToRgba(items.colorRGBA));
    //document.getElementById('input_color').value = hexToRgba(items.colorRGBA);
    document.getElementById('input_where').value = items.where;
    document.getElementById('onlyCheck').checked = items.onlyCheck;
    document.getElementById('input_onlySites').value = items.onlySites;
  	visible_onlySites( items.onlyCheck );
  });
}

function Default() {
  chrome.storage.sync.set({	'height': 60,
  							'color': '#ffff60',
  							'colorRGBA': '#ffff0066',
  							'where':'font[style="vertical-align: inherit;"]',
  							'onlyCheck' : false
  							 }, function () {
    Load()
  });
}

function DOMed() {
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
function PerInv(value){
	if(value<0){
		return 100;
	}
	if(value>100){
		return 0;
	}
	return (100 - value);
}

function rgbaToHex(rgbaText) {
  let rgba = rgbaText.match(/\d+(\.\d+)?/g);
  rgba[3] = `${parseInt(parseFloat(rgba[3]) * 255)}`;
  let hex = rgba.map(x => {
    x = Math.floor(x);
    x = x.toString(16);
    x = x.padStart(2, '0');
    return x;
  });
  let hexText = '#' + hex.join('');
  return hexText;
}
function hexToRgba(hexText) {
  let hex = hexText.match(/[0-9a-fA-F]{2}/g);
  let rgba = hex.map(x => {
    x = parseInt(x, 16);
    return x;
  });
  rgba[3] = (Math.round(rgba[3] / 255 * 100) / 100);
  let rgbaText = 'rgba(' + rgba.join(', ') + ')';
  return rgbaText;
}

document.addEventListener('DOMContentLoaded', DOMed);


$(document).ready(function () {

  $('.demo').each(function () {
    //
    // Dear reader, it's actually very easy to initialize MiniColors. For example:
    //
    //  $(selector).minicolors();
    //
    // The way I've done it below is just for the demo, so don't get confused
    // by it. Also, data- attributes aren't supported at this time. Again,
    // they're only used for the purposes of this demo.
    //
    $(this).minicolors({
      control: $(this).attr('data-control') || 'hue',
      defaultValue: $(this).attr('data-defaultValue') || '',
      format: $(this).attr('data-format') || 'hex',
      keywords: $(this).attr('data-keywords') || '',
      inline: $(this).attr('data-inline') === 'true',
      letterCase: $(this).attr('data-letterCase') || 'lowercase',
      opacity: $(this).attr('data-opacity'),
      position: $(this).attr('data-position') || 'bottom',
      swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
      change: function (hex, opacity) {
        var log;
        try {
          log = hex ? hex : 'transparent';
          if (opacity) log += ', ' + opacity;
          console.log(log);
        } catch (e) { }
      },
      theme: 'default'
    });

  });

});