/*
 * Script for dynamic featured image plugin
 * 
 * Copyright (c) 2013, Ankit Pokhrel <ankitpokhrel@gmail.com, http://ankitpokhrel.com.np>
 */
jQuery(document).ready(function($){
	var current = null;
	
	/*
	 * Add new meta box
	 */
	$(document).on('click', '.dfiAddNew', function(){	   
		var id = parseInt( $('.featured-meta-box:last').find('.dfiAddNew').attr('data-id') );     
                
        var newMetaBox = $(this).closest('.featured-meta-box').clone();     
        newMetaBox.find('.hndle span').html('Featured Image ' + ++id);
        newMetaBox.find('.handlediv').addClass('dfiDynamicBox');
        newMetaBox.find('.dfiAddNew').attr('data-id', id);
        newMetaBox.find('input').val('');
        newMetaBox.attr('id', 'dfiFeaturedMetaBox' + "-" + id);
        newMetaBox.find('img').attr('src', '');
        newMetaBox.appendTo($(this).closest('.featured-meta-box').parent());    
	});
	
	/*
	 * Remove featured image meta box
	 */
	$(document).on('click', '.dfiRemove', function(){
	   if( confirm('Are you sure?') )
		  $(this).closest('.featured-meta-box').remove();
	});
	
	/*
	 * Select featured image from media library
	 */
	$(document).on('click', '.dfiFeaturedImage', function() {		
		current = $(this);
		tb_show('', 'media-upload.php?type=image&amp;TB_iframe=true');
		return false;
	});
	 
	window.send_to_editor = function(html){
		var fullSize = $('img', html).parent().attr('href');		
		var imgurl = $('img', html).attr('src');
		
		imgUrlTrimmed = imgurl.split('wp-content');
		imgUrlTrimmed = '/wp-content' + imgUrlTrimmed[1];
		
		fullUrlTrimmed = fullSize.split('wp-content');
		fullUrlTrimmed = '/wp-content' + fullUrlTrimmed[1];
		
		var featuredBox = current.parent();
		
		featuredBox.find('.fImg').attr({
			'src': imgurl,
			'data-src': fullSize
		});
			
		var dfiFeaturedImages = [imgUrlTrimmed, fullUrlTrimmed];
			
		featuredBox.find('img').attr('src', imgurl).fadeIn(200);
		featuredBox.find('input').val(dfiFeaturedImages);
		tb_remove();
	}
	
	/*
	 * Enable toggle of dynamically generated featured box
	 */
	$(document).on('click', '.dfiDynamicBox', function(){
	    $(this).parent().toggleClass('closed');
	});
});