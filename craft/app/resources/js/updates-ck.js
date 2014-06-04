/**
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */(function(e){Craft.UpdateInfo=Garnish.Base.extend({appUpdateInfo:null,$container:null,$downloadBtn:null,licenseHud:null,$licenseSubmitBtn:null,licenseSubmitAction:null,allowAutoUpdates:null,init:function(t){this.allowAutoUpdates=t;var n=e("#graphic"),r=e("#status");Craft.postActionRequest("update/getAvailableUpdates",e.proxy(function(t,i){if(i!="success"||t.error||t.errors){var s=Craft.t("An unknown error occurred.");t.errors&&t.errors.length?s=t.errors[0]:t.error&&(s=t.error);n.addClass("error");r.text(s)}else{var o={total:t.app&&t.app.releases&&t.app.releases.length?1:0,critical:t.app&&t.criticalUpdateAvailable};if(!o.total){n.addClass("success");r.text(Craft.t("You’re all up-to-date!"))}else{n.fadeOut("fast");r.fadeOut("fast",e.proxy(function(){n.remove();r.remove();this.appUpdateInfo=t.app;this.showAvailableUpdates()},this))}Craft.cp.displayUpdateInfo(o)}},this))},showAvailableUpdates:function(){this.$container=e("<div/>").appendTo(Craft.cp.$main).hide();var t=e('<div class="pane clearafter"/>').appendTo(this.$container),n=e('<h2 class="heading">'+Craft.t("You’ve got updates!")+"</h2>").appendTo(t),r=e('<div class="buttons"/>').appendTo(t);if(this.appUpdateInfo.manualUpdateRequired)this.$downloadBtn=e('<div class="btn submit">'+Craft.t("Download")+"</div>").appendTo(r);else if(this.allowAutoUpdates){var i=e('<div class="btngroup submit"/>').appendTo(r),s=e('<div class="btn submit">'+Craft.t("Update")+"</div>").appendTo(i),o=e('<div class="btn submit menubtn"/>').appendTo(i),u=e('<div class="menu" data-align="right"/>').appendTo(i),a=e("<ul/>").appendTo(u),f=e("<li/>").appendTo(a);this.$downloadBtn=e("<a>"+Craft.t("Download")+"</a>").appendTo(f);new Garnish.MenuBtn(o)}if(this.allowAutoUpdates)if(this.appUpdateInfo.licenseUpdated){this.addListener(this.$downloadBtn,"click","showLicenseForm");this.appUpdateInfo.manualUpdateRequired||this.addListener(s,"click","showLicenseForm")}else{this.addListener(this.$downloadBtn,"click","downloadThat");this.appUpdateInfo.manualUpdateRequired||this.addListener(s,"click","autoUpdateThat")}this.showReleases(this.appUpdateInfo.releases,"Craft");this.$container.fadeIn("fast")},showLicenseForm:function(t){t.stopPropagation();if(!this.licenseHud){var n=e("<form><p>"+Craft.t('Craft’s <a href="http://buildwithcraft.com/license" target="_blank">Terms and Conditions</a> have changed.')+"</p></form>"),r=e("<label> "+Craft.t("I agree.")+" &nbsp;</label>").appendTo(n),i=e('<input type="checkbox"/>').prependTo(r);this.$licenseSubmitBtn=e('<input class="btn submit" type="submit"/>').appendTo(n);this.licenseHud=new Garnish.HUD(t.currentTarget,n);this.addListener(n,"submit",function(e){e.preventDefault();if(i.prop("checked")){this.licenseSubmitAction();this.licenseHud.hide();i.prop("checked",!1)}else Garnish.shake(this.licenseHud.$hud)})}else{this.licenseHud.$trigger=e(t.currentTarget);this.licenseHud.show()}if(t.currentTarget==this.$downloadBtn[0]){this.$licenseSubmitBtn.attr("value",Craft.t("Seriously, download."));this.licenseSubmitAction=this.downloadThat}else{this.$licenseSubmitBtn.attr("value",Craft.t("Seriously, update."));this.licenseSubmitAction=this.autoUpdateThat}},showReleases:function(t,n){for(var r=0;r<t.length;r++){var i=e('<div class="pane"/>').appendTo(this.$container),s=t[r],o=n+" "+s.version;s.build&&(o+=' <span class="light">'+Craft.t("build {build}",{build:s.build})+"</span>");s.critical&&(o+=' <span class="critical">'+Craft.t("Critical")+"</span>");e("<h2>"+o+"</h2>").appendTo(i);e('<div class="notes"/>').appendTo(i).html(s.notes)}},downloadThat:function(){var t=this.appUpdateInfo.manualDownloadEndpoint;window.location.protocol=="https:"&&(t=t.replace("http:","https:"));e("<iframe/>",{src:t}).appendTo(Garnish.$bod).hide()},autoUpdateThat:function(){window.location.href=Craft.getUrl("updates/go/craft")}})})(jQuery);