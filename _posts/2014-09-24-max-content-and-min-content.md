---
layout: article
title: "Playing around with max-content and min-content"
date: 2014-09-24 16:30:00
category: coding
---

In todays episode of totally not prepared blog posts we'll check out `max-content` and `min-content`. To make things easier to follow, check this out:

```html
<div class="content-wrapper">
  Some content here
</div>
```

```css
.content-wrapper {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}
```

As you can see this div should be centered. But sometimes it sucks to use a fixed width. There's no way to centered it which is quite this easy. Here comes `max-content` and `min-content`: They adjust the width on either the most narrow object within or the most wide object. You're still able to center the box with just `margin: 0 auto;` and there's no need to use `width: 100%;` anymore.

```css
.content-wrapper {
  width: max-content; /* or min-content */
  margin: 0 auto;
}
```

The only downside, it doesn't work in IE browsers (obviously) and in other brothers you still need vendor prefixes:

- `-moz-max-content` and `-webkit-max-content`
- `-moz-min-content` and `-webkit-min-content`

Here's a good example I made on CodePen:

<p data-height="521" data-theme-id="2438" data-slug-hash="BmsdI" data-default-tab="result" data-user="MyXoToD" class='codepen'>See the Pen <a href='http://codepen.io/MyXoToD/pen/BmsdI/'>Width example: max-content & min-content</a> by Max (<a href='http://codepen.io/MyXoToD'>@MyXoToD</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>