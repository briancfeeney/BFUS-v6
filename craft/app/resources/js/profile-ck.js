/**
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */(function(e){function r(t){if(typeof t.html!="undefined"){e(".user-photo").replaceWith(t.html);var n=e(".user-photo>.current-photo").css("background-image").replace(/^url\(/,"").replace(/\)$/,"");e("#account-menu").find("img").attr("src",n);i()}}function i(){n.uploadButton=e(".user-photo-controls .upload-photo");n.deleteButton=e(".user-photo-controls .delete-photo");t=new Craft.ImageUpload(n)}var t=null,n={postParameters:{userId:e(".user-photo").attr("data-user")},modalClass:"profile-image-modal",uploadAction:"users/uploadUserPhoto",deleteMessage:Craft.t("Are you sure you want to delete this photo?"),deleteAction:"users/deleteUserPhoto",cropAction:"users/cropUserPhoto",areaToolOptions:{aspectRatio:"1:1",initialRectangle:{mode:"auto"}},onImageSave:function(e){r(e)},onImageDelete:function(e){r(e)}};e("input[name=userId]").val()&&i()})(jQuery);