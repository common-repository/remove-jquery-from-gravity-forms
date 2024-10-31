=== Remove jQuery from Gravity Forms ===
Contributors: victorberland
Donate link: https://aesal.net/donate
Tags: gravity forms, jquery, forms, REST API
Requires at least: 5.0
Tested up to: 6.1.1
Stable tag: 1.1.1
Requires PHP: 7.0
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Makes Gravity Forms submit forms using the built-in REST API and removes jQuery as a dependency.

== Description ==

Gravity Forms is an excellent plugin for creating forms, but requires loading jQuery in the front-end for AJAX submissions to work. Obiously we would like to avoid a full reload on submission, but also not include JQuery in this day and age where vanilla JavaScript is so capable.

This plugin makes use of the built-in REST API in Gravity Forms, and uses that to submit the form and perform validation. File uploads and multi-page forms are supported.

By only using vanilla JavaScript, this plugin is 1.5kB (v1.1 minified and gzipped), compared to the 31kB of jQuery (3.6.1 minified and gzipped). A 95% reduction in size!

== Installation ==

1. Make sure Gravity Forms is installed and activated.
2. Enable the REST API in Gravity Forms settings.
3. Install and activate this plugin.

== Frequently Asked Questions ==

= Will this break my site? =

This plugin removes jQuery from the front-end, and other plugins dependent on that may face issues. If you still require jQuery to be loaded, you probably don't need this plugin.

== Changelog ==
= 1.1.1 =
Disable submit button while loading to prevent double submissions.

= 1.1 =
Add support for file uploads and test with WordPress 6.1. Managed to reduce the size of the plugin (gzipped) from 1.6kB to 1.5kB!

= 1.0 =
* First release!
