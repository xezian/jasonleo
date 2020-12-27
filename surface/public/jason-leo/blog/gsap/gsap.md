# GreenSock it!

I have a simple svg of a hand, as a nav link next to the word "Hi". I want to try and animate it as a fun effect when you click the option.  I will be using the [GreenSock](https://greensock.com) animation library for this. Here goes:

existing code
```js
methods: {
    hiFive() {
        alert("hi five")
    },
    ...
}
```

So first I install GreenSock: `npm install gsap`


Now to set up the element with some css...I want it to be hidden at first but in the center of the page. I can accomplish this very simply with `display: grid`, and `opacity: 0`. 

OK this does put it where I want it, but it's now invisibly gotten in the way of most of my clickable elements throughout the website. So... I will solve this using a vue conditional. I set `hiFivin` as a boolean up for this.

```js
 <HelloIcon v-if="hiFivin" id="hi-five" fill="#eaf2ff" />
```

And after playing around some with chained `.to()`s off the `timeline()` object, adding another ref with some text to drive the point home, and making some adjustments to duration and steps, I have a simple animation I'm happy with. You can test it by clicking the "Hi" button in the nav. And here is the final code:

## Vue `<template>`:
```js
<div v-show="hiFivin" class="hi-five-area">
    <div>
        <div ref="hifive" class="hi"><h1>Hi 5!</h1></div>
        <HelloIcon ref="fiver" fill="#eaf2ff" />
    </div>
</div>
```

## JavaScript:
```js
methods: {
    hiFive() {
      if (!this.hiFivin) {
        this.hiFivin = true
        const tl = gsap.timeline({
          onComplete: () => {
            this.hiFivin = false
          },
        })
        tl.to(this.$refs.fiver, {
          opacity: 0.6,
          duration: 0,
        })
          .to(this.$refs.fiver, {
            scale: 300,
            duration: 0.7,
          })
          .to(this.$refs.hifive, {
            opacity: 1,
            scale: 10,
          })
          .to(this.$refs.fiver, {
            scale: 1,
            duration: 0.3,
          })
          .to(this.$refs.hifive, {
            opacity: 0,
            scale: 3,
          })
          .to(this.$refs.fiver, {
            opacity: 0,
          })
      }
    },
}
```

## CSS:
```css
.hi-five-area {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  z-index: 1;
}
.hi {
  position: absolute;
  opacity: 0;
  color: #0c4549;
}
#hi-five {
  position: absolute;
  max-height: fit-content;
  opacity: 0;
}
```