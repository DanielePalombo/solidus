Spree.ready(function() {
  $('table.selectable-table').each(function() {
    Spree.Views.Tables.SelectableTable.add($(this));
  })
});
