function close(popover)
{
    if (jQuery(popover).hasClass("open"))
    {
        jQuery(popover).removeClass("open");
    }
}


function closeAllPopovers()
{
    $( ".popover" ).each(function()
    {
        close($(this));
    });
    
    hideOverlay();
}


function showOverlay()
{
    jQuery("div#overlay").css("z-index", "95");
    setTimeout(function()
    {
        jQuery("div#overlay").css("opacity", "1");
    }, 0);
}


function hideOverlay()
{
    enableScrolling();
    jQuery("div#overlay").css("opacity", "0");

    setTimeout(function()
    {
        jQuery("div#overlay").css("z-index", "-5");
    }, 200);
}


jQuery(document).ready(function()
{
    jQuery("a#try_button_news").click(function(e)
    {
        test('tn');
        e.preventDefault();

        jQuery("div#try_popover").detach().appendTo("div#news_try_section");

        setTimeout(function()
        { 
            jQuery("div#try_popover").addClass("open");
            close("div#buy_popover");

            $("div#try_popover").css("z-index", 101);
            
            var minY = $("a#try_button_news").offset().top - parseInt($("div#try_popover").css("height"), 10) - 60;
            var maxY = $("a#try_button_news").offset().top + $("a#try_button_news").height() + 10;
            scrollToBlock(minY, maxY, function() {disableScrolling();});

            showOverlay();
        }, 50);
    });

    jQuery("a#buy_button_news").click(function(e)
    {
        test('bn');
        e.preventDefault();

        jQuery("div#buy_popover").detach().appendTo("div#news_buy_section");

        setTimeout(function()
        { 
            jQuery("div#buy_popover").addClass("open");
            //close("div#try_popover");

            $("div#buy_popover").css("z-index", 101);
            
            var minY = $("a#buy_button_news").offset().top - parseInt($("div#buy_popover").css("height"), 10) - 60;
            var maxY = $("a#buy_button_news").offset().top + $("a#buy_button_news").height() + 10;
            scrollToBlock(minY, maxY, function() {disableScrolling();});

            showOverlay();
        }, 50);
    });


    jQuery("a#buy_button_top").click(function(e)
    {
        test('bt');
        e.preventDefault();

        jQuery("div#buy_popover").detach().appendTo("div#top_buttons");

        setTimeout(function()
        { 
            jQuery("div#buy_popover").addClass("open");
            close("div#try_popover");

            $("div#buy_popover").css("z-index", 101);
            
            var minY = $("a#buy_button_top").offset().top - parseInt($("div#buy_popover").css("height"), 10) - 10;
            var maxY = $("a#buy_button_top").offset().top + $("a#buy_button_top").height() + 10;
            scrollToBlock(minY, maxY, function() {disableScrolling();});

            showOverlay();
        }, 50);
    });

    jQuery("a#try_button_top").click(function(e)
    {
        if ($(this).attr("href") != "#")
            return;
        
        test('tt');
        e.preventDefault();
        
        jQuery("div#try_popover").detach().appendTo("div#top_buttons");
        
        setTimeout(function()
        { 
            jQuery("div#try_popover").addClass("open");
            close("div#buy_popover");

            $("div#try_popover").css("z-index", 101);
            
            var minY = $("a#buy_button_top").offset().top - parseInt($("div#try_popover").css("height"), 10) - 10;
            var maxY = $("a#buy_button_top").offset().top + $("a#buy_button_top").height() + 10;
            scrollToBlock(minY, maxY, function() {disableScrolling();});

            showOverlay();
        }, 50);
    });
    
    
    jQuery("a#buy_button_bottom").click(function(e)
    {
        test('bb');
        e.preventDefault();
        
        jQuery("div#buy_popover").detach().appendTo("div#bottom_buttons");
        
        setTimeout(function()
        { 
            jQuery("div#buy_popover").addClass("open");
            close("div#try_popover");
            
            $("div#buy_popover").css("z-index", 101);
            
            var minY = $("a#buy_button_bottom").offset().top - parseInt($("div#buy_popover").css("height"), 10) - 10;
            var maxY = $("a#buy_button_bottom").offset().top + $("a#buy_button_bottom").height() + 10;
            scrollToBlock(minY, maxY, function() {disableScrolling();});

            showOverlay();
        }, 50);
    });
    

    jQuery("a#try_button_bottom").click(function(e)
    {
        if ($(this).attr("href") != "#")
            return;
        
        test('tb');
        e.preventDefault();

        jQuery("div#try_popover").detach().appendTo("div#bottom_buttons");
        setTimeout(function()
        { 
            close("div#buy_popover");
            jQuery("div#try_popover").addClass("open");

            $("div#try_popover").css("z-index", 101);
            
            var minY = $("a#buy_button_bottom").offset().top - parseInt($("div#try_popover").css("height"), 10) - 10;
            var maxY = $("a#buy_button_bottom").offset().top + $("a#buy_button_bottom").height() + 10;
            scrollToBlock(minY, maxY, function() {disableScrolling();});

            showOverlay();
        }, 50);
    });
    
    jQuery("a#buy_from_us").click(function(e)
    {
        e.preventDefault();
        test('fs', $(e.target).attr('href'));
    });

    jQuery("a#buy_from_appstore").click(function(e)
    {
        e.preventDefault();
        test('as', $(e.target).attr('href'));
    });

    
    $( "*" ).keydown(function( event )
    {
        if ( event.which == 27 ) {
            closeAllPopovers();
        }
    });

    jQuery(".close_button, div#overlay").click(function(e)
    {
        $( "a.button" ).css("z-index", 0);
        $( "div.popover" ).css("z-index", 0);
        
        closeAllPopovers();
    });
});
