<script setup lang="ts">
type Props = {
  title: string;
  list: string[];
};

const props = defineProps<Props>();
</script>

<template>
  <Transition>
    <div class="error_message" v-if="props.list.length !== 0">
      <div class="error_title">
        <IconAlert />
        <p>{{ title }}</p>
      </div>
      <div>
        <ul>
          <li v-for="(message, index) in list" :key="index">{{ message }}</li>
        </ul>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.error_message {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  margin-top: 16px;
  font-size: 12px;
  background-color: #f9eded;
  border: 2px solid #ec0000;
  border-left-width: 12px;

  li {
    padding: 3px 0;
    margin-left: 56px;
    list-style-type: disc;
  }
}

.error_title {
  display: flex;
  gap: 16px;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
