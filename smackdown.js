// $Id$

/**
 * Smackdown voting through AJAX
 *
 * Provide a means to vote on our nodereference fields and redirect to a new
 * smackdown node. Javascript techniques accredited to starbow's popups.js.
 */

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
Drupal.behaviors.smackdown = function(context) {
  if (Drupal.settings.smackdownPerm == 1) {
    Drupal.smackdown.attachVote(context, '.field-field-ref1 .field-item a');
    Drupal.smackdown.attachVote(context, '.field-field-ref2 .field-item a');
  }
  else {
    Drupal.smackdown.attachNotice(context, '.field-field-ref1 .field-item a');
    Drupal.smackdown.attachNotice(context, '.field-field-ref2 .field-item a');
  }
};

/**
 * Attach the smackdown behavior to a particular link.
 *
 * @param selector
 *   jQuery selector for links to attach behavior to.
 */
Drupal.smackdown.attachVote = function(context, selector) {
  $(selector, context).each(function() {
    var $element = $(this);
    // Mark the element as attached.
    $element.addClass('smackdown-processed');
    // Attach the on-click popup behavior to the element.
    $element.click(function(e){
      Drupal.theme.prototype.voting($element);
      var nid = this.href.split('/').reverse()[0];
      var params = {'cid':nid, 'sid':sid};
      // post nid and context to smackdown/vote
      ajaxOptions = {
        url: Drupal.settings.basePath + 'smackdown/vote',
        dataType: 'json',
        data: params,
        success: function(json) {
          location.href = Drupal.settings.basePath + 'node/' + sid + '/voting-results';
        }
      };
      $.ajax(ajaxOptions);
      return false;
    });
  });
};

Drupal.theme.prototype.voting = function(element) {
  var output = "<div id='voting-indicator'>Voting...</div>";
  element.parent().css({'background-color':'#ffc'});
  return element.parent().append(output);
};

Drupal.smackdown.attachNotice = function(context, selector) {
  $(selector, context).each(function() {
    var $element = $(this);
    $element.click(function(e) {
      Drupal.theme.prototype.notice($element);
      return false;
    });
  });
}

Drupal.theme.prototype.notice = function(element) {
  var output = "<div id='voting-indicator'>You do not have sufficient rights to vote.</div>";
  element.parent().css({'background-color':'#ffc'});
  return element.parent().append(output);
}