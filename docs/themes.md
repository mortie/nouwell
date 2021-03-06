# Themes
A Nouwell theme is in the form of a directory which the user installs into their `themes/` directory. It is divided up into four subdirectories: `html`, `js`, `img`, and `css`. In addition to reading this document, having a look at [the default theme](https://github.com/mortie/nouwell/tree/Stable/theme/default) and how it is structured would be a good idea.

## html
This directory contains all HTML templates. Each file is its own template, used by the build script at various stages in the build process.

### index.html
This is the starting point for building the HTML file for a particular page or post.

Make sure that your index.html template contains `<link rel="stylesheet" href="/style.css">` and `<script src="/script.js`"></script>` to include the page's CSS and javascript.

**Arguments**:

* **{postTitle}**: The title of the post or page.
* **{siteTitle}**: The website's title, set by conf.json.
* **{menu}**: The HTML generated by the `menu.html` template, containing the site's navigation menu.
* **{posts}**: The HTML generated by the `post.html` template.

### menu.html
This defines the site's navigation menu.

**Arguments**:

* **{headerImage}**: The HTML generated by the `menuHeaderImage.html` template.
* **{pages}**: The HTML generated by the `menuPage.html` template.

### menuHeaderImage.html
This defines the HTML for a header image.

**Arguments**:

* **{url}**: The URL for the image.

### menuPage.html
This defines a link to a page in the navigation menu.

**Arguments**:

* **{url}**: The URL it should link to if the user presses the link.
* **{title}**: The page's title.
* **{current}**: Whether the page is currently active. Contains the string "current" if true, an empty string if false.
* **{dropdown}**: The HTML generated by the `menuPageDropdown.html` template.

### menuPageDropdown.html
This defines any dropdown pages for a parent page.

**Arguments**:

* **{url}**: The relative path it should link to if the user presses the link.
* **{title}**: The page's title.
* **{current}**: Whether the page is currently active. Contains the string "current" if true, an empty string if false.

### post.html
This defines the body of a post.

**Arguments**:

* **{url}**: The post's relative URL.
* **{title}**: The post's title.
* **{content}**: The post's content as HTML.

## css
All files here are combined into `/style.css`.

## js
All files here are combined into `/script.js`. Files starting with an exclamation point (!) will be before files without. Also, keep in mind that you have [the q.js library](https://github.com/mortie/nouwell/blob/Stable/docs/qjs.md) to help you out.

## img
All files here will be copied into the directory `/_img`. This lets you include things like icons for your HTML templates to access.
