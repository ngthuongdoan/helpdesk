<template>
  <div class="mobile">
    <div>
      <h1>Sorry we are not support mobile devices</h1>
      <h4>Please use our app</h4>
    </div>
  </div>
</template>

<style lang="scss">
.mobile {
  width: 100%;
  height: 100vh;
  background: white;
  text-align: center;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
  h1 {
    font-size: 8vw;
  }
  h4 {
    font-style: italic;
    font-weight: 400;
    color: rgb(77, 77, 77);
    font-size: 4vw;
  }
}
</style>