---
layout: article
title: "SVG Animation: Draw me like one of your french girls"
date: 2014-06-13 10:00:00
category: coding
---

##How to: SVG self-drawing effect

The recent time I always see animated SVGs around the web. It looks awesome, yet can't be easy. That's what I thought first and every time I saw these animations I was like:

--checks out new pens on [CodePen.io](http://codepen.io/MyXoToD)--<br />
"Oh lala! How did you do that with CSS/JS"<br />
--checks out the source code--<br />
"Argh, it's SVG..."<br />
--facepalm--<br />
"HOW AM I SUPPOSED TO SEE HOW THIS WORKS WHEN IT LOOKS LIKE CYBER SPACE CRYPT SHIT?!"

Okay Max, calm down. The other day I couldn't take the shit any more. I tried, I failed, I tried, I failed. But then I got it and I realized how easy it is. I'm going to show you how it works. You'll be impressed how easy it is.

##Step 1: The SVG

To animate a SVG we oviously need one. So go ahead and open an existing one or open GIMP/Incscape/Photoshop or whatever to make a new one. Since I'm on a Linux I'm going to use Gimp. Let's open a new document:

![SVG1](/assets/images/posts/svg-1.png)

First select the `Paths Tool` and then open the `Paths Dialog`:

![SVG2](/assets/images/posts/svg-2.png)

Now we're ready to draw some crazy shit. It's not needed to draw something yourself. You could open an existing image an draw paths all around it (I'm going to show you some example at the end of this tutorial).

![SVG3](/assets/images/posts/svg-3.png)

This ain't a masterpiece but it should to the trick for now. All the lines you can see are only paths. This is very important, it must be paths! You don't need to fill anything.

##Step 2: There's this'n' that way

You can now choose if you want more or less control of the animation. As you can see every structure in my vector graphic has it's own layer (ground, house, tree and sun). If you want more control, your can export it like this because you can add different effects to each path. For this tutorial I'm going to merge all the layers for the sake of easiness. You'll realized yourself what is possible once we're done.

Now rightclick on the path layer and choose `Export path...`. Choose a destination and name it. In my case `hood.svg`. Don't forget the `.svg`. You can now open the SVG file in your favorite text editor.

##Step 3: The Animation

Copy/Paste the SVG code into your HTML page. You'll get something like this by default:

<p data-height="328" data-theme-id="2438" data-slug-hash="ydCej" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/MyXoToD/pen/ydCej/'>SVG Tutorial Demo #1</a> by Max (<a href='http://codepen.io/MyXoToD'>@MyXoToD</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

Inside your SVG code you can find these attributes on each `path`:

    fill="none" stroke="black" stroke-width="1"

Remove them. We're going to add everything with CSS. If you remove this from every `path` you should see a blank screen.
Let's add some CSS to it:

```css
path {
  fill-opacity: 0;
  stroke: #000;
  stroke-width: 3;
  stroke-dasharray: 0;
  stroke-dashoffset: 0;
}
```

The important rules for the animation are `stroke-dasharray` and `stroke-dashoffset`. The first one declares the width of the border dashes (by default it's 0 to create a solid border/stroke). Our goal is to make **ONE DASH** as long as the whole SVG path. Increase both numbers step by step until the screen is blank again (make sure to start with small steps). It's very important that both numbers are the same:

```css
path {
  fill-opacity: 0;
  stroke: #000;
  stroke-width: 3;
  stroke-dasharray: 870;
  stroke-dashoffset: 870;
}
```

In my case the total stroke length of the path is approximately 870. You could also use Javascript to get the total stroke length:

```javascript
var path = document.querySelector('.path');
var length = path.getTotalLength();
```

Let's go on with the CSS animation:

```css
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
```

Yep, that's all. All we need to do is animate the dashoffset back to 0. Easy huh? Apply it to the path like this:

```css
path {
  fill-opacity: 0;
  stroke: #000;
  stroke-width: 3;
  stroke-dasharray: 870;
  stroke-dashoffset: 870;
  animation: draw 20s infinite linear;
}
```

This should be the result:

<p data-height="328" data-theme-id="2438" data-slug-hash="FcxuL" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/MyXoToD/pen/FcxuL/'>SVG Tutorial Demo #2</a> by Max (<a href='http://codepen.io/MyXoToD'>@MyXoToD</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

I hope this was helpful and easy to understand. Just test it a little bit and you'll see how easy it is.

##Examples I made:

These animations only run once. Click "Return" in the lower right corner.

<p data-height="205" data-theme-id="2438" data-slug-hash="eKbgC" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/MyXoToD/pen/eKbgC/'>eKbgC</a> by Max (<a href='http://codepen.io/MyXoToD'>@MyXoToD</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

<p data-height="360" data-theme-id="2438" data-slug-hash="vBlfs" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/MyXoToD/pen/vBlfs/'>Self drawing Xbox One (SVG Animation)</a> by Max (<a href='http://codepen.io/MyXoToD'>@MyXoToD</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

<p data-height="562" data-theme-id="2438" data-slug-hash="frpkI" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/MyXoToD/pen/frpkI/'>Draw me like one of your french girls.</a> by Max (<a href='http://codepen.io/MyXoToD'>@MyXoToD</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>