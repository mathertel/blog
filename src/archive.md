---
title: Archived Posts
layout: base
eleventyExcludeFromCollections: true
---

{% for post in collections.posts reversed %}

  {% capture lastDate %}{{ post.data.modified | date: "%Y-%m-%d" }}{% endcapture %}

  {% if post.data.outdated or lastDate < archiveDate %}

  [{{ post.data.title }}]({{post.url}})
  <span style="color:red">TOO OLD !</span>

  {% endif %}

{% endfor %}
