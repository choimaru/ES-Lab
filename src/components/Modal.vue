<script setup lang="ts">
type Props = {
  title: string;
};

type Emit = {
  'on-callback': [];
};

const props = defineProps<Props>();
const emit = defineEmits<Emit>();
const modal = ref<HTMLDialogElement | null>(null);

function openDialog() {
  if (modal.value) {
    modal.value.showModal();
  }
}

function closeDialog(event?: MouseEvent) {
  event?.preventDefault();
  if (modal.value) {
    modal.value.close();
  }
}

function handleOutsideClick(event: MouseEvent) {
  if (modal.value) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.closest('#modal') === null) {
      closeDialog(event);
    }
  }
}

function onDelete(event?: MouseEvent) {
  emit('on-callback');
  closeDialog(event);
}

defineExpose({
  openDialog,
});
</script>

<template>
  <dialog ref="modal" @click="handleOutsideClick">
    <div class="modal" id="modal">
      <div class="message">
        <h3 class="title">{{ title }}</h3>
        <slot></slot>
      </div>
      <div class="buttons">
        <ButtonDelete variant="primary" size="m" @on-delete="onDelete" />
        <ButtonClose size="m" @on-close="closeDialog" />
      </div>
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 35rem;
  padding: 40px 56px;
}

.message {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
