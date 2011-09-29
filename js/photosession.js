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

var onStateChange = function(adds, removes, state, metadata) {
  alert("state now " + state);
  onNewImage(state["image"]);
};

function publishNewImage(image) {
  var data = {};
  data["image"] = image;
  gapi.hangout.data.submitDelta(data);
}

gapi.hangout.addApiReadyListener(function(){
  gapi.hangout.data.addStateChangeListener(onStateChange);
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