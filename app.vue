<template>
  <div>
    Hi <Icon name="uil:github" /> {{ $t('welcome') }}
    <gdiWindow>this is a slot</gdiWindow>
    <gdiWindow>this is another slot here</gdiWindow>
    <img class="fixed right-5 bottom-5 w-64 pointer-events-none" src="~/public/kittea.png" />
  </div>
</template>

<script lang="ts">
  import gdiWindow from './components/gdiWindow/gdiWindow.vue';
  export default {
    components: {
      gdiWindow
    }
  }
</script>