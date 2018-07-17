/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

/* List of projects/orgs using your project for the users page */
const users = [
	{
		caption: 'User1',
		// You will need to prepend the image path with your baseUrl
		// if it is not '/', like: '/test-site/img/docusaurus.svg'.
		image: '/img/docusaurus.svg',
		infoLink: 'https://www.facebook.com',
		pinned: true
	}
];

const siteConfig = {
	title: 'make-space',
	tagline: 'Free up space from your command line',
	url: 'https://make-space.sh',
	baseUrl: '/',

	projectName: 'make-space',
	organizationName: 'JonnyBurger',
	headerLinks: [
		{doc: 'brew-cleanup', label: 'Docs'},
		{doc: 'strategies', label: 'Strategies'},
		{href: 'https://github.com/JonnyBurger/make-space', label: 'GitHub'}
	],

	// If you have users set above, you add it here:
	users,

	/* path to images for header/footer */
	headerIcon: 'img/trashcan.png',
	footerIcon: 'img/trashcan.png',
	favicon: 'img/favicon.png',

	/* colors for website */
	colors: {
		primaryColor: '#2c3e50',
		secondaryColor: '#9980FA'
	},

	/* custom fonts for website */
	/*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

	// This copyright info is used in /core/Footer.js and blog rss/atom feeds.
	copyright: 'Copyright © ' + new Date().getFullYear() + ' Jonny Burger',

	highlight: {
		// Highlight.js theme to use for syntax highlighting in code blocks
		theme: 'default'
	},

	// Add custom scripts here that would be placed in <script> tags
	scripts: [
		'https://buttons.github.io/buttons.js',
		'https://code.jquery.com/jquery-3.3.1.slim.min.js',
		'/js/app.js'
	],

	/* On page navigation for the current documentation page */
	onPageNav: 'separate',

	/* Open Graph and Twitter card images */
	ogImage: 'img/trashcan.png',
	twitterImage: 'img/trashcan.png',

	// You may provide arbitrary config keys to be used as needed by your
	// template. For example, if you need your repo's URL...
	repoUrl: 'https://github.com/JonnyBurger/make-space'
};

module.exports = siteConfig;
