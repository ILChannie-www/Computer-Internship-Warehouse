<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      router
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="home">Home</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Manage</template>
        <el-submenu>
          <template slot="title">Warehosue</template>
          <el-menu-item index="house" v-for="item in warehouseData" :key="item.id">{{item.warehouseId}}
            <child :warehosueId="item.id"></child>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="worker">Worker</el-menu-item>
      </el-submenu>
      <span style="position: absolute;padding-top: 20px;right: 40%;font-size: 20px;font-weight: bold">Start Managing Your Warehouse</span>
      <el-submenu index="3"  style="position: absolute;right: 0%">
        <template slot="title">  Personal Information  </template>
        <el-menu-item index="3-1">Access</el-menu-item>
        <el-menu-item index="3-2">Change</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        warehouseData: [],
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    mounted: function () {
      this.getWarehouse()
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      getWarehouse () {
        let uname = this.$store.state.user.username
        var _this = this
        this.$axios.post('/getWarehouseId', {id: uname}).then(resp => {
          if (resp && resp.status === 200) {
            let result = resp.data
            result.forEach(element => {
              _this.warehouseData.push({warehouseId: element})
            })
          }
        })
      }
    }
  }
</script>
