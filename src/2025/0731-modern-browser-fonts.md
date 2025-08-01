---
title: Fonts for the Modern Mode
created: 2025-07-31
modified: 2025-07-31
image: "/2025/fonts.jpg"
imageAlt: "Layered Architecture with data layer"
tags: 
  - "ModernMode"
description: >
  Many articles on the internet about using fonts in web applications are missleading or outdated.
---

Much of the information available online about hosting fonts is outdated or even wrong. And wrong information leads to poor implementation.

**It's 2025. WOFF2 is the standard.**

This allows us to keep things simple.


## The State of Font Files

When looking for examples on how to use fonts without relying on a CDN, I found a lot of outdated advice and implementations.

As of 2025, the Web Open Font Format 2 (WOFF2) is recommended and supported by all major browsers.  See
<https://caniuse.com/woff2>.  WOFF2, developed by Google, is an improvement over the original WOFF format, offering
smaller file sizes and better performance for modern browsers.

WOFF2 is also supported by the versions of Windows 10 and 11.


## Avoid Using CDNs

CDNs are often suggested as a way to serve font files from a central server rather than your own domain.

However, CDNs come with several issues:

* CDN servers may be blocked in corporate environments with strict security policies.
* Some hosting environments may not allow you to set CORS headers for your server.
* Some CDNs serve both fonts and JavaScript files, requiring careful CORS configuration for font files.
* You must trust the CDN provider to deliver exactly what you expect.
* CDNs can be compromised, potentially serving malicious code.
* CDNs can collect data about your browsing behavior, even in private mode.

To serve fonts from your own server, download the font files and create your own `@font-face` definitions. You can include older formats if needed.

## @font-face Definitions

To include a specific font, start with a `@font-face` definition in your CSS:

``` css
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300 800;  /* supports variable font weight range */
  font-display: swap;    /* prevents FOIT, shows fallback font until load */
  src: url('/fonts/OpenSans-VariableFont.woff2') format('woff2-variations');
}
```

## Using the Font in Elements

Typically, the main font is set on the `body` element and inherited by all descendant elements (with some exceptions).
It's good practice to include fallback fonts that closely match your primary font.

``` css
body {
  font-family: 'Open Sans', ui-sans-serif, sans-serif;
  font-weight: 400;  /* any weight between 300-800 */
}
```

## Tips and Observations

When searching for a font (such as "Open Sans"), always get it from the official source and review the license.
Many sites offer "converted" fonts or unofficial file formats.

For "Open Sans," use <https://fonts.google.com/selection> or the official GitHub repository at
<https://github.com/googlefonts/opensans> instead of third-party sites like <https://fonts2u.com>.

Some sources claim WOFF2 fonts are smaller, but you may find the WOFF2 file is the largest.  This is often because
variable fonts include many character variations, eliminating the need for separate files for bold or extra-bold
variants.  Sometimes, italic styles are separate files.  Add up all file sizes before comparing.

If your server has size or network restrictions (such as on IoT devices), just use the standard "sans-serif" font and accept the less-than-perfect design.

## See Also

* <https://medium.com/variable-fonts>
* <https://variablefonts.io/>
* <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide>
* <https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS>
* <https://gist.github.com/sergejmueller/cf6b4f2133bcb3e2f64a>

* [Can I use...](https://caniuse.com/)
* [MDN Web Docs](https://developer.mozilla.org/de/)
* [Modern Mode in Vue](https://cli.vuejs.org/guide/browser-compatibility.html#modern-mode)
