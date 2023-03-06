<!--Refresh other page using this blank page-->
<template>

</template>

<script>
export default {
  name: 'Back',
  mounted: function () {
    this.goBack()
  },
  methods: {
    goBack () {
      this.$router.replace('/house') //As soon as open this page, go back to house page to refresh house page
    }
  }
}
</script>

<style scoped>

</style>
