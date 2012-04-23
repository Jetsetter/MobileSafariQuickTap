function QuickTap(el) {
	this.element = typeof el == 'object' ? el : document.getElementById(el);
	if( window.Touch ) this.element.addEventListener('touchstart', this, false);
}

QuickTap.prototype = {
	handleEvent: function(e) {
		switch(e.type) {
			case 'touchstart': this.onTouchStart(e); break;
			case 'touchmove': this.onTouchMove(e); break;
			case 'touchend': this.onTouchEnd(e); break;
		}
	},

	onTouchStart: function(e) {
		this.start = {

	      // get touch coordinates for delta calculations in onTouchMove
	      pageX: e.touches[0].pageX,
	      pageY: e.touches[0].pageY,

	      // set initial timestamp of touch sequence
	      time: Number( new Date() )

	    };

	    // used for testing first onTouchMove event
	    this.isScrolling = undefined;
	    
	    // reset deltaX
	    this.deltaX = 0;

		this.element.addEventListener('touchmove', this, false);
		this.element.addEventListener('touchend', this, false);
	},

	onTouchMove: function(e) {
		// ensure swiping with one touch and not pinching
	    if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

	    this.deltaX = e.touches[0].pageX - this.start.pageX;

	    // determine if scrolling test has run - one time test
	    if ( typeof this.isScrolling == 'undefined') {
	      this.isScrolling = !!( this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY) );
	    }
	},

	onTouchEnd: function(e) {
		// prevent default so that we dont do a double click (touchstart + touchend = click, for Mobile Safari)
		e.preventDefault();
		this.element.removeEventListener('touchmove', this, false);
		this.element.removeEventListener('touchend', this, false);

		if(!this.isScrolling){
			var theEvent = document.createEvent('MouseEvents');
			theEvent.initEvent('click', true, true);
			this.element.dispatchEvent(theEvent);
		}
	}
};