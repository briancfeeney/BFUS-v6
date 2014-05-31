/**
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */(function(e){Craft.RecentEntriesWidget=Garnish.Base.extend({params:null,$widget:null,$body:null,$container:null,$tbody:null,hasEntries:null,init:function(t,n){this.params=n;this.$widget=e("#widget"+t);this.$body=this.$widget.find(".body:first");this.$container=this.$widget.find(".recententries-container:first");this.$tbody=this.$container.find("tbody:first");this.hasEntries=!!this.$tbody.length;Craft.RecentEntriesWidget.instances.push(this)},addEntry:function(t){this.$container.css("margin-top",0);var n=this.$container.height();if(!this.hasEntries){var r=e('<table class="data fullwidth"/>').prependTo(this.$container);this.$tbody=e("<tbody/>").appendTo(r)}this.$tbody.prepend('<tr><td><a href="'+t.url+'">'+t.title+"</a> "+'<span class="light">'+t.postDate+(Craft.edition>=Craft.Client?" "+Craft.t("by {author}",{author:t.username}):"")+"</span>"+"</td>"+"</tr>");var i=this.$container.height(),s=i-n;this.$container.css("margin-top",-s);var o={"margin-top":0};if(!this.hasEntries){o["margin-bottom"]=-n;this.hasEntries=!0}this.$container.animate(o)}},{instances:[]})})(jQuery);