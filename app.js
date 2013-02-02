/**
 * Workshopped - various enhancements to workshop.
 *
 * Changes -
 *   2.1  added project filter to To Do list, assignee filter to Tickets
 *   2.0  initial release w/ download links for images
 */
(function($) {
	console.log('loaded', $.fn.jquery);

	var button = $('<div id="wireframed">◲</div>').appendTo(document.body);

	var active = false;
	button.click(function() {
		if (active) {
			active = false;
			button.removeClass('active');
		} else {
			active = true;
			button.addClass('active');
		}
	});
})(window.wireframed.jQuery);
