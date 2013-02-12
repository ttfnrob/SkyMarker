function load_lang(t) {
    for (var k in t) {
        if (t.hasOwnProperty(k)) {
            // console.log('key is: ' + k + ', value is: ' + t[k]);
            $("[data-i18n='"+k+"']").text(t[k]);
        }
    }
}

$(document).ready(function(){
    if (getURLParameter("lang")){
        $.getScript("locales/"+getURLParameter("lang")+".js", function() {
            load_lang(window.t);
        });
    }
});