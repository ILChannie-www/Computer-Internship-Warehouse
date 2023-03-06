<template>
  <div>
    <!--A button used to add a new type good-->
    <router-link to="newgood"><el-button type="info" style="margin-left: 1000px;background: #545c64">+Add new goods</el-button></router-link>
    <div>
      <!--A table used to show good information in this warehosue-->
      <el-table :data="tableData" :header-cell-style="{textAlign:'center'}" :cell-style="{textAlign:'center'}">
        <el-table-column
          label="Good ID"
          prop="goodId">
        </el-table-column>
        <el-table-column
          label="Type"
          prop="goodType">
        </el-table-column>
        <el-table-column
          label="Number"
          prop="goodNumber">
        </el-table-column>
        <el-table-column
          label="Color"
          prop="color">
        </el-table-column>
        <el-table-column
          label="Rack ID"
          prop="storageRackId">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="More Detail"
          width="120"
          v-loading="true">
          <!--Two buttons for each good can go to put_in page or retrieval page of it-->
          <template v-slot="scope">
            <el-button class="1" @click.native.prevent="goodDetailIn (scope.row.goodId)" type="text" size="small">
              In
            </el-button>
            <el-button class="1" @click.native.prevent="goodDetailOut (scope.row.goodId)" type="text" size="small">
              Out
            </el-button>
          </template>
        </el-table-column>
        <!--Two buttons for each good can put_in or retrieval it-->
        <el-table-column
          fixed="right"
          label="Edit"
          width="120"
          v-loading="true">
          <template v-slot="scope">
            <el-button class="1" @click.native.prevent="addGood (scope.row.goodId)" type="text" size="small">
              Add
            </el-button>
            <el-button class="1" @click.native.prevent="reduceGood (scope.row.goodId, scope.row.goodNumber)" type="text" size="small">
              Reduce
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 18,
      tableData: []
    }
  },
  mounted: function () {
    this.loadGood()
  },
  methods: {
    //According good ID, send the increased quantity to the back end
    addGood (id) {
      let wId = this.$store.state.warehouseId
      this.$prompt('Please input number', 'Put In', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (value > 100000) { //Number too big
            return 'Please input number less than 10000'
          } else if (value <= 0 ) { //Number less than or equal to 0
            return 'Please input a positive integer'
          } else if (isNaN(value)) { //Not a number
            return 'Please input number'
          } else if (!value) { //Null
            return 'Number cannot be null'
          }
        }
      }).then(({value}) => {
        this.$axios
          .post('/putInGoods', {addNumber: value, goodId: id, warehouseId: wId //post the number and good id to backend
          }).then(resp => {
          if (resp.data.code === 200) {
            this.$message({ //Add successfully, pop up a message reminder
              type: 'success',
              message: 'Good ID: ' + id + '   Add number: ' + value
            })
            location.reload();
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel'
          })
        })
      })
    },
    //According good ID, send the reduce quantity to the back end
    reduceGood (id, number) {
      let wId = this.$store.state.warehouseId
      this.$prompt('Please input number', 'Retrieval', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        inputValidator: (value) => {
          if (value > number) {
            return 'There are not so much goods'
          } else if (value <= 0 ) {
            return 'Please input a positive integer'
          } else if (isNaN(value)) {
            return 'Please input number'
          } else if (!value) {
            return 'Number cannot be null'
          }
        }
      }).then(({value}) => {
        this.$axios
          .post('/retrievalGoods', {retrievalNumber: value, goodId: id, warehouseId: wId //post the number and good id to backend
          }).then(resp => {
          if (resp.data.code === 200) {
            this.$message({
              type: 'success',
              message: 'Good ID: ' + id + '   Add number: ' + value
            })
            location.reload()
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel'
          })
        })
      })
    },
    //Send good ID to backend and jump to put_in page
    goodDetailIn (id) {
      var _this = this
      this.$store.commit('setGoodId', id)
      _this.$router.replace('/goodin')
        .catch(failResponse => {})
    },
    //Send good ID to backend and jump to retrieval page
    goodDetailOut (id) {
      var _this = this
      console.log('out' + id)
      this.$store.commit('setGoodId', id)
      _this.$router.replace('/goodout')
        .catch(failResponse => {})
    },
    //Accoring to the warehouse ID in store, get good information from backend
    loadGood () {
      var _this = this
      this.$axios.post('/getWarehouseInfo', {warehouseId: _this.$store.state.warehouseId}).then(resp => {
        if (resp && resp.status === 200) {
          _this.tableData = resp.data
        }
      })
    }
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 200px;
    font-size: 14px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-left: 150px;
    margin-bottom: 0;
    width: 20%;
  }
</style>
