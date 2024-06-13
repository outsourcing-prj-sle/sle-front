<template>
  <div
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
    @click.self="closePopup"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  setup(props, { emit }) {
    const closePopup = () => {
      emit('closePopup');
    };
    return { closePopup };
  },
};
</script>

<style>
/* Footer 스타일 */
</style>
