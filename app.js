/**
 * Workshopped - various enhancements to workshop.
 *
 * Changes -
 *   2.1  added project filter to To Do list, assignee filter to Tickets
 *   2.0  initial release w/ download links for images
 */
(function($) {
	var init = function() {

		$(':visible').css({
			"background-image": 'none',
			"background-color": 'transparent',
			"color": '#779',
			"font-family": 'Helvetica, arial'
		});

		$('img').css({
			"filter": 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale")',
			"-webkit-filter": 'grayscale(100%)',
			"opacity": '0.5'
		});

		$('html:visible:not(#wireframed), body:visible:not(#wireframed):visible:not(#wireframed), header:visible:not(#wireframed), footer:visible:not(#wireframed), div:visible:not(#wireframed), section:visible:not(#wireframed), aside:visible:not(#wireframed), article:visible:not(#wireframed), ul:visible:not(#wireframed), ol:visible:not(#wireframed), nav:visible:not(#wireframed)').each(function() {
			var $this = $(this);
			if ($this.innerHeight() == 0 || $this.innerWidth() == 0) {
				console.log('skipping', this);
				return;
			}

			$this.css({
				"border-color": '#779',
				"box-shadow": '0 0 0 1px #779 inset'
			});

			if ($this.css('position') == 'static') {
				$this.css('position', 'relative');
			}

			var tag = $('<div class="wireframed-tag" />');
			var classes = $this.attr('class')
			if (classes) {
				classes = classes.split(/\s+/).sort();
			} else {
				classes = [];
			}

			var label = '';
			if (this.nodeName.toLowerCase() != 'div') {
				label = this.nodeName.toLowerCase();
			}

			if ($this.attr('id')) {
				label += '#' + $this.attr('id');
			}

			for (var i in classes) {
				if (classes[i]) {
					label += '.' + classes[i];
				}
			}

			var parent_tag = $this.parent().children('.wireframed-tag');
			if (parent_tag.length) {
				var offset = 16 + parseInt(parent_tag.css('top'));
				tag.css('top', offset);
			}

			tag.text(label);

			tag.hover(
				function() {
					$(this).parent().css('background-color', '#ccf');
				}, 
				function() {
					$(this).parent().css('background-color', 'transparent');
				}
			);

			$this.prepend(tag);
		});
	};

	var button = $('<div id="wireframed">&lt;&gt;</div>').appendTo(document.body).one('click', init);
})(window.wireframed.jQuery);
