/**
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */Craft.FeedWidget=Garnish.Base.extend({$widget:null,init:function(e,t,n){this.$widget=$("#widget"+e);this.$widget.addClass("loading");var r={url:t,limit:n};Craft.postActionRequest("dashboard/getFeedItems",r,$.proxy(function(e,t){this.$widget.removeClass("loading");if(t=="success"){var n=this.$widget.find("td");for(var r=0;r<e.items.length;r++){var i=e.items[r],s=$(n[r]),o='<a href="'+i.permalink+'" target="_blank">'+i.title+"</a> ";i.date&&(o+='<span class="light nowrap">'+i.date+"</span>");s.html(o)}}},this))}});