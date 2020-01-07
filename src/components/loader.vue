<template>
  <div class="loader">
    <div class="loader__circle"></div>
  </div>
</template>

<script>
export default {
  name: 'loader'
}
</script>

<style lang="scss" scoped>
.loader {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &__circle {
    $circle: 1px solid #f00;

    height: 20px;
    width: 20px;
    border-radius: 100%;    
    border: {
      top: $circle;
      left: $circle;
      rigth: $circle;
    };
    margin: 20px;
    animation: rotate 6s infinite;

    @keyframes rotate {
      0% {
        transform: rotate(0)
      }
      33% {
        transform: rotate(120deg)
      }
      66% {
        transform: rotate(240deg)
      }
      100% {
        transform: rotate(0)
      }
    }
  }
}
</style>