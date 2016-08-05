;(function($) {

	$.i18n = function(options) {

		var defaults = {
            dict: {},
			lang: "en",
			path: "/scripts/",
			tag: "i18n"
        }
		
        var plugin = this;

        plugin.settings = {}

        var init = function() {
			
			plugin.settings = $.extend({}, defaults, options);
			
			if(plugin.settings.lang != "en")
				load(plugin.settings.lang);
			else
				loadDefault();
        }

		plugin.refresh = function() {
			refresh();
		}
		
        plugin.load = function(lang) {
			load(lang);
		}

		function refresh(){
			$.each($("[data-"+plugin.settings.tag+"]"), function (index, value){
				var txt = plugin.settings.dict[plugin.settings.lang][$(this).data(plugin.settings.tag)];
				$(this).html(txt);
			});
		}
		
		function load(lang){
			if(plugin.settings.dict[lang] != null){
				console.log("Language has been loaded, changing now...");
				plugin.settings.lang = lang;
				refresh();
				return;
			}
			if(lang != "en"){
				$.getJSON(plugin.settings.path + "language."+ lang + ".json", function (data){
					saveDictionary(lang, data);
				}).error(function(){
					loadDefault();
				});
			}else{
				loadDefault();
			}
		}
		
		function loadDefault(){
			$.getJSON(plugin.settings.path + "language.json", function (data){
					saveDictionary("en", data);
			});
		}
		
		function saveDictionary(lang, data){
			if(plugin.settings.dict == null){
				plugin.settings.dict = {};
			}
			plugin.settings.dict[lang] = data;
			plugin.settings.lang = lang;
			
			refresh();
		}

        init();
	}
})(jQuery);