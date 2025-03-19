---
title: Single-File Components Details - 1
image: "/2025/sfc-box.jpg"
imageAlt: "A box labeled sfc with 3 contained boxes labeled html, JS and CSS."
created: 2025-03-18
tags:
  - "sfc"
description: >
  Details on the SFC implementation: File Names and Extensions
---

### File Names and Tag Names

In case there is a single custom element file (not component bundles and no extension) the filename is identical to the
tag name.  This helps understanding the file content right from the filename.

As required by the HTML standard the tag name must contain a '-' (minus) character to avoid conflicts with the standard HTML elements
so this applies to file-names as well.

As a best practice libraries for custom elements like for css variables is to use a common prefix like:

* `generic-` --  used by <https://github.com/thepassle/generic-components>
* `howto-` -- used by <https://github.com/GoogleChromeLabs/howto-components>
* `ion-` -- used by <https://ionicframework.com/>
* `kor-` -- used by <https://kor-ui.com/components>

As a bad practice, names line `my-element`, `todo-list`, `ui-button` or `custom-range-input` are formally correct but risking
conflicts.

This collection of custom elements is using the `u-` prefix. (u looks like the micro (µ) sign that cannot be used).

* `u-` -- used by <https://github.com/mathertel/sfc>


### File Extensions

SFC components are regular HTML formatted files !

To allow best support from the tools (I use vscode most of the times) the file extension used is *.sfc that can be mapped in the
user or workspace setting to html formatting. e.g.:

``` json
"files.associations": {
  "*.sfc": "html"
}
```

This file extension should also work for other environments.


## See also

* [SFC Project on Github](https://github.com/mathertel/sfc)
* [Element Behaviors in Internet Explorer 5.5, MSDN Magazine 2000](https://learn.microsoft.com/en-us/archive/msdn-magazine/2000/december/cutting-edge-element-behaviors-in-internet-explorer-5-5)
* [Web Components, MDN 2025](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
* [Custom Elements, WhatWG 2025](https://html.spec.whatwg.org/multipage/custom-elements.html)
* <https://ckeditor.com/blog/implementing-single-file-web-components/>

