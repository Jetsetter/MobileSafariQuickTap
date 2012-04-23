### MobileSafariQuickTap
A native Javascript class that allows you to selectivly get rid of click delays in MobileSafari

### Why?
You know those pesky delays in MobileSafari for click handles? Aren't those really annoying when your trying to get a native feel for your web app? This class allows you to mimic a tap for specific elements, so you can rid of those delays for the stuff that matters, and leave it off for the stuff that doesnt. This class will also respect scrolling, so if your user is scrolling and touches the element you wont lose the scroll capability.

### How to use?
This is written in native Javascript so it is completely framework independant. 

To set a QuickTap interaction for a specific element:

	new QuickTap(element);

Then bind the click event as you normally would (example in mootools):
	
	element.addEvent('click', function(){
		// do something awesome
	});
