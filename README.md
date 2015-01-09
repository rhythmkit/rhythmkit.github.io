# RhythmKit

Setting type to a baseline grid in a website needs to be easier. Let's figure this shit out.

## WTF is a baseline grid

A baseline/vertical grid is a device used to layout text and content consistently on a page. Notebook paper does with lines drawn on every sheet to keep your handwirting evenly spaced from line to line. This creates a consistent *vertical rhythm* of text throughout all pages.


## The problem
There are many:


1. **General population**
    - doens't know enough about it to even give two shits
1. **Web designers and developers**
    - many of us don't know what a baseline grid is
1. **Articles**
    - there are many misleading articles about how to set type to a baseline grid online
1. **Tools**
    - there are inaccurate web tools for creating a baseline grid online
1. **Browsers**
    - browsers have a default style that space all of your content for you
1. **Resets**
    - resets don't adhere to a baseline grid (neither meyers nor normalize)
1. **Practicality**
    - it's hard to do
    - it's hard to maintain, especially after turning a site over to a client
1. **NOB (nature of the beast)**
    - does it even matter?
    - this is the web, not print


## Fucking print world

Not everything that we do with type online needs to mirror how we set type on print. For example, books have margins so ink doesn't rub of onyour fingers while turning pages. Books also have margins when additional content is intended to go there. In otherwords, [form follows function](http://en.wikipedia.org/wiki/Form_follows_function). Yes, margins **do look nice** but they also serve a practical purpose as well.

Books and magazines utilize a baseline grid to maintain the alignment of text on their matching page. You never open a book and find unbalanced text.

*EXAMPLE*

By nature, we are designed to recognize inconsistency. Mankind wouldn't have make it that far if we couldn't spot a snake in the grass or a tiger in brush.  Reading would suck if letters, lines of text, font sizes and font weights were inconsistently used throughout the page.

*EXAMPLE*

But do we even need to maintain strict vertical rhythm online? The internet isn't a book, there are no facing pages that need to be aligned. You can't view an entire webpage all at once, so you can't see where spacing is off throughout page.

For these reasons, I understand why vertical ryhthm doesn't seem to be that big of a deal online. It's good enough right?


## Fuck no!

The internet is bloated with shitty typesetting because it doesn't happen by default, and the tools and practices to make it happen easily don't exist.

This problem creates these issues in this order:

1. Design to development
    - since web designers don't design to a baseline grid, web developers have to account for all kinds of arbitrarty spacings and font sizes. There is no logic nor system to be maintained. I hate this.

1. Maintenance
    - there is no logic for maintaing the vertical rhythm in a site
    - a client is going just going to make the site worse once the start to add content on their own
1. UX
    - We end up with text that sucks to read. We will read it though, because we have too. But we aren't growing with the internet, and unlike PRINT, we are not finding ways to make reading consistent, simple and pleasant.


## So what are the rules?

I am not trying to make the calls on my own here. Fuck that. So as you weigh in, I advise you to read [The Elements of Typographic Style](http://www.amazon.com/Elements-Typographic-Style-Robert-Bringhurst/dp/0881791326) by Robert Bringhurst. This [*isn't*](https://medium.com/re-form/a-refutation-of-the-elements-of-typographic-style-3b18c07977f3) the definitive resource on typography, but it is quite popular.

Despite the practices put forth by Mr. Bringhurst, he does make this clear statement (*yes, fucking read this quote, it's important*),

> The subject of this book is not typographic solitude, but the old, well-traveled roads at the core of the tradition: paths that each of use is free to follow or not, and to enter and leave when we choose — if only we know the paths are there and have a sense of where they lead...If you use this book as a guide, by all means leave the road when you wish. That is precisely the use of  a road: to reach individual chosen points of departure. By all means break the rules, and break them beautifully, deliberately and well."


## Call to action

I want to figure this the fuck out, who else wants to collaborate on this issue?


## What I know, right or wrong

1. This is fucking hard, and it needs to be simple


## Here are the rules I follow to maintian vertical rhythm

### REMs

I want to use rems or ROOT ems. REMs are related to the font-size set on the root element of the site which is the `<html>` element, thus:

```css
html { font-size: 16px; }
```
### Preprocessors

I love JavaScript, but want to get as much of this done with CSS as possible. I use these simple Sass variables, fucntions and mixins:

```sass
// Vars
$base-font-size: 16px;
$base-line-height: 1.5;

// Funcs
@function line-height() {
    @return $base-font-size * $base-line-height;
}

// Var must be specified after returning the line-height function
$cal-line-height: line-height();
```

### Body


```sass
body {
    line-height: $base-line-height;
    background-image: linear-gradient(transparent, transparent line-height() - 1px, red 1px , transparent);
    background-size : auto line-height();
}
```

### Spacing text with margin only

```sass

@mixin type-margin($top:1, $bottom:1) {
    margin-top: $cal-line-height * $top;
    margin-bottom: $cal-line-height * $bottom;
}
```

### Spacing Block elements with padding only

```sass

@mixin block-padding($top:1, $bottom:1) {
    padding-top: $cal-line-height * $top;
    padding-bottom: $cal-line-height * $bottom;
}
```

### Image sizing

This can be done through a naming convention that css attribute selectors can recognize:

`src[*="-square"]` image-square.jpg

`src[*="-3x4"]` image-3x4.jpg

`src[*="-portrait"]` image-portrait.jpg

`src[*="-landscape"]` image-landscape.jpg

This naming convention can be applied to elements as well:

`class[*="--square"]` class="gallery-image--square"

`class[*="--3x4"]` class="banner__primary--square"

`class[*="--portrait"]`  class="article__body--portrait"

`class[*="--landscape"]` class="call-to-action__footer--portrait"


### Managing the math

I'm not a math guy.

### Cantuse

1. Don't use `<hr>` use `box-shadow`. Horizontal rules add at least a pixel of height to the page, thus throwing off the vertical rhythm. However, you can use it if you balance it's top and bottom margin.

2. I have to use the system monospaced font. I can't seem to change it.



## Learning

1. Lamb
2. Hobit
3. JS images






## JS

## Preprocessors
