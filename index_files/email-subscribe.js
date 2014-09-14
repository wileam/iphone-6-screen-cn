jQuery(document).ready(function()
{
    $('.mc-subscribe :submit').click(function(event) {
        $.post('/subscribe.php', {
            email: $('#subscriber_email').val()
        }, function(response) {
            resp = $.parseJSON(response);
            if(resp.result == 1) {
                $('#subscriber_email').val('Thank you for subscribing!').attr('disabled', true);
                $('#frm-subscribeForm :submit').fadeOut(400);
            } else {
                $('#subscriber_email').val('Please try again later!');
            }
        })
        return false;
    });
    
    
    $('.mc-subscribe').submit(function(event) {
        $.post('/subscribe.php', {
            email: $('#mce-EMAIL').val()
        }, function(response) {
            resp = $.parseJSON(response);
            if(resp.result == 1) {
                $('#subscriber_email').val('Thank you for subscribing!').attr('disabled', true);
                $('#frm-subscribeForm :submit').fadeOut(400);
            } else {
                $('#subscriber_email').val('Please try again later!');
            }
        })
        return false;
    })
    
});