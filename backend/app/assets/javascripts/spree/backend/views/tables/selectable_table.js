Spree.Views.Tables.SelectableTable = {
  add: function($el) {
    var selectedSelector = '.selectable';
    var selectableTable = this;

    $el.find('input[name="select-all"]').on("click", function() {
      var checked = this.checked;
      $el.find(selectedSelector).each(function(_i, checkbox){
        checkbox.checked = checked;
      })

      selectableTable.header.render();
    });

    $el.find(selectedSelector).on("click", function(){
      if(!this.checked) {
        $el.find('input[name="select-all"]').prop('checked', false);
      }

      selectableTable.header.render();
    })

    this.initHeader($el);
  },

  initHeader: function(table) {
    var selectableSelector = '.selectable-header .selectable-label';

    var model = new Backbone.Model({
      table: table
    });
    this.header = new Spree.Views.Tables.SelectableHeader({
      el: table.find(selectableSelector),
      model: model,
    });
  },
};
