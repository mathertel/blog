---
title: Extending the HTML Time Element
created: 2025-04-01
modified: 2025-04-12
tags: 
  - "eleventy"
  - "sfc"
description: >
  The sfc-time Single File Component (SFC) extends the standard `<time>` element to use the date and time formatting of the
  current user to display date and time values.
---

The `<time>` element is one of the newer elements in the HTML standard tag collection. Its purpose is to display date and time
values while providing a machine-readable timestamp as an attribute for semantic purposes.

Formatting time or date output is challenging because the appropriate format for users depends on user language preferences. As
this is known at runtime only this cannot be pre-calculated in HTML generating frameworks like Angular or Eleventy. You either
need a dynamic server or handle it client-side.

## Using a Custom Element

Here, I detail a client-side solution using an extended HTML Element for implementation. This is done by using the
component loading functionality of the [Single File Components (SFC) Project](https://github.com/mathertel/sfc).

To maintain good SEO rankings, provide the machine-readable time as a default value in the `<time>` element. When the page
loads, you can use the browser's location language settings to format the value according to typical formats for that language
and replace the pre-rendered technical value.

The browser's `Intl` namespace, which aids in internationalization, makes it easy to format dates and times into user-expected formats.

in JavaScript this is done by some script:

``` js
const fmt = new Intl.DateTimeFormat(navigator.languages, {
  dateStyle: 'medium',
  timeStyle: 'short',
});
this.textContent = fmt.format(new Date('2025-03-28 14:09:29'));
```

This formatting is wrapped into a Custom Component implementation named `u-time` that extends the regular `<time>` element
by adjusting the shown textual value from the given datetime attribute. No need to specify a text inside the time element.

Usage example in plain HTML:

```html
<time is='u-time'
  datetime='2025-04-11 14:09:29'
  datestyle='short'
  timestyle='short'>
  2025-04-11 14:09:29</time>
```

Usage example in eleventy using nunjucks to include meta data:

```html
<time is='u-time'
  datetime='{{ "{{ post.data.modified | toISODate }}"}}'
  datestyle='medium'
  timestyle='none'>
  {{ "{{ post.data.modified | toISODate }}"}}</time>
```

will show up as `Apr 11, 2025` on `en` locales and as `11.04.2025` on `de` locales.

Enhanced HTML elements require a class implementing the functionality while keeping the original tag name. The `is` attribute
tells the browser to look for the specific class, which is registered using the customElements.define API. The options parameter
must specify which element implementation serves as the base class.


## Style Attributes

The standard `<time>` component can be styled according the standard CSS styling capabilities.


## HTML and JavaScript accessible Attributes

The following attributes can be used to configure the behavior of the extended time element:

* `datetime` -- the value of the date/time to be displayed. A date object or ISO date format can be used.
* `datestyle` -- the style of the date part beeing displayed. Possible values are `"full"`, `"long"`, `"medium"`, and `"short"`.
* `timestyle` -- The style of the time part beeing displayed  Possible values are `"full"`, `"long"`, `"medium"`, and `"short"`.

the `"medium"` format is default for datestyle and timestyle.

## See also

* [Single File Components (SFC) Project](https://github.com/mathertel/sfc)
* [Time Extension Custom Component](https://github.com/mathertel/sfc/blob/main/doc/u-time.md)
* [HTML time element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)
* [About time formatting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat)
