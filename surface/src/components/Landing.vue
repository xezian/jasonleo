<template>
  <div class="landing-container">
    <div class="background-gradient"></div>
    <div class="foreground-gradient"></div>
    <div class="section section-header left">
      <h2>Hello, friend</h2>
      <h3>My name is Jason Leo</h3>
      <div class="right">
        <h4>I am a web developer</h4>
        <h5>And this is my website</h5>
      </div>
    </div>
    <div class="section section-header yellow circle"></div>
    <div class="section section-body middle blue diamond"></div>
    <div class="section section-body bottom red square"></div>
    <div class="section section-body middle right">
      It is great my privilege to share with you this. Maybe today we will
      imagine the unimaginable.This is an exploration of the wilderness of world
      wide webcraft. Also a demonstration in as ambitious a way as I can aspire,
      of what I am doing with these neo-digital incantations. This spellcraft of
      a sort. These illusions of the liquid crystal dispay.
    </div>
    <div class="section section-body bottom left">
      In these times, in this context, I feel fortunate. The long drawn breath
      of pause I reminded myself of, has come to settle, in a curve of light,
      beside my table. As long as I am able to stop looking, you are within
      reach.
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="postcss" scoped>
.landing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 3200px;
}
.background-gradient {
  position: fixed;
  background: linear-gradient(to top, #e485c7, #147b83);
  width: 90%;
  height: 3200px;
}
.foreground-gradient {
  position: fixed;
  background: linear-gradient(to top, #147b83, #e485c7);
  width: 80%;
  height: 3200px;
}
.section {
  position: fixed;
  top: 20%;
  width: 50%;
}
.section-header {
  font-size: 2.5em;
}
.middle {
  margin-top: 100vh;
}
.bottom {
  margin-top: 200vh;
}
.section-body {
  font-size: 3em;
  line-height: 2em;
}
.circle {
  right: 6em;
  border-radius: 50%;
  width: 20vw;
  height: 20vw;
}
.diamond {
  left: 6em;
  width: 30vw;
  height: 30vw;
  transform: rotate(45deg);
}
.square {
  right: 6em;
  width: 25vw;
  height: 25vw;
}
.blue {
  background-color: #90c9ff94;
}
.yellow {
  background-color: #f4ff9094;
}
.red {
  background-color: #ff909094;
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
</style>
