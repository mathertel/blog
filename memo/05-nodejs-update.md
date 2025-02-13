---
title: Keep node.js and libraries up to date
created: 2025-01-24
modified: 2025-01-23
tags: ["blog", "eleventy", "nodejs"]
---

There are two levels. Off set. Where we need to investigate to keep our system up to date.

First, the node JS runtime at SDK requires updates from time to time either because. There are bug fixes. Or when? The node JS long time support version gets outdated.

Then we have included several libraries. From the nodejs repositories. To automate our tasks. Or build services. For our web applications. These must be updated. From time to time because the authors update  Their code to Fix topics To fix topics  Or enrich functionality. This is typically done by using the Node Package Manager (NPM) That offers some useful commands.

## Update the Node.js Runtime

To update the nodejs runtime.  To the current version, just reinstall the version from the official website.
Instructions on that can be found in the articles
[Set Up the LTS Version of Node.js on a Windows 11 Computer](../src/2025-01-eleventy/02-setup-win-nodejs.md) and
[Set Up the LTS Version of Node.js on a Linux Computer](../02-setup-linux-nodejs.md)

## Find Broken Libraries

Sometimes existing libraries contain bugs.

When these bugs are rated as security issues, it is important to update to a fixed version as soon as possible. This is especially important when the library is part of your service implementation that is available on the Internet.

Just use the command window in the root of your project and type. `npm audit`.

When everything is in good shape, you just get the answer:

``` txt
found 0 vulnerabilities
```

Otherwise you will get a list of instructions. On how to update the listed Library. When you have a complex poll checked, you possibly will find that situation sometime. And have to fix it as soon as possible. This is especially important because many libraries include other libraries as dependencies and when. There is. A security. Fix required for one of the often used libraries. All dependent libraries will show up as well. Add need to be fixed.

Here's an example of a possible output. In case audit issues have been found:

``` txt
>npm audit  
# npm audit report

postcss  <8.4.31
Severity: moderate
PostCSS line return parsing error - https://github.com/advisories/GHSA-7fh5-64p2-3v2j
fix available via `npm audit fix`
node_modules/postcss

1 moderate severity vulnerability

To address all issues, run:
  npm audit fix
```

In case there is a simple bug fix version available, the command `npm audit fix` will do the job:

``` txt
>npm audit fix

changed 1 package, and audited 5 packages in 1s

2 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

In case there is no simple bug fix version available, things become complicated because you may have to update to a non-compatible version or even switch to another library for the same task. There is no general way to solve these problems, but you can refer to the following texts for guidance.

## About SEMVER

Node, JS libraries come with version numbers that have a special meaning and is crucial for managing dependencies:

Semantic Versioning (SEMVER) is a versioning system that uses a three-part number format: `MAJOR`.`MINOR`.`PATCH`.

* `MAJOR` -- Breaking changes
* `MINOR` -- New features, no breaking changes
* `PATCH` -- Bug fixes

It helps to understand the impact of changes in new releases, where MAJOR versions introduce breaking changes, MINOR versions add new features without breaking existing functionality, and PATCH versions include bug fixes.

## Find Outdated Libraries

The node package manager offers a simple command to check all your installed libraries. Whether there are updates available? Just use the command window in the root of your project and type `npm outdated`.

``` txt
>npm outdated
Package            Current  Wanted  Latest  Location                        Depended by
stylelint-scss      6.10.0  6.10.1  6.10.1  node_modules/stylelint-scss     WebFiles
typescript-eslint   8.20.0  8.21.0  8.21.0  node_modules/typescript-eslint  WebFiles
```

**Red** means there's a newer version matching your semver requirements, so you should update now.

**Yellow** indicates that there's a newer version above your semver requirements (usually new major, or new 0.x minor)
so proceed with caution.

You will see red and yellow. Library names in that list.

The red ones can be updated, usually without any trouble.  Because they are just fixes to the current.  Implementation
of the functionality.  And not changing.  Any dependencies or interfaces.  Many libraries support fixes even for.
Library versions that are.  Already replaced by a new major or minor version.  This is especially important to include
bug fixes.  That are security relevant and can be updated by simply using the `npm audit fix` or `npm update` command.

The yellow lines show updated libraries where major or minor changes have been implemented.

## Fix the Libraries by applying Patches

An easy step to fix your current local libraries is to use the NPM tool, which offers the update functionality for
available patches.  The authors of libraries typically increment the third part of the version, known as the patch
level, only when existing functionality needs to be fixed, but no dependencies or changes in the behavior of the library
are implemented.

Just use the command window in the root of your project and type `npm update`.

``` cmd
npm update
```

The command reports a summary of the applied changes.


## Fix the Libraries by applying Minor and Major changes

Minor versions add new features without breaking existing functionality, while major versions may introduce breaking
changes.  To update to the latest minor and major versions, you can use:

``` sh
npm install \<library-name\>@latest
```
