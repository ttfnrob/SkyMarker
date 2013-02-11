// CUSTOM FUNCTIONS:
// UPDATE IMAGE SHOWN and circle highlights etc

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function dec2hex(i) {
   return (i+0x10000).toString(16).substr(-2).toUpperCase();
}

function updateImage() {
  image_url = "allsky/"+window.obs+"/"+window.num+".jpg";
  $("path").attr({opacity: 0.50});
  $("path."+window.num).attr({opacity: 1.0});
  var c = skymap.image(image_url, 0, 0, "100%", "100%");
}

// INCREMENT VALUE BY A NUMBER DELTA
function incrementValue(delta) {
  window.num = window.num + delta;
  
  if (window.num < window.minnum) {
    window.num = window.minnum;
  } else if (window.num > window.maxnum) {
    window.num = window.maxnum;
  }
  $("#slider").slider("option", "value", window.num );
  updateImage();
}

// PRELOAD IMAGES TO MAKE SLIDER SMOOTH
function preload() {
  for (var i = window.minnum; i <= window.maxnum; i++) {      
      $('<img/>')[0].src = "allsky/"+window.obs+"/"+i+".jpg";                                                                                
  }
}

function loadSlider() {
  $("#slider").slider({
    range: "min",
    value: 1,
    min: window.minnum,
    max: window.maxnum,
    slide: function( event, ui ) {

        window.num = ui.value;
        image_url = "allsky/"+window.obs+"/"+window.num+".jpg";
        $("path").attr({opacity: 0.50});
        $("path."+window.num).attr({opacity: 1.0});
        var c = skymap.image(image_url, 0, 0, "100%", "100%");
    }
});
}

function make_downloadable(){
 // Add some critical information
 $("svg").attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"});

 $("path").attr({opacity: 1.00});
 var svg = $("#paper").html();
 var b64 = Base64.encode(svg);

 $("#download").text(" Download Markings as SVG");
 $("#download").attr("href", "data:image/svg+xml;base64,\n"+b64);
 $("#download").attr("target", "_blank");

 $("path").attr({opacity: 0.50});
 $("path."+window.num).attr({opacity: 1.0});
}

// NEED SOME NUMBERS AND VALUES TO START
window.num = 1;
window.obs = "bootes"
window.minnum = 1;
window.maxnum = 26;
var cols = ["#C5FFD4", "#C5FFFD", "#FFCBC4", "#E3FFC4", "#AF47FF", "#FF47F3", "#FF5447", "#5447FF", "#FFAF47", "#4797FF", "#58CC00", "#F3FF47", "#47F3FF", "#97FF47", "#934A01"];

//INITIALISE SVG
var skymap = Raphael("skymap", "100%", "100%");
var sketchpad = Raphael("paper", "100%", "100%");

// INITIALISE
var start = function(){
    // storing original coordinates
    this.ox = this.attr("cx");
    this.oy = this.attr("cy");
    this.oo = this.attr("opacity");
    this.attr({opacity: 0.5});      
},
move = function (dx, dy) {
    // move will be called with dx and dy
    this.attr({cx: this.ox + dx, cy: this.oy + dy});
},
up = function () {
    this.attr({opacity: this.oo});        
};

var c = skymap.image("allsky/"+window.obs+"/1.jpg", 0, 0, "100%", "100%");

$("#info").click( function(){
  $("#about").toggle();
});

$("#about").click( function(){
  $("#about").toggle();
});

$("#forward1").click( function(){
  incrementValue(+1); 
});

$("#forward5").click( function(){
  incrementValue(+5); 
});

$("#back1").click( function(){
  incrementValue(-1); 
});

$("#back5").click( function(){
  incrementValue(-5); 
});

$("#observatory").change(function(){
  window.obs = this.value;
  window.num = 1;
  incrementValue(-1*window.num);
  $("path").remove();
  $("#download").text("").attr("href","#");

  if (this.value == "bootes") {
    window.maxnum = 26;
  } else {
    window.maxnum = 15;
  }

  loadSlider();
  preload();
}); 

var initX; 
var initY; 
var active;
var marker_count = 1;

var resize = function(e){ 
    if (active) {
      base = $('#paper').offset();
      x = e.clientX - base.left;
      y = e.clientY - base.top;
      newpath = "M"+initX+" "+initY+"L"+x+" "+y;
      active.attr({path: newpath}); 
    }
  }; 

$("#paper").mousedown(function(e){ 
  $("body").append('<div id="created-'+marker_count+'"></div>');

  base = $('#paper').offset();
  initX = e.clientX - base.left;
  initY = e.clientY - base.top;

  col = "#"
        +dec2hex(255*(window.num/window.maxnum))
        +dec2hex(255*(window.num/window.maxnum)*(window.num/window.maxnum))
        +dec2hex(255*(window.num/window.maxnum)*(window.num/window.maxnum)*(window.num/window.maxnum));

  newpath = "M"+initX+" "+initY+"L"+(initX+1)+" "+(initY+1);
  active = sketchpad.path(newpath).attr({ stroke: col });
  active.node.setAttribute('id', "#created-"+marker_count);
  active.node.setAttribute('class', window.num);
  active.drag(move, start, up);

  make_downloadable();

}); 

$("#paper").mousemove(function(e){ 
  resize(e)
}); 

$("#paper").mouseup(function(e){ 
  active = null;
  marker_count+=1;
}); 

loadSlider();
preload();
