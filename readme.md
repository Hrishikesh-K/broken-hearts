# Broken Hearts

**Note:** This is not a Hugo Theme! It's a complete website. However, you're allowed to download (or clone), modify and distribute it the way you want, with or without giving credits. It is assumed that the developer has knowledge of basic HTML, CSS, JS and Hugo.

## Table of contents

* [What is this repository?](#what-is-this-repository)
* [Content structure](#content-structure)
* [Features of this code](#features-of-this-code)
	* [UIkit-based](#uikit-based)
	* [Responsive](#responsive)
	* [Light/Dark mode](#lightdark-mode)
	* [Pagination](#pagination)
	* [SEO](#seo)
	* [PWA](#pwa)
	* [RSS Feed](#rss-feed)
	* [Headless (Netlify) CMS](#headless-netlify-cms)
	* [Full-text search](#full-text-search)
	* [Comments](#comments)
* [Support](#support)
	* [Updating dependencies](#updating-dependencies)
	* [Adding features](#adding-features)
	* [Other issues](#other-issues)
* [License](#license)


## What is this repository?

Broken Hearts is a blog by Ananya Mangwani. This repository is the source code of the blog made in Hugo. The content is sourced from Netlify CMS and the final website is hosted on Netlify. It's also a backend for the user-driven comments on the website.

In its bare essence, this code is a pretty simple blog without any dynamic configuration, that is, there are no user-configurable variables. Since this was not made as a template, I have hardcoded all the values and to change those, one would have to edit the code themselves.

[Back to TOC](#table-of-contents)

## Content structure

Since this is a Hugo website, most of the content-structure is influenced by Hugo's way of working. The following is a basic information about the same:

The `assets` folder consists of the `css` and `js` files used by the website organised in their respective folders. The files are pre-minified with the exception of `styles.css`, `scripts.js` and `sw.js` as those files are self-written and need constant editing. They are however later minified by Hugo. There's also a `yml` folder conisting of the configuration of Netlify CMS. If you plan to use this code as it is, the configuration would work perfectly.

The `content` folder consists of all the content files of the website. While the main content lies in the `blog` folder, the other files are used to create custom layouts. The blog posts are numbered by the order of writing which is also their slug. All the assets used by the content files are stored in `assets` folder that exists inside the slug folder. This is to ensure that Hugo can use those files for further processing.

The `layout` folder mostly consists of HTML templates used to generate the final HTML files. Along with that, it also consists of other layouts like 'Search index' (`index.json`, RSS feed (`index.xml`), Robots (`robots.txt`) and Sitemap (`sitemap.xml`).

The `static` folder consists of all the files that don't need any processing from Hugo and would be copied as they are to the root of the website. Most of the files from that folder would have to be replaced to customise the website.

Finally, we have a `config.toml` and a `netlify.toml`. The `config.toml` file is used to configure Hugo. This code is configured to work perfectly with the config that's already set, thus in case any of the config is changed, the source code might have to be changed accordingly too. The `netlify.toml` file contains the config used for Netlify. There's yet another file called `icons.cdr`. It's a CorelDRAW 2020 file consisting of icons made for the blog posts.

For more deailed information about the content structure, check Hugo's documentation: https://gohugo.io/content-management/.

[Back to TOC](#table-of-contents)

## Features of this code

The code is minimally configured with the following features:

[Back to TOC](#table-of-contents)

### UIkit-based

The website uses UIkit as its design framework. It's one of the most complete frameworks with a huge collection of components that are very easy to configure. Check it out here: https://github.com/uikit/uikit

[Back to TOC](#table-of-contents)

### Responsive

Thanks to UIkit for out-of-box responsiveness. Using its components, the code is set-up to use Masonry based layout to list all the posts. The code uses full-width till 1200px width at which it's capped.

[Back to TOC](#table-of-contents)

### Light/Dark mode

The website comes with a simple light/dark mode configured out of the box. The default mode is set according to the user's system preference and updates live as the preference changes unless the user choses to override this by setting a theme. This is made possible using CSS variables and JavaScript. The colours are set using CSS. All the variables are configured with their RGB values as it enables us to use RGBA values if needed which is not possible with HEX codes. The JavaScript checks for system preference, user preference and listens for the theme change event and toggles the theme accordingly.

[Back to TOC](#table-of-contents)

### Pagination

Using Hugo's pagination features, this website can paginate posts on the home page. The page numbers are generated with the following logic (roughly):

* Previous pages:
	* If there are 2 pages:
		* Current page - 1 page number
	* If there are 3 pages:
		* `...` to indicate presence of more pages in between
		* Previous page button
		* Current page - 2 page number (or page 1)
	* If there are more than 3 pages:
		* `...` to indicate presence of more pages in between
		* Previous page button
		* Current page - 2 page number (or page 1)
		* First page button
* Current page number
* Next pages:
	* If there are 2 pages:
		* Current page + 1 page number
	* If there are 3 pages:
		* `...` to indicate presence of more pages in between
		* Next page button
		* Current page + 2 page number (or page 3)
	* If there are more than 3 pages:
		* `...` to indicate presence of more pages in between
		* Next page button
		* Current page + 2 page number (or last page)
		* Last page button

[Back to TOC](#table-of-contents)

### SEO

The code is configured to use various important meta, OG and Twitter tags and images. It also uses Structured Data. However, the pages `404` and `admin` excluded from search engine indexing. Moreoever, the code also generates a XML sitemap that can be used by search engines.

[Back to TOC](#table-of-contents)

### PWA

The code is also configured to generate and use a service worker along with other manifes images, etc. thus, the browser will allow users to install this website as an app. The service worker is able to load the `index.html` page when offline.

[Back to TOC](#table-of-contents)

### RSS Feed

The code also generates a RSS feed for the posts in the `blog` section.

[Back to TOC](#table-of-contents)

### Headless (Netlify) CMS

To make it easy for Ananya and to give a feel of running an actual blog, this code is configured to be able to manage posts using Netlify CMS. Check it out here: https://github.com/netlify/netlify-cms.

[Back to TOC](#table-of-contents)

### Full-text search

The website uses Lunr.js (https://github.com/olivernn/lunr.js) to enable a full-text search for all the posts in the `blog` section. The search page also supports `query parameters`, that is, search using the `?q=search-term` suffix. The search then looks for matches in the generated index and shows the matches with their context in the post.

[Back to TOC](#table-of-contents)

### Comments

The website also uses Gitalk (https://github.com/gitalk/gitalk) to grant users the ability to comment on the posts.

[Back to TOC](#table-of-contents)

## Support

I am generally very active with my e-mail. Thus, if someone would create a new issue or comment on an existing one, I would probably reply in a few hours.

[Back to TOC](#table-of-contents)

### Updating dependencies

This code is under active maintainance. Any update to dependecy is published within a few hours usually.

[Back to TOC](#table-of-contents)

### Adding features

While I won't say no to new feature requests, I can't promise any feature beign added easily because of my limited skill set. If the feature request is viable enough, I would consider it.

[Back to TOC](#table-of-contents)

### Other issues

If you face any problem regarding customization or modification, or whatever about this website, you are free to open an issue and we can discuss.

[Back to TOC](#table-of-contents)

## License

MIT License

Copyright (c) 2020 Hrishikesh Kokate

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[Back to TOC](#table-of-contents)