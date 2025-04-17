---
title: Data binding in Web components
created: 2025-04-17
modified: 2025-04-17
image: "/2025/0417-sfc-data.png"
imageAlt: "Layered Architecture with data layer"
tags: 
  - "sfc"
description: >
  Using data in a web application that uses web components is an art on its own.  Many of the current application
  frameworks support data bound UI by supporting a common data layer and mechanisms to interact with this data.
---

Again size matters as the SFC framework was also created to support environments with massive size restrictions like IoT
Devices where the total file size for the web application needs to fit into about 1 MByte or less.

Here a minimal but extendable approach is implemented to create component based frontend applications that can deal with
structured data without the burden of full fledged and feature rich frameworks like RxJS that require > 100 kB of
scripts.

## Background and Why

The implementation can be found in [data-hub.ts](https://github.com/mathertel/sfc/blob/main/src/data-hub.ts) on GitHub
and is part of the [Single File Components (SFC) project](https://github.com/mathertel/sfc/) framework.  It can be
loaded into the client independently from the sfc loader as a ESM module.

The patterns used as a data-layer for web applications today mostly use a variation of reactive programming.  The data
layer that can store data, that the data model is accessible by components and that data changes trigger activities.

* Subscribers do not need to know the publishers.
* Participants can get or change the data fragment they need.
* Synchronous or Asynchronous -- not really noticeable to the user.

Both, the **Observer Pattern** and **Publish / Subscriber Pattern** are resulting in event driven implementations that
differ in the underlying technical implementation but not much in the logic that needs to be implemented.

Using a simplified Publish/Subscriber implementation for loosely coupled, event driven interfaces was chosen over a well
known non-native Observer implementation was chosen for size reasons.

<!-- See [Data Layer](#data-layer) and [Data Binding](#data-binding) -->


The functionality that comes with the data store (all of this decoupled behind an appropriate API) that supports all of
the above and includes also the **detection of change** to avoid useless updates, messages and infinity loops.  

In many cases data is not flat but has a structure that fits to the problem.  Imagine an application with presents data
in tables (array) or multiple forms or cards (structure).


## Client Side Architecture

The following picture illustrates how the data enabled custom components integrate with HTML elements and the data layer
including the data hub and the data storage implementation.

![Client Side Architecture](./0417-sfc-data.drawio.svg)

In the Custom Element Classes the **Data Binding** to the HTML elements is implemented by reading and writing attributes
like shown values or style attribute changes.

Changes in the data and user interactions events will trigger callbacks that can be scoped to parts of the overall data
model in the subscriber call.  This will result in an event driven implementation of the display logic and can be
combined with a declarative approach to bind the relevant data attributes.


### Data Layer

The data layer covers the responsibility for storing structured data, data changes and the related change events but
also acts as a universal usable data storage for structured data.

It implements:

* Maintaining the registered subscribers by using the `subscribe()` function with their scope conditions.
* Updating the data using the `publish()` function and merge the new data into the stored structured data.
* Storing the updated structured data into a Web Storage to survive browser navigation and refreshes.
* Detecting the changes on attribute level and `callback` the relevant subscribers with the data objects.
* The complete or partial data storage can be retrieved using the `get()` function.
* The `replay()` function will again publish all data objects of a given path useful for UI components that are created
  after the data has been assembled.


<!-- 
* [text](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
* [text](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)
 -->


## Data Binding

Implementing components therefore should include some parameters or declarative attributes to bind to specific data
attribute(s).  What a component does with this information is usually obvious:

* **Output** -- HTML components will display data items.
* **Input** -- HTML components will display and enable changing of a data items.
* **Transformation** -- Scripts that will react on data changes and apply some logic.
* **Communication** -- Scripts that will transport data from devices to servers and back.


<!--
in some of the frameworks there is a special notation to do data binding
like `{prop}`, `{{prop}}` or `{{"{% =prop %}"}}` that allow easy
scanning of templates on the textual level as a non-HTML syntax is used.

The **Data binding Pattern** when implemented in the browser on HTML elements can benefit from the `dataset`
implementation where the `data-***` attributes can be used.

Data Binding in the HTML world using client side mechanism is also implemented by using the dataset attribute that is available
on all HTML Elements.

Elements that like to receive leaf level attributes from a structured data set can declare the name (and path) of the attribute
and implement the presentation. -->

<!-- ### Output binding

`<element data-value="66" data-display="none">...</element>`

`<div data-path="node-path"> ... </div>`

-->

### Input binding


## See also

* What is the difference between the Observer Pattern, Publish/Subscribe, and Data Binding?
  <https://stackoverflow.com/questions/15594905/difference-between-observer-pub-sub-and-data-binding>
* [Implementing the Pub/Sub Pattern in JavaScript](https://medium.com/@ignatovich.dm/implementing-the-pub-sub-pattern-in-javascript-a-guide-for-beginners-44714a76d8c7)
* [The Observer pattern in NODE.JS](https://medium.com/@RomarioDiaz25/the-observer-pattern-2562c23894d3)
* [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)


<!--
 
@example
```typescript
const hub = new DataHub();

// Subscribe to all temperature readings
hub.subscribe("/device/*/temperature", (path, key, value) => {
  console.log(`Temperature update: ${value}`);
});

// Write a value
hub.write("/device/sensor1/temperature", "23.5");
```

 -->