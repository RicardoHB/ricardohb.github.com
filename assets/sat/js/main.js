$(document).ready(init);
$(window).resize(resize);

var acdata = [ // Autocompletar
		"Adriana",
		"Alessandra",
		"Behati",
		"Candice",
		"Doutzen",
		"Erin",
		"Gisele",
		"Laetitia",
		"Lily",
		"Lindsay",
		"Marisa",
		"Miranda",
		];

var modulos = [[],['Módulo D.F. 1','Módulo D.F. 2','Módulo D.F. 3'], // Módulos
				['Módulo COAH 1','Módulo COAH 2','Módulo COAH 3'],
				['Módulo SON 1','Módulo SON 2','Módulo SON 3']];

var URLAdvancedSearch = ''; // Url de la página de búsqueda avanzada


function init()
{
	setupCollapsible();
	
	setupScrollButtons();
	
	setupTabClicks();
	
	setupSubmenu();
	
	langHandler();
	
	$('#top_search, #mob_search_input').autocomplete({source:acdata,open:function(event,ui)
		{
            $(".ui-autocomplete").prepend('<li class="ui-menu-item advanced_search_autoc green" onclick="window.location=\'' + URLAdvancedSearch + '\';">Búsqueda Avanzada ></li>');
        }});
	
	$('#dd_menu').selectmenu({change:mobileMenu});
	
	$('#ur_estado').selectmenu({change:sb_mod_esHandler,placeholder:'Estado'});
	$('#ur_modulo').selectmenu({placeholder:'Módulo'});
	
	$('#mob_menu_select').selectmenu({change:mobileMenu});
	
	sidebarmt();
	
	cgallerySetup();
	
	$('#footer .links span').click(footerLinksMobile);
}

function resize()
{
	sidebarmt();
	
	mobileMenuFix();
}

function sidebarmt()
{
	$('#content #main').css('min-height',($('#sidebar').height() - $('#header').height()) + 'px');
}

function mobileMenu(e,d)
{
	window.location = d.item.value;
}

function mobileMenuFix()
{
	$('#mob_menu_select').selectmenu("destroy").selectmenu();
}

String.prototype.splice = function(idx,rem,s)
{
    return (this.slice(0,idx) + s + this.slice(idx + Math.abs(rem)));
};

function setupCollapsible()
{
	$('.collapsible .c').each(function(i,e)
	{
		if($(this).hasClass('collapsed'))
		{
			$(this).hide();
			$(this).siblings('h4').removeClass('ctmn').addClass('ctpl');
		}
		else
		{
			$(this).siblings('h4').removeClass('ctpl').addClass('ctmn');
		}
	});
	
	$('.collapsible h4').click(collapsibleHandler);
}

function collapsibleHandler(e)
{
	var c = $(this).siblings('.c');
	
	if($(c).is(':visible'))
	{
		$(c).slideUp();
		$(this).removeClass('ctmn').addClass('ctpl');
	}
	else
	{
		$(c).slideDown();
		$(this).removeClass('ctpl').addClass('ctmn');
	}
	
}

function setupScrollButtons()
{
	$('.ab_scroll').click(scrollHandler);
}

function scrollHandler(e)
{
	//var s = $('#action_bar .pw, #home_action_bar .pw');
	var s = $(this).siblings('.pw');
	
	var n = $(this).is('#ab_sl') ? (s).scrollLeft() - 30:(s).scrollLeft() + 30;
	
	$(s).scrollLeft(n);
}

function setupTabClicks()
{
	$('.tab_button').click(function()
	{
		$('.tab_button').removeClass('active');
		
		$(this).addClass('active');
		
		$('.tab').hide();
		
		var activeTab = $(this).attr('data-tab');
		
		$(activeTab).show();
	});
	
	$('.tab_button').first().click();
}

function setupSubmenu()
{
	$('#menu li').mouseover(function()
	{
		$('#submenu ul, #submenu').hide();
		
		$('#menu li').removeClass('menu_active_tmp');
		
		if(!!$(this).attr('data-submenu'))
		{
			var e = '#' + $(this).attr('data-submenu');
			
			$('#submenu, ' + e).show();
			
			$(this).addClass('menu_active_tmp');
		}
	});
	
	$('#submenu').mouseleave(function()
	{
		$('#submenu ul, #submenu').hide();
		
		$('#menu li').removeClass('menu_active_tmp');
	});
}

function langHandler()
{
	$('#lang .trigger').mouseover(function()
	{
		$('#lang ul').slideDown();
	});
	
	$('#lang').mouseleave(function()
	{
		$('#lang ul').slideUp();
	});
}

function sb_mod_esHandler(e,d)
{
	$('#ur_modulo').selectmenu('disable'); 
	$('#ur_modulo').html('');
	modulos[d.item.value].forEach(function(e){$('#ur_modulo').append($("<option></option>").attr("value",e).text(e));});
	$('#ur_modulo').selectmenu('destroy').selectmenu();
	$('#ur_modulo').selectmenu('enable'); 
}

$.widget( 'app.selectmenu', $.ui.selectmenu,{
    _drawButton: function()
    {
        this._super();
        
        var selected = this.element
                .find( '[selected]' )
                .length,
            placeholder = this.options.placeholder;
        
        if ( !selected && placeholder ) {
            this.buttonText.text( placeholder );    
        }
    }
});

// Pagination

function setPagination()
{
	var phtml = '<ul><li onclick="setPage(\'prev\')">&larr;</li>';
	
	$('.page').hide().each(function(i,e)
	{
		var page  = i + 1;
		
		phtml += '<li onclick="setPage(' + page + ');">' + page + '</li>';
	});
	
	phtml += '<li onclick="setPage(\'next\')">&rarr;</li></ul>';
	
	$('.pagination').append(phtml);
}

function setPage(n)
{
	// Set page div
	
	if(n == 'next'){n = currentPage() + 1;}
	if(n == 'prev'){n = currentPage() - 1;}
	
	if($('#page-' + n).length > 0)
	{
		$('.page').hide();
		
		$('#page-' + n).show();
		
		// Set pagination div
		
		$('.pagination ul li').removeClass('pagination_active').each(function(i,e)
		{
			if($(e).text() == n){$(e).addClass('pagination_active');}
		});
	}
}

function currentPage()
{
	var result = 0;
	
	$('.pagination ul li').each(function(i,e)
	{
		if($(e).hasClass('pagination_active')){result = parseInt($(e).text());}
	});
	
	return result;
}


function cgallerySetup()
{
	$('.c_gallery .scroll').click(cgalleryScrollHandler);
	
	$('.thumbs_container img').click(cgalleryHandler);
}

function cgalleryScrollHandler(e)
{
	var s = $('.c_gallery .thumbs');
	
	var n = $(this).is('.slide_left') ? (s).scrollLeft() - 50:(s).scrollLeft() + 50;
	
	$(s).scrollLeft(n);
}

function cgalleryHandler(e)
{
	$('.c_gallery_main').attr('src',$(this).attr('rel'));
	$('.c_gallery_description').html($(this).attr('title'));
}

function setModal(o)
{
	$('#modal').hide();
	
	$('#modal .title').html(o.title);
	
	$('#modal .modal_data').html(o.data);
	
	$('#modal .modal_action').html(o.action_label).click(typeof(o.action) != 'undefined' ? o.action:null);
	
	$('#modal .modal_cancel').click(typeof(o.cancel) != 'undefined' ? o.cancel:null);
	
	$('#modal .bottom_note').html(o.bottom_note);
	
	$('#modal').fadeIn();
	
	if(typeof(o.callback) != 'undefined'){o.callback();}
}

function unsetModal()
{
	$('#modal').fadeOut();
}

function footerLinksMobile(e)
{
	var element = $(this);
	
	if(!$(element).children('p').is(':visible'))
	{
		$('#footer .links p').slideUp();
		
		$('#footer .links p').promise().done(function()
		{
			$(element).children('p').finish().slideDown();
		});
	}
	else
	{
		$(element).children('p').slideUp();
	}
}