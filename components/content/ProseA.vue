<script setup>
const props = defineProps(['href', 'title']);
const isExternal = props.href.startsWith('http');
const splitHref = props.href.split('.');
const isMedia = ['gif', 'jpg', 'jpeg', 'png', 'pdf', 'zip'].includes(splitHref[splitHref.length - 1])
</script>
<template>
  <nuxt-link v-if="isExternal || isMedia" external :to="props.href" :title="props.title" target="_blank" :key="'1_' + props.href + props.title">
    <slot />
  </nuxt-link>
  <nuxt-link v-else :to="props.href" :title="props.title" :key="'2_' + props.href + props.title">
    <slot />
  </nuxt-link>
</template>