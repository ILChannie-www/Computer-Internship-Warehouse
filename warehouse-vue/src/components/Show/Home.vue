<!--This page is used to introduce the navigation bar-->
<template>
  <div>
    <NavMenu></NavMenu>
    <router-view/>
  </div>
</template>

<script>
import NavMenu from '@/components/common/NavMenu'
export default {
  name: 'Home',
  components: {NavMenu}
}
</script>

<style scoped>

</style>
