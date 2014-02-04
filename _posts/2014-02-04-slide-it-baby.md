---
layout: article
title: "Slide it baby"
date: 2014-02-04 12:32:00
category: coding
---

The recent days I started with a new presentation for a speak at one of the next Javascript conferences. I was looking for some nice slide tools online and I stumbled upon [Slid.es](http://slid.es) which looks kind of good to me. While I was satisfied with its feature I was curious to do something similar on my own. Yep, because I love to reinvent the wheel.

So the other day I was sitting in a café and created a new project called “slides-tool”, amazing name right? I should rename it soon. Anyway, I started my own minimalist slide tool. The best part: You can write your slide in markdown format. For example: You have a folder called “slides” and inside there are a couple of markdown files. Each file equals a single slide.

![Preview](/assets/images/posts/slides-preview.gif)

You can switch slides with the arrow keys or space yet. Future ideas are swipe events for mobile presentation and different slide styling. Currently all the slides are styled the same way. The whole thing is made as a jQuery plugin which can be customized by parameters.