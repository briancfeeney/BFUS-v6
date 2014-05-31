/**
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */(function(e){Craft.QuickPostWidget=Garnish.Base.extend({params:null,initFields:null,$widget:null,$form:null,$formClone:null,$spinner:null,$errorList:null,loading:!1,init:function(t,n,r){this.params=n;this.initFields=r;this.$widget=e("#widget"+t);this.$form=this.$widget.find("form:first");this.$spinner=this.$form.find(".spinner");this.$formClone=this.$form.clone();this.initForm()},initForm:function(){this.addListener(this.$form,"submit","onSubmit");this.initFields()},onSubmit:function(t){t.preventDefault();if(this.loading)return;this.loading=!0;this.$spinner.removeClass("hidden");var n=Garnish.getPostData(this.$form),r=e.extend({enabled:1},n,this.params);Craft.postActionRequest("entries/saveEntry",r,e.proxy(function(t,n){this.loading=!1;this.$spinner.addClass("hidden");this.$errorList&&this.$errorList.children().remove();if(n=="success")if(t.success){Craft.cp.displayNotice(Craft.t("Entry saved."));var r=this.$formClone.clone();this.$form.replaceWith(r);this.$form=r;this.initForm();if(typeof Craft.RecentEntriesWidget!="undefined")for(var i=0;i<Craft.RecentEntriesWidget.instances.length;i++){var s=Craft.RecentEntriesWidget.instances[i];(!s.params.sectionId||s.params.sectionId==this.params.sectionId)&&s.addEntry({url:t.cpEditUrl,title:t.title,postDate:t.postDate,username:t.author.username})}}else{Craft.cp.displayError(Craft.t("Couldn’t save entry."));if(t.errors){this.$errorList||(this.$errorList=e('<ul class="errors"/>').insertAfter(this.$form));for(var o in t.errors)for(var i=0;i<t.errors[o].length;i++){var u=t.errors[o][i];e("<li>"+u+"</li>").appendTo(this.$errorList)}}}},this))}})})(jQuery);