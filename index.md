---
layout: default
bodyclass: home

seoTitle: RhythmKit - A boilerplate for devs that care about setting type.
seoDescription: Vertical Rhythm, Element queries and awesomizing

featureImg: artwork-013.jpg
featureStatement: ART WORKS FOR YOU

title:
subtitle: St. Louis ArtWorks is AWESOME!

unique-cta:

mega-cta-img:
mega-cta-heading:
mega-cta-button-text:
mega-cta-button-text-url:

reveal: programs
---
{::options parse_block_html="true" /}
<div class="copy" max-width="600px" style="position: relative;">

## Web type-setting tools for designers and devs that obsess over type
{: .copy__headline}

Setting type to a baseline grid is wicked fucking hard online. So many things throw it off. Even our web type god, Jason Santa Maria, wrote an article, [Baseline Grids on the Web](http://jasonsantamaria.com/articles/baseline-grids-on-the-web) that ignores this practice. But we can do it! Many people have figured out parts of this problem. Now it's time to put all of this knowledge in one place. Let's just f*cking get to it, I'll explain it all later.

## First, we need a baseline grid to manage vertical rhythm
{: .copy__headline}

The best baseline grid I've found is this simple collection of scss from [Jacob-E](http://codepen.io/jakob-e/pen/zxBBBP/) on Codepen. This guy is f*cking smart. I've modified it only a pinch.

### Sass

{% highlight scss linenos %}

  // Variables
  $line-height : 1.5;
  $base-font-size: 20px;
  // Round to the closes integer. There are no fractional pixels!
  $baseline-height: round($base-font-size * $line-height);

  // Baseline grid line
  $baseline-color : rgba(magenta, 0.1);

  html {
    // Enable REM usage, and set a base font size throughout the site
    font-size: $base-font-size;
  }

  body {
    // Set line-height to be inherited throughout the site
    line-height: $line-height;
    background-image: linear-gradient(transparent, transparent $baseline-height - 1px, $baseline-color 1px);
    background-size : auto $baseline-height;
  }

{% endhighlight %}

This draws a vertical grid using a linear gradient. So simple. No need for any images or JavaScript. So now we have a *simple* tool for checking our content against a baseline grid.


## Whole numbers only, no f*cking fractions
{: .copy__headline}

A baseline is set once ( baseline = html font-size * body line-height). As long as the baseline is a whole number, it will always create the correct baseline height. I use Sass' [round() function](http://sass-lang.com/documentation/Sass/Script/Functions.html) to make this work.

As a pixel goes—it can't be split into 10ths. All of our wicked percise settings like 2.3456em, 1.1822rem or 65.34256% have to be rendered into pixel values. And there is no such thing as 100.723px. There isn't even a 100.7px. I made a couple *pens* about this.

<div class="snap one">
  <p data-height="520" data-theme-id="9915" data-slug-hash="9f37a46f24339c34608982a981fa5681" data-default-tab="result" data-user="solvm" class='codepen'>See the Pen <a href='http://codepen.io/solvm/pen/9f37a46f24339c34608982a981fa5681/'>Coding with fractions will yield varying results</a> by SOLVM (<a href='http://codepen.io/solvm'>@solvm</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
  <script async src="//assets.codepen.io/assets/embed/ei.js"></script>
</div>

This is what you actually get when you try to use fractions of a pixel. This one major reason why setting web type to a baseline grid has been soooo f*cking hard.

## F*cking images, embeds, videos and forms
{: .copy__headline}

We have beaten the fractional pixel issues by using whole numbers, now we have images, embeds, videos and forms to deal with. Again, Jacob-E demonstrates how to get around this in his [Snap to baseline](http://codepen.io/jakob-e/pen/zxBBBP/) pen using [ElementQueries.js and ResizeSensor.js from MarcJ](http://marcj.github.io/css-element-queries/). Yes! Element Queries! MarcJ is wicked f*cking smart as well.


<form>
<div>
<label for="name">Name:</label>
<input type="text" id="name" name="user_name" />
</div>
<div>
<label for="mail">E-mail:</label>
<input type="email" id="mail" name="user_email" />
</div>
<div>
<label for="msg">Message:</label>
</div>
<div>
<textarea id="msg" name="user_message"></textarea>
</div>

<div class="button">
<button type="submit">Send your message</button>
</div>
</form>


I've wrestled with this for YEARS, and I've learned that setting web type sucks. Even our own web type hero, Jason Santa Maria, worte an article about  [Baseline Grids on the Web](http://jasonsantamaria.com/articles/baseline-grids-on-the-web)

[Baseline grid or modular scale? Both? Neither?](http://branch.com/b/baseline-grid-or-modular-scale-both-neither)

### Here's the problem:
{: .copy__subhead}

1. one
1. two
1. three

<p class="cplz">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu.</p>
<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu.</p>


### No rules—just tools

<div class="snap one">
![Bidos](https://s3-us-west-2.amazonaws.com/s.cdpn.io/68939/minions_960.jpg)
</div>

  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu.</p>

  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu.</p>

[Baseline Grids on the Web](http://jasonsantamaria.com/articles/baseline-grids-on-the-web)

</div>
