var availableTags = [];

$( function() {
  $.ajax({
    type: 'POST',
    url: '../ajax/listapaises.php',
    success: function(result) {
      availableTags = result.split('/');

      $("#input-pais").autocomplete({
        source: availableTags,
        delay: 0,
        autoFocus: true,
      });
    }
  });

} );
