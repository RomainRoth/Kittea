<template>
  <div>
    Hi <Icon name="uil:github" /> {{ $t('welcome') }}
    <gdiWindow>this is a slot</gdiWindow>
    <gdiWindow>this is another slot here</gdiWindow>
    <pgmExplorer />
    <img class="fixed right-5 bottom-5 w-64 pointer-events-none" src="~/public/kittea.png" />
  </div>
</template>

<script lang="ts">
  import gdiWindow from './components/gdiWindow/gdiWindow.vue';
  import pgmExplorer from './components/pgmExplorer/pgmExplorer.vue';
  export default {
    components: {
      gdiWindow,
      pgmExplorer
    }
  }
</script>