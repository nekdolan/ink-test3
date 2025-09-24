<script setup>
const props = defineProps(['src', 'alt']);
</script>
<template>
  <nuxt-img
      :src="props.src"
      :alt="props.alt || ''"
      format="webp"
      densities="1x"
      class="_image:responsive"
  />
</template>