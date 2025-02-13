# Extendint the HTML Time Element

The `time` element is one of the newer elements in the HTML standard tag collection. The purpose of the `time` element is to display a time while also providing a machine-readable time as an attribute on the element for semantic purposes.

Formatting the output of a time or date, or a combination of both, is challenging because you never know the appropriate format until you know the user's language preferences. This cannot be pre-calculated in HTML generating frameworks like eleventy. You either need a dynamic server or handle it on the client side.

A client side version. Is detailed here using a extended HTML Element for implementation.

To avoid search engines rating your website down, you can provide the machine-readable time as a default value in the `time` element. When the page loads in the browser, you can use the browser's location language settings to format the value according to typical formats available for that language and replace the pre-rendered technical value in the tag.

Thanks to the `Intl` namespace available in the browser, which aids in internationalization, it is easy to format a date or time, or a combination of both, into the format the user expects.

Example code here.

By enriching the `time` element with internationalization functionality for formatting dates and times, we can automate the conversion of a date and time into the local format on the client side with ease.

`<time is='my-time' datetime=${...}>${...}</time>`

Enriched HTML elements also need a class that implements the functionality, while the tag name remains the same. The `is` attribute on the element tells the browser to search for the specific class, which gets registered in the browser using the custom control API. In the option parameter, you have to specify which element implementation is used as a base class.


## Extending html Tags bs SFC

you cannot only create new components by defining the behavior of new tags, you can also enrich functionality of existing tags
by customizing a built-in element.

<https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#customized_built-in_elements>

Obviously in these cases a shadow dom will not existe and therefore there is no need to provide a template. Also the style will
not be a scoped style but just a page-wide additional style definition.


## Single-File web Components (SFC)

single-file components got popular. This concept enables web developers to define the entire code of a component
within a single file instead of

* separating style into a CSS file
* separating functionality into a JavaScript file
* separating html into a html file
* or creating a script that will create CSS and html at runtime.

So what is the value of spreading the implementation of a component into 3 files or executing JavaScript to create CSS rules instead of writing CSS ?

single-file components got popular because they allow maintaining a component centric definition that covers everything
about the component, functionality, design and interactivity in one place.


Variations of this approach can be found in some articles on the internet:

* <https://ckeditor.com/blog/implementing-single-file-web-components/>


## Loading the component

In the browsers JavaScript and CSS includes have their specific syntax and of course none of these existing mechanisms
know how to handle SFC modules, that use the SFC file format. A loader function is implement to do the job that must be included:

``` html
<script src="/controls/loader.js"></script>
```

To load a component implementation the loadComponent function must be called. This function will load the components from the
specified path and returns a Promise that fulfills when all components have been loaded. This approach is adopted from the
`import()` function for dynamic module loading that also returns a promise.

``` javascript
loadComponent('my-colorpick', '/controls/').then(() => {
  console.log('all1 components loaded.');
});
```

<!--
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
  import { name, draw, reportArea, reportPerimeter } from "./modules/square.js";
-->


## See also

* [Element Behaviors in Internet Explorer 5.5, MSDN Magazine 2000](https://learn.microsoft.com/en-us/archive/msdn-magazine/2000/december/cutting-edge-element-behaviors-in-internet-explorer-5-5)
* [Web Components, MDN 2025](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
* [Custom Elements, WhatWG 2025](https://html.spec.whatwg.org/multipage/custom-elements.html)


<!-- [Form participation using attachInternals](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals) -->