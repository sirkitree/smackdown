if (Drupal.jsEnabled) {
  $(document).ready(function () {
    ref_init_val = $("#edit-smackdown-autocomplete").val();
    tax_vals = new Array();
    $("#edit-node-ref-type").bind('change', update_taxonomy_autocomplete);
    $("#edit-node-ref-type").each(update_taxonomy_autocomplete);

    function update_taxonomy_autocomplete() {
      $.getJSON("/smackdown/taxonomy/js/" + this.value, attach_taxonomy_autocomplete);
    };

    function attach_taxonomy_autocomplete(json) {
      $("#smackdown-taxonomy-filter").html(json);
      $("#smackdown-taxonomy-filter .form-autocomplete").parent().remove();
      $("#smackdown-taxonomy-filter .autocomplete").remove();

      $("#smackdown-taxonomy-filter select").bind('change', function() {
        if ($(this).attr('size') > 1) {
		  tax_vals.push($(this).val());
		}
		else {
		  tax_vals = new Array($(this).val());
		}
        // http://drupal.org/node/154323
        // calculate_tax_val();

        change_auto_val(tax_vals);
      });
      change_auto_val(null);
	};

    function change_auto_val(tax_vals){
      if (tax_vals == null) {
        new_ref_val = ref_init_val + '/' + $("#edit-node-ref-type").val();
      }
      else {
        new_ref_val = ref_init_val + '/' + $("#edit-node-ref-type").val() + '/' + tax_vals;
      }
      $("#edit-node-ref-1-autocomplete").val(new_ref_val);
      $("#edit-node-ref-2-autocomplete").val(new_ref_val);
      $(".form-autocomplete").unbind("keyup").unbind("keydown").unbind("blur");
      Drupal.autocompleteAutoAttach();
    };
  });
};