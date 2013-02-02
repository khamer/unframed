/**
 * Workshopped - various enhancements to workshop.
 *
 * Changes -
 *   2.1  added project filter to To Do list, assignee filter to Tickets
 *   2.0  initial release w/ download links for images
 */
(function($) {
	var init = function() {

		var tagPositions = [];

		$(':visible:not(#unframed)').css({
			"background": 'none',
			"background-color": 'transparent',
			"background-image": 'none',
			"border-color": '#888',
			"border-radius": 0,
			"box-shadow": 'none',
			"color": '#888',
			"font-family": 'Helvetica, arial',
			"text-shadow": 'none'
		});

		$('img').css({
			"filter": 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale")',
			"-webkit-filter": 'grayscale(100%)',
			"opacity": '0.5'
		});

		var tagElement = function() {
			var $this = $(this);
			if ($this.innerHeight() == 0 || $this.innerWidth() == 0) {
				return;
			}

			$this.css({
				"border-color": '#888',
				"box-shadow": '0 0 0 1px #888 inset'
			});

			if ($this.css('position') == 'static') {
				$this.css('position', 'relative');
			}

			var tag = $('<div class="unframed-tag" />');
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

			if (label == '') { 
				label = 'div';
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

			if ($this.children().length) {
				$this.children().first().after(tag);
			} else {
				$this.prepend(tag);
			}

			var position = {
				name: tag.text(),
				left: tag.offset().left,
				right: tag.offset().left + tag.outerWidth(),
				top:  tag.offset().top,
				bottom: tag.offset().top + tag.outerHeight()
			};

			var offset = 0;
			for (var i in tagPositions) {
				var tagPosition = tagPositions[i];
				if (position.left < tagPosition.right && position.right > tagPosition.left && position.top < tagPosition.bottom && position.bottom > tagPosition.top) {
					//they overlap
					var overlap = 3 + position.right - tagPosition.left;

					offset += overlap;
					position.right -= overlap;
					position.left -= overlap;
					tag.css('right', offset);
				}
			}

			tagPositions.push(position);
		};

		var searchTags = 'div:not(#unframed):not(.unframed-tag), header, footer, section, aside, article, ul, ol, nav, table';
		for (var level = $('html, body'); level.length > 0; level = level.children(searchTags)) {
			level.each(tagElement);
		}
	};

	var button = $('<div id="unframed">&lt;&gt;</div>').appendTo(document.body).one('click', init);
})(window.unframed.jQuery);
