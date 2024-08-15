+++
title = "Ken Kocienda on the simplest thing that might work"
[taxonomies]
tags = ["book", "lessons", "software", "talk"]
+++
Ken Kocienda is a software engineer and 15-year veteran of Apple. Ken worked at Apple during some of the company’s most interesting and transformative years. He joined shortly after the launch of Mac OS X, worked on key technology for the iPhone, and continued on until the launch of the iPad. He had a front-row seat to the most exciting tech product development of our time.

At Apple’s Worldwide Developer Conference in 2014, Ken delivered a presentation titled *A Strategy for Great Work*. The video recording is no longer online, which is a shame. It’s a thoughtful and unassuming reflection on some of the key lessons Ken learnt at Apple. (You can still find [the presentation slides](https://devstreaming-cdn.apple.com/videos/wwdc/2014/237xxcyp7vhx2xt/237/237_a_strategy_for_great_work.pdf) and a [text transcript](https://asciiwwdc.com/2014/sessions/237_q-kenkocienda) online).

Of all the lessons Ken shares in his talk, there’s one I think is the most important and most valuable when building software.

### The simplest thing that might work.

Ken talks about joining the team that developed the software for the original iPhone.
There were plenty of things about the original iPhone that could be defined as revolutionary, but the decision to go with a touch screen keyboard was a big change from other devices at the time. Physical keyboards were familiar, and even small QWERTY keyboards on devices like the Blackberry had proven to work well enough.

It was clear they had to stick with the QWERTY layout, but when they tested the touchscreen keyboard, it was near impossible to type accurately. The on screen keys were too small to tap accurately.

Ken was tasked with building autocorrection into the keyboard software. The keyboard had to guess which key you meant to hit. Ken’s solution was to do something simple. Every time you typed a letter, the autocorrect would look at the letters you typed previously, find all the words in a dictionary that started with those letters, and then guess the most likely letter to follow.

Ken describes this as trying “the simplest thing which might work”, and it turned out to work really well. Rather than using a more advanced statistical model (like autocorrect does now), the simple solution was performant enough to work on the hardware of the time. And each lookup was simple code, which made it easier to debug and easier to optimise.

### It doesn’t have to work. But it has to maybe work.

The simplest approach turned out to be good enough and, perhaps just as importantly, *fast enough* to make autocorrection work.

Ken didn’t know for sure that his solution would work. He might have tried it and the dictionary look-up was too slow or inaccurate. But he thought it might work, and was worth a try. He says:

*If you think from the beginning of the simplest thing that could possibly just give you what you need, go with that first.*

You can spend a lot of time thinking through all the possible problems in the project and why each solution might not work. Would a dictionary lookup be accurate enough? Maybe, maybe not. But because it was simple it was easy to try, and it turned out to be just good enough to work.

### Iterating quickly leads to better work.

When you try simple things you can try them quickly. Make it easy to try things and you can get to a better solution faster, and this leads to better work.

If trying out a solution is complicated or slow, you may find yourself reluctant to attempt another approach. You are more likely to stick with a path you’ve chosen because the cost of trying something else is too great.

Ken’s dictionary look up approach was simple enough that it might work. But it was also simple enough to try easily, and move on to the next idea if it didn’t work.

That is another lesson from his talk: *iterating quickly leads to better work*.

The whole talk is worth listening to if you can find it online. Ken later published a book, [Creative Selection](http://creativeselection.io/), which includes several of the stories from his presentation, as well as expanding on his time at Apple. I enjoyed it immensely and recommend it if you’re interested in some of the lessons from his career, or interested in a behind the scenes perspective on this period of Apple history.
