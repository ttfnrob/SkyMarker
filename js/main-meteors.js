// NEED SOME NUMBERS AND VALUES TO START
window.num = 1;
window.obs = "bootes"
window.minnum = 1;
window.maxnum = 26;
window.marker_count = 1;
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
  $("#download").hide().attr("href","#");

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
  base = $('#paper').offset();
  initX = e.clientX - base.left;
  initY = e.clientY - base.top;

  col = "#"
        +dec2hex(255*(window.num/window.maxnum))
        +dec2hex(255*(window.num/window.maxnum)*(window.num/window.maxnum))
        +dec2hex(255*(window.num/window.maxnum)*(window.num/window.maxnum)*(window.num/window.maxnum));

  newpath = "M"+initX+" "+initY+"L"+(initX+1)+" "+(initY+1);
  active = sketchpad.path(newpath).attr({ stroke: col });
  active.node.setAttribute('id', "created-"+marker_count);
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

$("#undo").click( function() {
  undo();
});

$("#download").hide();
loadSlider();
preload();
