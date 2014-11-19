# q.js

## Element Interaction
q.js is a handy library for creators of themes and plugins. Think of it as a glorified document.querySelectorAll. This for example would return all elements with the class "myclass" with a parent whose ID is "myid":

```
q("#myid .myclass");
```

If no query string is provided, it will return the `window` object.

Now that we have the elements, we can start doing things with them.

### .on(event, callback(event))
The `.on` method allows us to add event listeners to objects, like so:

```
q(".myclass").on("click", function(e)
{
	console.log("Clicked!");
});
```

It supports all of HTML's event types, plus a custom `tap` event which, on devices with touch screens, act as `click`, but without the 300ms delay:

```
q(".myclass").on("tap", function(e)
{
	console.log("Tapped!");
});
```

### q.data(key [, value])
This method lets you set and get the elements' data attributes:

```
<div class="myclass" data-name="Paul"></div>
```

```
q(".myclass").data("name") //returns "Paul"
q(".myclass").data("name", "Ulrich") //the div's name is now "Ulrich"
```

If there are multiple elements selected by the selector, e. g. multiple elements with a class of "myclass" in our example, `.data("name")` would return an array of values.

### q.get(key)
This method lets you get elements' properties:

```
<input class="myclass" type="text" value="hi" />
```

```
q(".myclass").get("value"); //returns "hi"
```

If there are multiple elements selected by the selector, e. g. multiple elements with a class of "myclass" in our example, `.get("value")` would return an array of values.

### q.set(key, val)
This method lets you set elements' properties:

```
q(".myclass").set("innerHTML", "hi"); //sets the innerHTML of all elements of class "myclass" to "hi"
```

## Static Methods
In addition to the functions to interact with elements, q.js has a couple of static methods.

### q.widgetify(name, callback(element, arguments))
This method is very relevant for plugins. It will look for any instances of `<x-widget class="{name}">{arguments}</x-widget>` in the site's HTML, where `{name}` is the `name` parameter you pass to q.widgetify, and `{arguments}` is a comma separated list of arguments which will be passed to your callback as an array. q.widgetify calls your callbacks once for each instance of the relevant `<x-widget>` tag, each time with a different HTML element as the `element` argument.

A simple example:

```
q().on("load", function()
{
	q.widgetify("greeting", function(element, arguments)
	{
		element.set("innerHTML", "Hello, "+arguments[0]+"!");
	});
});
```

Now, this:

```
<x-widget class="greeting">Linus Torvalds</x-widget>
```

will look like this:

```
Hello, Linus Torvalds!
```

### .get(url, callback(response))
Send a GET request to a URL, and get the response in a callback.

### .post(url, data, callback(response))
Send a POST request to a URL, and get the response in a callback.
