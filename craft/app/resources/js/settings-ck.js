/**
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */(function(e){Craft.Tool=Garnish.Base.extend({$trigger:null,$form:null,$innerProgressBar:null,$innerProgressBar:null,toolClass:null,optionsHtml:null,buttonLabel:null,hud:null,totalActions:null,completedActions:null,loadingActions:null,queue:null,init:function(t,n,r){this.toolClass=t;this.optionsHtml=n;this.buttonLabel=r;this.$trigger=e("#tool-"+t);this.addListener(this.$trigger,"click","showHUD")},showHUD:function(t){t.stopPropagation();if(!this.hud){this.$form=e("<form/>").html(this.optionsHtml+'<div class="buttons">'+'<input type="submit" class="btn submit" value="'+this.buttonLabel+'">'+"</div>");this.hud=new Garnish.HUD(this.$trigger,this.$form,{hudClass:"hud toolhud"});Craft.initUiElements(this.$form);this.addListener(this.$form,"submit","onSubmit")}else this.hud.show()},onSubmit:function(t){t.preventDefault();this.progressBar?this.progressBar.resetProgressBar():this.progressBar=new Craft.ProgressBar(this.hud.$body);this.totalActions=1;this.completedActions=0;this.queue=[];this.loadingActions=0;this.currentBatchQueue=[];this.progressBar.$progressBar.css({top:Math.round(this.hud.$body.outerHeight()/2)-6}).removeClass("hidden");this.$form.stop().animateLeft(-200,"fast");this.progressBar.$progressBar.stop().animateLeft(30,"fast",e.proxy(function(){var e=Garnish.getPostData(this.$form),t=Craft.expandPostArray(e);t.start=!0;this.loadAction({params:t})},this))},updateProgressBar:function(){var e=100*this.completedActions/this.totalActions;this.progressBar.setProgressPercentage(e)},loadAction:function(e){this.loadingActions++;typeof e.confirm!="undefined"&&e.confirm?this.showConfirmDialog(e):this.postActionRequest(e.params)},showConfirmDialog:function(t){var n=e('<form class="modal fitted confirmmodal"/>').appendTo(Garnish.$bod),r=e('<div class="body"/>').appendTo(n).html(t.confirm),i=e('<footer class="footer"/>').appendTo(n),s=e('<div class="buttons right"/>').appendTo(i),o=e('<div class="btn">'+Craft.t("Cancel")+"</div>").appendTo(s),u=e('<input type="submit" class="btn submit" value="'+Craft.t("OK")+'"/>').appendTo(s);Craft.initUiElements(r);var a=new Garnish.Modal(n,{onHide:e.proxy(this,"onActionResponse")});this.addListener(o,"click",function(){a.hide()});this.addListener(n,"submit",function(n){n.preventDefault();a.settings.onHide=e.noop;a.hide();var i=Garnish.getPostData(r),s=Craft.expandPostArray(i);e.extend(s,t.params);this.postActionRequest(s)})},postActionRequest:function(t){var n={tool:this.toolClass,params:t};Craft.postActionRequest("tools/performAction",n,e.proxy(this,"onActionResponse"),{complete:e.noop})},onActionResponse:function(t,n){this.loadingActions--;this.completedActions++;if(n=="success"&&t&&t.batches)for(var r=0;r<t.batches.length;r++)if(t.batches[r].length){this.totalActions+=t.batches[r].length;this.queue.push(t.batches[r])}t&&t.error&&alert(t.error);this.updateProgressBar();while(this.loadingActions<Craft.Tool.maxConcurrentActions&&this.currentBatchQueue.length)this.loadNextAction();if(!this.loadingActions)if(this.queue.length){this.currentBatchQueue=this.queue.shift();this.loadNextAction()}else{if(t&&t.backupFile){var i=e("<iframe/>",{src:Craft.getActionUrl("tools/downloadBackupFile",{fileName:t.backupFile})}).hide();this.$form.append(i)}setTimeout(e.proxy(this,"onComplete"),300)}},loadNextAction:function(){var e=this.currentBatchQueue.shift();this.loadAction(e)},onComplete:function(){this.$allDone||(this.$allDone=e('<div class="alldone" data-icon="done" />').appendTo(this.hud.$body));this.$allDone.css({top:Math.round(this.hud.$body.outerHeight()/2)-30});this.progressBar.$progressBar.animateLeft(-170,"fast");this.$allDone.animateLeft(30,"fast");Craft.cp.runPendingTasks()}},{maxConcurrentActions:3})})(jQuery);