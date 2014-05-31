/**
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */(function(e){Craft.EntryTypeSwitcher=Garnish.Base.extend({$form:null,$typeSelect:null,$spinner:null,$fields:null,init:function(){this.$form=e("#entry-form");this.$typeSelect=e("#entryType");this.$spinner=e('<div class="spinner hidden" style="position: absolute; margin-'+Craft.left+': 2px;"/>').insertAfter(this.$typeSelect.parent());this.$fields=e("#fields");this.addListener(this.$typeSelect,"change","onTypeChange")},onTypeChange:function(t){this.$spinner.removeClass("hidden");Craft.postActionRequest("entries/switchEntryType",this.$form.serialize(),e.proxy(function(t,n){this.$spinner.addClass("hidden");if(n=="success"){var r=this.$fields.data("pane");r.deselectTab();this.$fields.html(t.paneHtml);r.destroy();this.$fields.pane();Craft.initUiElements(this.$fields);var i="";t.headHtml&&(i+=t.headHtml);t.footHtml&&(i+=t.footHtml);i&&e(i).appendTo(Garnish.$bod);typeof slugGenerator!="undefined"&&slugGenerator.setNewSource("#title");Garnish.$win.trigger("resize")}},this))}})})(jQuery);