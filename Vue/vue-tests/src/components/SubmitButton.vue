<template>
  <div>
    <span v-if="isAdmin">Привелегии администратора</span>
    <span v-else>Не авторизован</span>
    <button>
      {{ msg }}
    </button>
  </div>
</template>

<script>
export default {
  name: "SubmitButton",

  props: {
    msg: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>