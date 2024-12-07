<template>
  <div class="searchForm">
    <span class="search"></span>
  </div>
</template>

<style lang="scss" scoped>
.searchForm {
  position: relative;
}

.search {
  position: absolute;
  top: -16px;
  left: -16px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  background: #999;
}

.search::before {
  position: absolute;
  top: calc(50% - 9px);
  left: calc(50% - 9px);
  width: 15px;
  height: 15px;
  content: '';
  border-radius: 50%;
  box-shadow: 0 0 0 2px #fff;
}

.search::after {
  position: absolute;
  top: calc(50% + 6px);
  left: calc(50% + 2px);
  width: 8px;
  height: 6px;
  content: '';
  border-top: solid 2px #fff;
  transform: rotate(45deg);
}
</style>
