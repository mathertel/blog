---
title: Extending the HTML Time Element
created: 2025-01-13
tags: ["web-controls"]
description: >
  The sfc-time Single File Component extends the standard `time` element to use the date and time formatting of the
  current user to display date and time values.
---

The `time` element is one of the newer elements in the HTML standard tag collection. Its purpose is to display date and time values while providing a machine-readable timestamp as an attribute for semantic purposes.

Formatting time or date output is challenging because the appropriate format depends on user language preferences. This cannot be pre-calculated in HTML generating frameworks like Eleventy. You either need a dynamic server or handle it client-side.

Here, we'll detail a client-side solution using an extended HTML Element for implementation.

To maintain good SEO rankings, provide the machine-readable time as a default value in the `time` element. When the page loads, you can use the browser's location language settings to format the value according to typical formats for that language and replace the pre-rendered technical value.

The browser's `Intl` namespace, which aids in internationalization, makes it easy to format dates and times into user-expected formats.


Usage example:

```html
<time is='my-time' datetime=${...}>${...}</time>
```

Enhanced HTML elements require a class implementing the functionality while keeping the original tag name. The `is` attribute tells the browser to look for the specific class, which is registered using the custom control API. The options parameter must specify which element implementation serves as the base class.


## Extended functionality and attributes

The time element will modify the shown value by using the machine readable value from the datetime attribute and the user preferred formatting.
Formatting is done by using `Intl.DateTimeFormat` with options.

{% termlist %}

{% term "datetime" %}
  The time element will get the date and/or time value as usual through the datetime attribute. This should be a ISO formatted value.
{% endterm %}

{% term "dateStyle" %}
The format of the date part. The valid options that can be given are "full", "long", "medium" and "short".
{% endterm %}

{% term "timeStyle" %}
The format of the time part. The valid options that can be given are "full", "long", "medium" and "short".
{% endterm %}

{% endtermlist %}
