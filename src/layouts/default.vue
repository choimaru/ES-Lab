<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="sidebar">
      <div>
        <div class="logo">
          <NuxtLink to="/" class="not_a_style">
            <img src="~/assets/icons/round_flask_white.svg" width="24px" height="24px" alt="logo" />
            EC-Lab
          </NuxtLink>
        </div>
        <SideMenu />
      </div>
      <footer class="footer">© {{ new Date().getFullYear() }} EC-Lab</footer>
    </div>
    <div class="content">
      <header class="header">ログアウト</header>
      <main class="main">
        <slot />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 160px;
  padding: 8px 0;
  color: #fff;
  background-color: #36424c;
}

.logo {
  padding-left: 16px;
}

.not_a_style {
  color: #fff;
  text-decoration: none;
}

.content {
  flex: 1;
}

.header {
  display: flex;
  align-items: center;
  justify-content: right;
  height: 40px;
  padding: 16px;
  background-color: #ededed;
}

.main {
  min-width: 700px;
  min-height: calc(100vh - 40px);
  padding: 16px 24px;
  padding-bottom: 40px;
  background-color: #f7f7f7;
}

.footer {
  padding: 32px 16px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: smaller;
  font-style: italic;
  color: #ccc;
}
</style>
