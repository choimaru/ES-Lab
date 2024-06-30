<script setup lang="ts">
const route = useRoute();

const naviList = [
  { url: '/home', name: 'ホーム' },
  { url: '/employee', name: '社員マスタ' },
  { url: '#', name: 'dummy会社概要' },
  { url: '#', name: 'dummyサービス' },
  { url: '#', name: 'dummyお問い合わせ' },
];
</script>

<template>
  <nav class="nav">
    <ul>
      <li v-for="navi in naviList" class="navi_list" :class="{ selected: route.path.startsWith(navi.url) }">
        <NuxtLink :to="navi.url">{{ navi.name }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  margin-top: 16px;
}

a {
  display: inline-block;
  width: 100%;
  color: #fff;
  text-decoration: none;
}

.selected {
  background-color: #f7f7f7;

  a {
    color: #000;
    text-decoration: none;
  }
}

.navi_list {
  padding: 8px;
  margin: 4px 0;

  &:hover {
    cursor: pointer;
    background-color: #f7f7f7;

    a {
      color: #000;
      text-decoration: none;
    }
  }
}
</style>
