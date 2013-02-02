Unframed - reveal your DOM Structure
====================================

Unframed is a **chrome extension** that provides a floating button in the
bottom right that when clicked, strips down the current page to show the
elements in the DOM typically just used for structure and layout. Elements like

* html
* body
* div
* header and footer
* section
* aside
* article
* ul and ol
* nav
* table

It follows the structure of the DOM, so it will only highlight these elements
as long as all their ancestors are also one of these. For each of these
elements, I hilight the edge and put a label up the upper right (or as close to
that as I can without overlapping labels) that you can hover over to see that
element highlighted. In the label, I put

* the tag (if it isn't div),
* ID (if there is one), and
* any class names (if there are any.)


But Why?
--------

I wanted to provide a tool to better see how semantic tag and classes are used
on sites quickly.
