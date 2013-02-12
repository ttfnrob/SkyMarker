function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function dec2hex(i) {
   return (i+0x10000).toString(16).substr(-2).toUpperCase();
}

function updateImage() {
  image_url = "allsky/"+window.obs+"/"+window.num+".jpg";
  $("circle").attr({opacity: 0.25});
  $("circle."+window.num).attr({opacity: 1.0});
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
        $("circle").attr({opacity: 0.25});
        $("circle."+window.num).attr({opacity: 1.0});
        var c = skymap.image(image_url, 0, 0, "100%", "100%");
    }
});
}

function circles2JSON() {
	output = "id,x,y,day\n"
	$("circle").each(function( index ) {
		output+=index + "," + $(this).attr('cx') + "," + $(this).attr('cy') + "," + $(this).attr('class') + "\n";
	});
	return output
}

function make_downloadable(){
 // Add some critical information
 $("svg").attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"});

 $("circle").attr({opacity: 1.00});
 var svg = $("#paper").html();
 var b64 = Base64.encode(svg);

 $("#download").show();

 $("#download_svg").text("SVG");
 $("#download_svg").attr("href", "data:image/svg+xml;base64,\n"+b64);
 $("#download_svg").attr("target", "_blank");

 csv_data = circles2JSON();
 $("#download_csv").text("CSV");
 $("#download_csv").attr("href", "data:application/download,\n"+encodeURIComponent(csv_data));
 $("#download_csv").attr("target", "_blank");

 $("circle").attr({opacity: 0.25});
 $("circle."+window.num).attr({opacity: 1.0});
}

