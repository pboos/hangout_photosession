/**
 * Variables
 */
var currentImage_ = null;

/**
 * Functions
 */
function onNewImage(image) {
  $("#picture").attr("src", image);
}

var onStateChange = function(key, value, timestamp, timediff) {
  if (key == "image") {
  	onNewImage(value);
  }
};
gapi.hangout.data.addStateChangeListener(onStateChange);

function publishNewImage(image) {
  var data = {};
  data["image"] = image;
  gapi.hangout.data.submitDelta(data);
}

$(document).ready(function(){
  $("#url").keypress(function(event) {
    if ( event.which == 13 ) {
       event.preventDefault();
       onNewImage($(this).attr("value"));
       $(this).attr("value", "");
     }
  });
});