---
title: Node.js on Windows 11
created: 2025-01-19
tags: ["blog", "nodejs"]
---

{% include './toc.njk' %}

## Download and Install Node.js

Node.js is a JavaScript runtime and SDK that we need to run several tasks to build the blog website. This runtime can be downloaded from the official [Node.js Website](https://nodejs.org) in different versions.

I recommend always using the Long-Term Support (LTS) version. This version will receive fixes and updates for an extended period until it becomes outdated, typically about a year after its release.

Details on this can be found on the Node.js release page: [Node.js Releases](https://nodejs.org/en/about/previous-releases)

Click on the green "LTS" button to download the LTS version and install it. Make sure that the runtime will be available on your system by adding Node.js to the PATH.

To verify the successful installation, open any command window and type in `node -v`. The installed version should be shown.

After a few weeks or months, it is important to check that the installed version is still up to date. There might be security fixes that need to be installed on your system as soon as possible.

More on this regular task you can find on page [Keep Node and libraries up to date](../../99nodejs-update.md).


Next: [Set Up Node.js on Linux](../../memo/20-nginx-setup.md)