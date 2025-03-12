---
title: Single-File web Components (SFC)
image: "/2025/sfc-box.jpg"
imageAlt: "A box labeld sfc with 3 contained boxes labeled html, JS and CSS."
created: 2025-02-28
tags:
  - "sfc"
description: >
  Single File Components (SFC) got popular as they allow to define the complete code for a component
  in one place.
---

Web standards for HTML, CSS, and JavaScript have matured significantly, providing a robust foundation for modern web
development.  While these standards offer extensive capabilities, they can't cover every possible use case.

One way to extend HTML's declarative nature is through JavaScript, enabling functionality beyond standard tags.  This
approach has a long history, including proprietary solutions like HTML Components (.htc) in Internet Explorer 5.5.

As of 2024, web standards now include official support for creating and extending HTML tags through Web Components and
Custom Elements, utilizing the browser's `customElements` interface.

Single-File Components (SFC) have become increasingly popular as they allow developers to define all component code in
one file, eliminating the need to:

* Maintain separate CSS files for styling
* Keep JavaScript code in separate files
* Store HTML markup in distinct files
* Create runtime scripts for generating CSS and HTML


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

The component loading mechanism described here brings these benefits directly to the browser, enabling a more
streamlined development experience while maintaining web standards compliance.


## Implementation as a Lean / Pure Web Framework

Currently, you can find the loader and SFC control implementations in the <https://github.com/HomeDing/Webfiles> project under the
`sfc` folder. The framework was initially developed to support the [HomeDing Library](https://homeding.github.io/) with these key features:

* **Minimal Footprint**: Designed for IoT devices like ESP8266 or ESP32 processors, where the Web UI must fit within 2MB of Flash memory
* **Standards-First Approach**: Leverages modern HTML and CSS capabilities instead of heavy JavaScript implementations
* **IDE-Friendly**: Uses standard HTML file format for maximum development tool support
* **Pure Web Philosophy**: Adheres to principles outlined in the [pureweb.dev](https://pureweb.dev/manifesto) manifesto

Both the loader and components include development-friendly features like documentation and console logging. For production deployment, these can be stripped using tools like terser:

```bash
npx terser sfc/loader.js -o sfc/loader.min.js -c drop_console -m
```

Bundling multiple controls into a single bundle file is supported by a simple javascript bundler that can be started as command line

```bash
node packsfc <components> -o bundle.htm
```

Both will massively reduce the required download size.


## Standard SFC components

Single-File Components (SFC) don't follow a universal standard.  While frameworks like Vue use a `.vue` file format with
expression support (e.g., {{ "`{{ expression }}`" }}), we'll focus on browser standards combining HTML, CSS, and
JavaScript.

Following Vue's approach, we'll create standard web components using a file format that contains valid HTML, CSS, and
JavaScript.  For more information, see
[Web Components on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components).

To implement a custom element, you need to:

1. Choose a meaningful name with a hyphen (e.g., `my-component`) to avoid conflicts with future standard elements
2. Create HTML/SVG code for display and user interaction
3. Define CSS for styling
4. Write JavaScript for handling options, customization, and user events


### File Structure

The loader uses a file containing three main sections:

``` html
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

* `<style>` -- This tag will contain any css that is local to the component. It will be part of the Shadow DOM and has
  no side effect to the outside.

* `<template>` -- This tag will contain the initial HTML for the component. It will be part of the Shadow DOM and
  has no side effect to the outside.

* `<script>` -- This tag contains the component class definition, exported as an ES6 module.

Documentation can be added to the file as it will be ignored by the loader.  Also the minification tools for HTML will
compress these files and remove all comments.

The component class Custom Elements not deriving from a html standard element must extend the `UComponent` class from
`loader.js` and will be registered using `CustomElementRegistry.define()`.

Variations of this approach can be found in some articles on the internet:


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
<script extends="time">
export default class MyTime extends HTMLTimeElement {
  ...
}
</script>
```


## Loading the component

In the browsers JavaScript and CSS includes have their specific syntax and of course none of these existing mechanisms
know how to handle SFC modules, that use the SFC file format.  A loader function is implement to do the job that must be
included:

``` html
<script src="/controls/loader.js"></script>
```

To load a component implementation the loadComponent function must be called. This function will load the components from the
specified path and returns a Promise that fulfills when all components have been loaded. This approach is adopted from the
`import()` function for dynamic module loading that also returns a promise.

``` javascript
loadComponent('my-colorpick').then(() => {
  console.log('all1 components loaded.');
});
```

by default the sfc files are located in the same folder as the loader.js.  Another folder can be specified by using the
second, optional parameter to the `loadComponent` function `loadComponent('my-colorpick,mytablesort', '/mycontrols/')`.


## More to come


* Sources on Github in a dedicated project
* Extending the HTML Time Element by using SFC
* Explain packsfc

## See also

* [Element Behaviors in Internet Explorer 5.5, MSDN Magazine 2000](https://learn.microsoft.com/en-us/archive/msdn-magazine/2000/december/cutting-edge-element-behaviors-in-internet-explorer-5-5)
* [Web Components, MDN 2025](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
* [Custom Elements, WhatWG 2025](https://html.spec.whatwg.org/multipage/custom-elements.html)
* <https://ckeditor.com/blog/implementing-single-file-web-components/>

