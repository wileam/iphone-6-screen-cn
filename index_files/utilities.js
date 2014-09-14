jQuery(document).ready(function()
{    
    highlightAll();
    window._pq = window._pq || [];
});

/* disable scrolling */

var disableScroll = false;
var lockedScrollPosition = [0, 0];

function disableScrolling()
{
    disableScroll = true;
    lockedScrollPosition = getScrollXY();
}


function enableScrolling()
{
    disableScroll = false;
}

function keepScroll(e)
{
    if(disableScroll)
    {
        e.preventDefault();
        window.scrollTo(lockedScrollPosition[0], lockedScrollPosition[1]);
    }
}

document.ontouchmove = function(e)
{
    keepScroll(e);
}

document.onscroll = function(e)
{
    keepScroll(e);
}





/* various */


function getScrollXY()
{
    var scrOfX = 0, scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' )
    {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    }
    else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) )
    {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    }
    else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) )
    {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [ scrOfX, scrOfY ];
}


function scrollToBlock(fromY, toY, after)
{
//    disableScrolling();
    
    var maxY = fromY;
    var minY = toY - $(window).height();
    var currentY = getScrollXY()[1];
    
    if (currentY < minY || maxY < currentY)
    {
        var newY = Math.min(Math.max(minY,currentY), maxY); 
        $('html, body').animate({scrollTop: newY}, 300, "swing", after);
    }
    else
        after();
}



/* ajax */

function submit_email()
{
    _pq.push(['track', 'trial']);

    if (typeof t == 'undefined')
        dataDictionary = { "email": $("#email").val(), "t": "t"};
    else
        dataDictionary = { "email": $("#email").val(), "t": "t", "ab": t};

    
	$.ajax({
		type: "POST",
		url: "/saveemail.php",
		data: dataDictionary
	})
	.done(function(msg)
	{
		if (msg == "invalid")
		{
			$("div#try_popover p.email_error").show();
		}
		else
		{
			$("div#try_popover p.email_error").hide();
			var response_obj = JSON.parse(msg);
			$("iframe#automatic_download").attr("src", response_obj[0]);
			$("a.substituteHref").attr("href", response_obj[1]);
			
			$("#try_popover_page1").hide();
			$("#try_popover_page2").show();
			
		}
	});
}



function test(data, url)
{
    _pq.push(['track', data]);
     
    if (typeof t == 'undefined')
        dataDictionary = { "d": data};
    else
        dataDictionary = { "d": data, "t": t};
        
	$.ajax({
		type: "POST",
		url: "/open_test.php",
		data: dataDictionary,
	})
	.done(function(msg)
	{
	    if (url === undefined || url == "")
	        return;

        window.location.href = url;
	});
}