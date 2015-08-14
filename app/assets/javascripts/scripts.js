$(document).ready(function() {

  $('#all-vendors').click(function(){
    $('.vendor-checkbox').prop('checked', true)
  });

  $('.search-all').click(function(){
    $('.vendor-checkbox').prop('checked', true)
  });

  $('.vendor-checkbox').click(function() {
    if ($(this).attr('checked') === "checked") {
      $(this).attr('checked', false)
    } else {
      $(this).attr('checked', true)
    }
    $('#all-vendors').attr('checked', false)
  });

  $('#search-button').click(function() {
    var search = $('#search-input').val()
    $('#searched-item').html(search + ' Results');
  });

  $('#search-input').click(function() {
    $('#search-input').attr('placeholder', "");
  });

  $('.dropdown-menu').click(function(e) {
    e.stopPropagation();
  });

  $('.dropdown.keep-open').on({
    "shown.bs.dropdown": function() { this.closable = false; },
    "click":             function() { this.closable = true; },
    "hide.bs.dropdown":  function() { return this.closable; }
});


});
