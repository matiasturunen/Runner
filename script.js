$(document).ready(() => {

  $('#noteform').on('submit', evt => {
    evt.preventDefault();
    
    // save field value and clear input field
    const inp = $('#note-inp').val();
    $('#note-inp').val('')
    
    // create new note
    $.ajax('submitform.php', {
      method: 'POST',
      data: {
        note: inp,
        ajax: true
      },
      success: res => {
        $('#memo').html(res);
      }
    });
  });

  $('#memo').on('click', '.note', function() { // Arrow functions don't go well with `this`
    $.ajax('deletenote.php', {
      method: 'POST',
      data: {
        delete_memo: $(this).data('id')
      }
    });
  	$(this).fadeOut(400, () => $(this).remove());
  });

  $('#memo').on('mouseenter', '.note', function() {
    $(this).addClass('active');
  });

  $('#memo').on('mouseleave', '.note', function() {
    $(this).removeClass('active');
  });
});
