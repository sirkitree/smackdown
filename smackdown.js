
/**
 * Smackdown voting through AJAX
 *
 * Provide a means to vote on our nodereference fields and redirect to a new
 * smackdown node. Javascript techniques accredited to starbow's popups.js.
 */
(function ($) {
  /**
   * Create the smackdown object/namespace.
   */
  Drupal.smackdown = function() {};

  /**
   * Attach the smackdown behavior to nodereferences on the page.
   *
   * @param context
   *   The jQuery object to apply the behaviors to.
   */
  Drupal.behaviors.smackdown = {
    attach: function(context, settings) {
      if (typeof Drupal.settings.smackdown !== 'undefined') {
        var field_1 = 'field field-name-' + Drupal.settings.smackdown.field1.name.replace(/_/g, '-');
        var field_2 = 'field field-name-' + Drupal.settings.smackdown.field2.name.replace(/_/g, '-');
        if (Drupal.settings.smackdownPerm == 1) {
          Drupal.smackdown.attachVote(context, field_1 + ' field-type-node-reference', Drupal.settings.smackdown.field1.nid);
          Drupal.smackdown.attachVote(context, field_2 + ' field-type-node-reference', Drupal.settings.smackdown.field2.nid);
        }
        else {
          Drupal.smackdown.attachNotice(context, field_1 + ' field-type-node-reference');
          Drupal.smackdown.attachNotice(context, field_2 + ' field-type-node-reference');
        }
      }
  };

  /**
   * Attach the smackdown behavior to a particular link.
   *
   * @param context
   * @param selector
   * @param nid
   *   jQuery selector for links to attach behavior to.
   */
  Drupal.smackdown.attachVote = function(context, selector) {
    // a regex for selecting the correct selector
    $('div[class^="'+selector+'"]').each(function() {
        var $element = $(this).find('.field-items').children();
	$element.attr('rel', nid).addClass('smackdown-processed');
	$element.click(function(e) {
	  Drupal.theme('voting', $element);
	  var nid = $element.attr('rel'); //not compatible with clean URLs
	  var sid = Druapl.settings.smackdown.sid;
	  var parms = {'cid':nid, 'sid':sid};
	  ajaxOptions = {
	    url: Drupal.settings.basePath + '?q=smackdown/vote/' + Drupal.settings.smackdown.token,
	    dataType: 'json',
	    data: params,
	    success: function(json) {
	      //we put the location into a variable so that it can be changes by other modules.
	      if(json != null){
	      	location.href = json.location;
	      }
	    }		
	  };
	 $.ajax(ajaxOptions);
	 return false;
	}); 
     });
  };

  Drupal.smackdown.attachNotice = function(context, selector) {
    $(selector, context).each(function() {
      var $element = $(this);
      $element.click(function(e) {
        Drupal.theme('notice', $element);
        return false;
      });
    });
  };

  Drupal.theme.prototype.voting = function(element) {
    var output = "<div id='voting-indicator'>" + Drupal.t('Voting...') + "</div>";
    element.parent().css({'background-color':'#ffc'});
    return element.parent().append(output);
  };

  Drupal.theme.prototype.notice = function(element) {
    var output = "<div id='voting-indicator'>" + Drupal.t('You do not have sufficient rights to vote.') + "</div>";
    element.parent().css({'background-color':'#ffc'});
    return element.parent().append(output);
  };
})(jQuery);
