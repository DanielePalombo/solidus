Spree.ready(function() {
  $('table.selectable-table').each(function() {
    var selectableTableModel = new Backbone.Model({
      allSelected: false,
      selectedItems: []
    })

    new Spree.Views.Tables.SelectableTable({el: this, model: selectableTableModel});
    // new Spree.Views.Tables.SelectableTable.Summary({el: $(this).find('.selectable-table-summary'), model: selectableTableModel});

    //if(this.returnItem?)
    //  new Spre..SelectableTableItemAmountSum({el: $(this).find('#total_pre_tax_refund'), model: model});
    //}
  })
});
