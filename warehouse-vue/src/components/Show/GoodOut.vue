<template>
  <div>
    <div>
      <router-link to="house"><el-button type="info" style="margin-right: 1130px;background: #545c64">Go Back</el-button></router-link> <!--A button can go back to last page-->
      <!--A table show all retrieval information-->
      <el-table :data="tableData" :header-cell-style="{textAlign:'center'}" :cell-style="{textAlign:'center'}">
        <el-table-column
          label="Retrieval ID"
          prop="retrievalId">
        </el-table-column>
        <el-table-column
          label="Time"
          prop="retrievalTime">
        </el-table-column>
        <el-table-column
          label="Number"
          prop="retrievalNumber">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodOut',
  data () {
    return {
      tableData: []
    }
  },
  mounted: function () {
    this.loadGoodOut() //As soon as open this page, get all retrieval information
  },
  methods: {
    //Load retrieval information from backend
    loadGoodOut () {
      var _this = this
      this.$axios.post('/getRetrievalInfo', {warehouseId: _this.$store.state.warehouseId, goodId: _this.$store.state.goodId}).then(resp => {
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
