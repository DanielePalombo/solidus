Spree.Views.Tables.SelectableTable.Summary = Backbone.View.extend({
  events: {
    'click input[name="select-all"]': 'onSelectedAll'
  },

  onSelectedAll: function(event) {
    this.model.set('allSelected', event.currentTarget.checked);
    if(event.currentTarget.checked == false) {
      this.model.set('selectedItems', []);
    }
  },

  initialize: function(options) {
    this.listenTo(this.model, 'change', this.render)

    this.colspan = options.columns - 1;

    this.render();
  },

  render: function() {
    var selectedItemLength = this.model.get('selectedItems').length;

    var html = HandlebarsTemplates['tables/selectable_label']({
      colspan: this.colspan,
      no_item_selected: selectedItemLength == 0,
      one_item_selected: selectedItemLength == 1,
      selected_item_count: selectedItemLength,
      all_items_selected: this.model.get('allSelected')
    });

    this.$el.html(html);
  }
});
