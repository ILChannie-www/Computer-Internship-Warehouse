<template>
  <div>
    <div>
      <router-link to="house"><el-button type="info" style="margin-right: 1130px;background: #545c64">Go Back</el-button></router-link> <!--A button can go back to last page-->
      <!--A table show all put_in information-->
      <el-table :data="tableData" :header-cell-style="{textAlign:'center'}" :cell-style="{textAlign:'center'}">
        <el-table-column
          label="Put_in ID"
          prop="putInId">
        </el-table-column>
        <el-table-column
          label="Time"
          prop="addTime">
        </el-table-column>
        <el-table-column
          label="Good Number"
          prop="addNumber">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodIn',
  data () {
    return {
      tableData: []
    }
  },
  mounted: function () {
    this.loadGoodIn() //As soon as open this page, get all put_in information
  },
  methods: {
    back () {
      this.$router.replace('/house')
    },
    //Load put_in information from backend
    loadGoodIn () {
      var _this = this
      console.log(_this.$store.state.warehouseId)
      console.log(_this.$store.state.goodId)
      this.$axios.post('/getPutInInfo', {warehouseId: _this.$store.state.warehouseId, goodId: _this.$store.state.goodId}).then(resp => {
        if (resp && resp.status === 200) {
          _this.tableData = resp.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
