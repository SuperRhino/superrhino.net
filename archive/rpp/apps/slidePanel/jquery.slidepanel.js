//
// create closure
//
(function($) {
  //
  // plugin definition
  //
  $.fn.slidePanel = function(options) {
	  debug(this);
	  // build main options before element iteration
	  var opts = $.extend({}, $.fn.slidePanel.defaults, options);
	  // iterate and reformat each matched element
	  return this.each(function() {
		  $this = $(this);
		  // build element specific options
		  var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
		  var paddingHeight = parseInt( o.padding.replace('px','').split(" ").shift() ) * 2;
		  if(o.height.indexOf('%')<0){
			  o.slideHeight = o.height+'px';
			  o.height = (parseInt(o.height)+paddingHeight)+'px';
		  }
		  $this.addClass('sp-container');
		  // update element styles
		  $this.css({
			  width: (parseInt(o.width)+parseInt(o.tabWidth))+'px',
			  height: o.height
		  });
		  
		  $coverSlide = $this.children("div").eq(0);
		  $coverSlide.addClass('sp-coverslide');
		  $coverSlide.css({
			  padding: o.padding,
			  backgroundColor: o.coverSlideBackgroundColor,
			  border: o.border,
			  width: o.width+'px',
			  height: o.slideHeight,
			  zIndex: o.zIndexMax-1
		  });
		  //calculate extra width added from padding/border
		  var xW = parseInt( $coverSlide.outerWidth() ) - o.width;
		  $this.children("div").each(function(){
			  var index = $this.children("div").index(this);
			  if(index>0){
				  $panel = $(this);
				  $panel.addClass('sp-slide');
				  if(index==o.openIndex){
					  $panel.css({
						  padding: o.padding,
						  backgroundColor: o.backgroundColor,
						  border: o.border,
						  right: '-'+(parseInt(o.slideWidth)+parseInt(xW))+'px',
						  width: (parseInt(o.slideWidth)-parseInt(xW))+'px',
						  height: o.slideHeight,
						  zIndex: o.zIndexMax-(index+1)
					  });
					  var pL = parseInt( $panel.css("padding-left").replace('px','') );
					  $panel.css("padding-left",(pL+parseInt(o.tabWidth))+"px").addClass('sp-openSlide');
				  }
				  else{
					  $panel.css({
						  padding: o.padding,
						  backgroundColor: o.backgroundColor,
						  border: o.border,
						  right: (o.tabWidth-xW)+'px',
						  width: (parseInt(o.slideWidth)-parseInt(xW))+'px',
						  height: o.slideHeight,
						  zIndex: o.zIndexMax-(index+1)
					  });
					  var pL = parseInt( $panel.css("padding-left").replace('px','') );
					  $panel.css("padding-left",(pL+parseInt(o.tabWidth))+"px")
				  }
			  }
		  });
		  
		  $this.children("h3").each(function(){
			  $h3 = $(this);
			  $h3parent = $h3.parent();
			  if($h3parent.hasClass('sp-container')){
				  var index = $h3parent.children("h3").index(this);
				  $h3.addClass('sp-tabcontrol');
				  if((index+1)==parseInt(o.openIndex)){
					  $h3.css({
						  right: '-'+(parseInt(o.slideWidth)+parseInt(o.tabWidth)+parseInt(xW))+'px',
						  width: o.tabWidth+'px',
						  top: ((o.tabHeight*index)+index)+'px',
						  zIndex: o.zIndexMax
					  });
				  }
				  else{
					  $h3.css({
						  right: '-'+xW+'px',
						  width: o.tabWidth+'px',
						  top: ((o.tabHeight*index)+index)+'px',
						  zIndex: o.zIndexMax
					  });
				  }
				  $h3.children("a").click(function(e){
					  e.preventDefault();
					  var $toOpenTabControl = $(this).parent();
					  var $thisSlidePanel = $toOpenTabControl.parent(".sp-container");
					  var $toOpenSlide = $toOpenTabControl.next(".sp-slide");
					  if(!$toOpenSlide.hasClass("sp-openSlide")){
						  var $toClosePanel = $thisSlidePanel.children('.sp-openSlide');
						  var $toCloseTab = $toClosePanel.prev(".sp-tabcontrol");
						  //slide the open tab back to closed position
						  $toCloseTab.stop().animate({right:'-'+xW+'px'}, 250);
						  //slide the open panel back to closed position
						  $toClosePanel.stop().animate({right:o.tabWidth+'px'}, 250).removeClass('sp-openSlide');
						  //slide the clicked tab to open position
						  $toOpenTabControl.stop().animate({right:'-='+(parseInt(o.slideWidth)+parseInt(o.tabWidth))}, 500);
						  //slide the clicked tab's panel to open position
						  $toOpenSlide.stop().animate({right: '-'+(parseInt(o.slideWidth)+parseInt(xW))+'px'}, 500).addClass('sp-openSlide');
					  }
					  else{
						  if(o.closeable){
							  $thisSlidePanel.children(".sp-tabcontrol").stop().animate({right:'-'+xW+'px'}, 250);
							  $thisSlidePanel.children(".sp-slide").stop().animate({right:o.tabWidth+'px'}, 250).removeClass('sp-openSlide'); 
						  }
					  }
				  });
			  }
		  });
		  
	  });
  };
  //
  // private function for debugging
  //
  function debug($obj) {
	  if (window.console && window.console.log)
		  window.console.log('slidePanel selection count: ' + $obj.size());
  };
  //
  // define and expose our format function
  //
  $.fn.slidePanel.format = function(txt) {
	  return '<strong>' + txt + '</strong>';
  };
  //
  // plugin defaults
  //
  $.fn.slidePanel.defaults = {
		  width: '200',
		  height: '200',
		  slideWidth: '200',
		  tabHeight: '15',
		  tabWidth: '30',
		  openIndex: '0',
		  backgroundColor:'#ffffff',
		  coverSlideBackgroundColor:'#ffffff',
		  border:'0px none',
		  padding:'0px',
		  closeable:false,
		  zIndexMax: '100'
  };
//
// end of closure
//
})(jQuery);