Spree.Views.Tables.SelectableHeader = Backbone.View.extend({
  initialize: function(options) {
    this.render();
  },

  render: function() {
    var selectedSelector = '.selectable';
    var table = this.model.get('table');
    var selectedItemLength = table.find(selectedSelector + ":checked").length;

    var html = HandlebarsTemplates['tables/selectable_label']({
      no_item_selected: selectedItemLength == 0,
      one_item_selected: selectedItemLength == 1,
      selected_item_count: selectedItemLength,
      all_items_selected: table.find('input[name="select-all"]:checked').length > 0
    });

    this.$el.html(html);
  }
});
