/**
 * Variables
 */
var currentImage_ = null;

/**
 * Functions
 */
function onNewImage(image) {
  $("#picture").css("background", "url("+image+")");
}

var onStateChange = function(adds, removes, state, metadata) {
  onNewImage(state["image"]);
};

function publishNewImage(image) {
  var data = {};
  data["image"] = image;
  gapi.hangout.data.submitDelta(data);
}

gapi.hangout.addApiReadyListener(function(){
  gapi.hangout.data.addStateChangeListener(onStateChange);
  onNewImage(getState()["image"]);
});

$(document).ready(function(){
  $("#url").keypress(function(event) {
    if ( event.which == 13 ) {
       event.preventDefault();
       var newImageUrl = $(this).attr("value");
       publishNewImage(newImageUrl)
       $(this).attr("value", "");
     }
  });
});