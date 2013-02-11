// load I18N bundles
jQuery(document).ready(function() {

	function loadBundles(lang) {
		jQuery.i18n.properties({
		    name:'Messages', 
		    path:'bundle/', 
		    mode:'both',
		    language:lang, 
		    callback: function() {
		        updateExamples();
		    }
		});
	}

	loadBundles('de');
				
	// configure language combo box
	jQuery('#lang').change(function() {
		var selection = jQuery('#lang option:selected').val();
		loadBundles(selection != 'browser' ? selection : null);
		jQuery('#langBrowser').empty();
		if(selection == 'browser') {
			jQuery('#langBrowser').text('('+jQuery.i18n.browserLang()+')');
		}
	});
	
});

function updateExamples() {
	// Accessing values through the map
	var ex1 = 'msg_hello';
	var ex2 = 'msg_complex'; var ex2P = 'John';
	var ex3 = 'msg_url'; var ex3P = 'solution_1';
	var ex4 = 'inexistent_key';
    var ex5 = 'msg_multi_placeholder'; var ex5P1 = 'beautiful'; var ex5P2 = 'fishing';
    var ex6 = 'msg_multi_placeholder_corrected'; var ex6P1 = 'beautiful'; var ex6P2 = 'fishing';
	jQuery('#mapExamples')
		.empty()
		.append('<li><code class="i18n">jQuery.i18n.prop(\''+ex1+'\')</code>  -->  '+jQuery.i18n.prop(ex1)+'</li>')
		.append('<li><code class="i18n">jQuery.i18n.prop(\''+ex2+'\',\''+ex2P+'\')</code>  -->  '+jQuery.i18n.prop(ex2, ex2P)+'</li>')
		.append('<li><code class="i18n">jQuery.i18n.prop(\''+ex3+'\',\''+ex3P+'\')</code>  -->  '+jQuery.i18n.prop(ex3, ex3P)+'</li>')
		.append('<li><code class="i18n">jQuery.i18n.prop(\''+ex4+'\')</code>  -->  '+jQuery.i18n.prop(ex4)+'</li>')
        .append('<li><code class="i18n">jQuery.i18n.prop(\''+ex5+'\',\''+ex5P1+'\',\''+ex5P2+'\')</code>  -->  '+jQuery.i18n.prop(ex5, ex5P1, ex5P2)+'</li>')
        .append('<li><code class="i18n">jQuery.i18n.prop(\''+ex6+'\',\''+ex6P1+'\',\''+ex6P2+'\')</code>  -->  '+jQuery.i18n.prop(ex6, ex6P1, ex6P2)+'</li>');
		

	// Accessing values through a JS variable
	var ex21 = 'msg_hello';
	var ex22 = 'msg_world';
	var ex23 = 'msg_complex'; var ex23P = 'John'; 
	var ex24 = 'inexistent_key';
	jQuery('#varExamples')
		.empty()
		.append('<li><code class="i18n">'+ex21+'</code>  -->  '+eval(ex21)+'</li>')
		.append('<li><code class="i18n">'+ex22+'</code>  -->  '+eval(ex22)+'</li>')
		.append('<li><code class="i18n">'+ex23+'(\''+ex23P+'\')</code>  -->  '+eval(ex23+'(\''+ex23P+'\')')+'</li>')
		.append('<li><code class="i18n">'+ex24+'</code>  -->  <small><i>(browser would report a missing JS symbol)</i></small></li>');
}