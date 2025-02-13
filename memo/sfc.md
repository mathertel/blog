# Extend HTML with Elements Self Contained Components

The Standards on HTML, CSS and JavaScript -- the technologies in the browsers -- have grown up and today can be used as
a robust basis for content and application development.

But of course they are not perfect and never will cover everything ever required.

Extending the declarative way of HTML by JavaScript is one of the answers creating functionality beyond the standard
tags and the history of such proprietary technologies is long (e.g. HTML Components .htc in IE 5.5).

As of today (2025) the standards now have a official way of creating and extending HTML tags by using a widely implemented
approach known as  Web Components and Custom Elements using the `customElements` of the browser interface.


## Single-File web Components (SFC)

Single-File Components have gained popularity because they enable web developers to define the entire code of a component within a single file, rather than:

* Separating styles into a CSS file
* Separating functionality into a JavaScript file
* Separating HTML into an HTML file
* Creating a script that generates CSS and HTML at runtime


## Benefits of Single-File Components

Why would you want to use Single-File Components instead of traditional separated files? Here's why:

* **Cohesive Organization** -- Instead of spreading component code across multiple files (HTML, CSS, and JavaScript),
  everything related to the component lives in one place.

* **Direct Implementation** -- Unlike frameworks like Vue, where components are transformed into JavaScript during build
  time, this approach loads component definitions directly in the browser.

* **Native Processing** -- HTML, CSS, and JavaScript are handled natively without transformation into pure JavaScript
  code, resulting in more straightforward debugging and maintenance.

* **Build Process Independence** -- Components can be developed and tested without complex build pipelines, making the
  development process more efficient.

The component loading mechanism described here brings these benefits directly to the browser, enabling a more streamlined development experience while maintaining web standards compliance.


## Implementing Custom Elements

Creating custom elements from scratch allows you to build reusable declarative components, similar to how HTML has evolved with new elements over the years. Here's what you need to know:

### Component Structure

Single-File Components (SFC) don't follow a universal standard. While frameworks like Vue use a `.vue` file format with expression support (e.g., `{{ expression }}`), we'll focus on browser standards combining HTML, CSS, and JavaScript.

Following Vue's approach, we'll create standard web components using a file format that contains valid HTML, CSS, and JavaScript. For more information, see [Web Components on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

To implement a custom element, you need to:

1. Choose a meaningful name with a hyphen (e.g., `my-component`) to avoid conflicts with future standard elements
2. Create HTML/SVG code for display and user interaction
3. Define CSS for styling
4. Write JavaScript for handling options, customization, and user events

### File Structure

The loader uses a file containing three main sections:

```html
<style>
  /* Component-specific CSS */
</style>

<template>
  <!-- Component HTML structure -->
</template>

<script>
  // Component JavaScript code
</script>
```

Each section serves a specific purpose:

* `<style>` -- This tag contains component-local CSS within the Shadow DOM.
* `<template>`: This tag defines the initial HTML structure within the Shadow DOM.
* `<script>`: This tag contains the component class definition, exported as an ES6 module.

Documentation can be added to the file as it will be ignored by the loader.  Also the minification tools for HTML will
compress these files and remove all comments.

The component class Custom Elements must extend the `UComponent` class from `loader.js` and will be registered using `CustomElementRegistry.define()`.


## Extending Existing HTML Elements

You cannot only create new components by defining the behavior of new tags, you can also enrich functionality of
existing tags by customizing a built-in element / HTML tags.

<https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#customized_built-in_elements>

To enable the customization the `is` attribute is used instead of the tag-name.

<time is="u-time" ...>...</time>

Examples are:

* Sorting and Filtering for tables
* Formatting data on output elements according to the locale by the user.

The `style` can be used to change the default design of the extended element.
But this will not be a scoped style for the Shadow DOM but just a page-wide additional style definition.
So don't use the `scope` attribute and place the new style rules into the current page and use a css rule with the is attribute to apply the css styling to the extended element.

``` html
<style>
  time[is="u-time"] {
    color: red;
  }
</style>
```

Obviously in these cases the shadow dom will not exist and therefore there is no need to provide a template.

The script tag in Component definition file has an additional attribute that specifies what base element will be extended.

Also the class must derive from the same base element.

``` html
<script for="time">
export default class MyTime extends HTMLTimeElement {
  ...
}
</script>
```

* See [Customized time element](sfc-time.md)
* See [Sorting Tables](sfc-time.md)


## Loading Components

In the browsers JavaScript and CSS includes have their specific syntax and of course none of these existing mechanisms
know how to handle SFC modules, that use the SFC file format. A loader function is implement to do the job that must be included:

``` html
<script src="/controls/loader.js"></script>
```

To load a component implementation the loadComponent function must be called. This function will load the components from the
specified path and returns a Promise that fulfills when all components have been loaded. This approach is adopted from the
`import()` function for dynamic module loading that also returns a promise.

``` javascript
loadComponent('my-colorpick,my-time').then(() => {
  console.log('all1 components loaded.');
});
```

<!--
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
  import { name, draw, reportArea, reportPerimeter } from "./modules/square.js";
-->


## See also

* [Element Behaviors in Internet Explorer 5.5, MSDN Magazine 2000](https://learn.microsoft.com/en-us/archive/msdn-magazine/2000/december/cutting-edge-element-behaviors-in-internet-explorer-5-5)
* <https://ckeditor.com/blog/implementing-single-file-web-components/>

* [Web Components, MDN 2025](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
* [Custom Elements, WhatWG 2025](https://html.spec.whatwg.org/multipage/custom-elements.html)


<!-- [Form participation using attachInternals](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals) -->