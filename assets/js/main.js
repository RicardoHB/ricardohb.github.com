$(document).ready(init);

$(window).resize(layout).bind('load',layout);

function init()
{
	$('.filter').click(filter);
	
	$('.logo').click(logo);
	
	$('.wdown').click(wdown);
}

function layout()
{
	contentWidth();
}

function contentWidth()
{
	$('#content .main').width($('#content .pw').width() - $('#content .sidebar').outerWidth() - 42);
}

function filter(e)
{
	//

	/*
	if(!$(this).hasClass('active'))
	{
		$(this).addClass('active').append('<div class="defilter">x</div>');
	}
	else
	{
		$(this).removeClass('active').children('.defilter').remove();
	}
	*/

	// 23 mayo 2016 - La funcion ya no es de filtro, se cambia por la de scroll de #content->#main.

	$('html, body').animate({scrollTop:$($(this).attr('data-e-class')).position().top - 50},500);
}

function logo()
{
	window.location = 'http://ricardohb.com';
}

function wdown(e)
{
	e.preventDefault();
	
	alert('La campaña ha concluido y/o el sitio web ha sido cerrado por el propietario.\n\n' + $(e.target).attr('href'));
}