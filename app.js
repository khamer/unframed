/**
 * Workshopped - various enhancements to workshop.
 *
 * Changes -
 *   2.1  added project filter to To Do list, assignee filter to Tickets
 *   2.0  initial release w/ download links for images
 */
(function($) {
	Object.keySortedEach = function(obj, callback) {
		var keys = Object.keys(obj).sort();
		for (var i = 0; i < keys.length; i++) {
			callback( keys[i], obj[ keys[i] ] );
		}
	};

	$.fn.onceExists = function(interval, callback) {
		var this_reloaded = $(this.selector);

		if (this_reloaded.length) {
			this_reloaded.each(callback);
		} else {
			setTimeout(
				function() {
					this_reloaded.onceExists(interval, callback);
				},
				interval
			);
		}
	};

	;$(function() {
		//Adds in download links to image attachments.
		$('a[href*=disposition]').each(function() {
			var link = $(this).attr('href').replace('html', 'inline');
			$('<a>(download)</a>').attr('href', link).insertAfter(this);
			$(this).after(' ');
		});

		//Adds in project filter to To Do tab.
		$('#to_do').onceExists(100, function() {
			var projects = {};
			var rows = $(this).find('tr');
			$(this).find('tr a.project_link').each(function() {
				var project = $(this).text();
				if (project in projects) {
					projects[project] = projects[project] + 1;
				} else {
					projects[project] = 1;
				}
			});

			var project_filter = $('<select/>');
			$('<option value="All">-</option>').appendTo(project_filter);

			Object.keySortedEach(projects, function(project, count) {
				$('<option />')
					.val(project)
					.text(project + ' (' + count + ')')
					.appendTo(project_filter);
			});
			project_filter.change(function() {
				var project = project_filter.val();

				if (project == 'All') {
					rows.show();
				} else {
					rows.each(function() {
						if ($(this).find('a.project_link').text() == project) {
							$(this).show();
						} else {
							$(this).hide();
						}
					});
				}

			});
			project_filter.prependTo(this);
		});

		//Adds in assignee filters to milestones on a project's tickets page.
		$('#tickets h2.section_name').each(function() {
			var tickets = $(this).next('.section_container').find('ul.tickets_list li.ticket');

			var assignees = {};
			tickets.each(function() {
				var assignee_elem = $(this).find('.details:contains(is responsible) a:first');
				if (assignee_elem.length) {
					assignee = assignee_elem.text();
					if (assignee in assignees) {
						assignees[assignee] += 1;
					} else {
						assignees[assignee] = 1;
					}
				}
			});

			var assignee_filter = $('<select />')
				.css({ 'float': 'right', 'margin': 0, 'padding': 0, 'font-size': 10 });

			if ($(this).find('ul.section_options').length) {
				$(this).find('ul.section_options').after(assignee_filter);
			} else {
				assignee_filter.css('margin', 9);
				$(this).find('.section_name_span')
					.css('float', 'left')
					.after(assignee_filter);
			}

			$('<option value="All">-</option>').appendTo(assignee_filter);

			Object.keySortedEach(assignees, function(assignee, count) {
				$('<option />')
					.val(assignee)
					.text(assignee + ' (' + count + ')')
					.appendTo(assignee_filter);
			});

			assignee_filter.change(function() {
				var assignee = assignee_filter.val();

				if (assignee == 'All') {
					tickets.show();
				} else {
					tickets.each(function() {
						var assignee_elem = $(this).find('.details:contains(is responsible) a:first');
						if (assignee_elem && assignee_elem.text() == assignee) {
							$(this).show();
						} else {
							$(this).hide();
						}
					});
				}
			});
		});
	});
})(ejq);
