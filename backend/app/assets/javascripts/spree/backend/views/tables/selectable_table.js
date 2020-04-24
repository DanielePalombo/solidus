Spree.Views.Tables.SelectableTable = Backbone.View.extend({
  events: {
    'change .selectable': 'onSelectedItem',
  },

  initialize: function() {
    var tr = this.$el.find('thead').prepend('tr');
    new Spree.Views.Tables.SelectableTable.Summary({ el: tr, model: this.model , columns: this.maxColumns()});

    this.listenTo(this.model, 'change', this.render)
    this.render();
  },

  onSelectedItem: function(event) {
    var item = event.currentTarget;
    if(item.checked) {
      this.addItem(item)
    }else{
      this.$el.find('input[name="select-all"]').prop('checked', false);
      this.removeItem(item)
    }
  },

  addItem: function(item) {
    var items = _(this.model.get('selectedItems')).clone();
    if(items.indexOf(item) === -1) {
      items.push(item);
      this.model.set('selectedItems', items);
    }
  },

  removeItem: function(item) {
    var items = _(this.model.get('selectedItems')).clone();
    items.splice(items.indexOf(item), 1);
    this.model.set('selectedItems', items);
    this.model.set('allSelected', false);
  },

  maxColumns: function() {
    var max = 0;
    this.$el.find('tr').each(function(){
      var inTr = 0;
      $('td,th', this).each(function() { inTr += parseInt($(this).attr('colspan')) || 1;});
      max = Math.max(max,inTr);
    });

    return max;
  },

  render: function(){
    var model = this.model;
    this.$el.find('.selectable').each(function(_i, checkbox){
      checkbox.checked = model.get('allSelected') || model.get('selectedItems').includes(checkbox);
    })
  }
});
