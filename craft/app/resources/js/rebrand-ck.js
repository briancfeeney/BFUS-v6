/**
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2014, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */(function(e){function r(t){if(typeof t.html!="undefined"){e(".cp-logo").replaceWith(t.html);i()}}function i(){n.uploadButton=e(".logo-controls .upload-logo");n.deleteButton=e(".logo-controls .delete-logo");t=new Craft.ImageUpload(n)}var t=null,n={modalClass:"logo-modal",uploadAction:"rebrand/uploadLogo",deleteMessage:Craft.t("Are you sure you want to delete the logo?"),deleteAction:"rebrand/deleteLogo",cropAction:"rebrand/cropLogo",areaToolOptions:{aspectRatio:"",initialRectangle:{mode:"auto"}},onImageSave:function(e){r(e)},onImageDelete:function(e){r(e)}};i()})(jQuery);