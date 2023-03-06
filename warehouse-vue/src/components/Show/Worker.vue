<template>
  <div>
    <div>
      <!--A button can jump to new worker page-->
      <router-link to="newworker"><el-button type="info" style="margin-left: 1090px;background: #545c64">+Add new staff</el-button></router-link>
      <!--A table show all worker information-->
      <el-table key="item.id" :data="tableData" :header-cell-style="{textAlign:'center'}" :cell-style="{textAlign:'center'}" :default-sort = "{prop: 'workerId', order: 'descending'}">
        <!--Drop down form to store details-->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="top" inline class="demo-table-expand">
              <el-form-item label="Telephone">
                <span>{{ props.row.telephoneNumber }}</span>
              </el-form-item>
              <el-form-item label="Resignation date">
                <span>{{ props.row.resignationTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="Worker ID"
          sortable
          prop="workerId">
        </el-table-column>
        <el-table-column
          label="Name"
          prop="workerName">
        </el-table-column>
        <el-table-column
          label="Warehouse ID"
          prop="warehouseId">
        </el-table-column>
        <el-table-column
          label="Salary"
          sortable
          prop="salary">
        </el-table-column>
        <el-table-column
          label="Employment Time"
          sortable
          prop="employmentTime">
        </el-table-column>
        <!--A button can delete warker-->
        <el-table-column
          fixed="right"
          label="Edit"
          width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteWorker (scope.row.workerId)" type="text" size="small">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
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

<script>

export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 18,
      tableData: [
        {workerId: '1'
        }]
    }
  },
  //Get worker information from backend as soon as user open this page
  mounted: function () {
    this.loadWorker()
  },
  methods: {
    //Return worker ID to the backend
    deleteWorker (id) {
      this.$confirm('Delete this worker?', 'Tips', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        console.log(id)
        this.$axios
          .post('/deleteWorker', {id: id}).then(resp => {
            if (resp && resp.data.code === 200) { //The back-end operation is successful, and a message prompt pops up
              this.$message({
                type: 'success',
                message: 'Success'
              })
              this.loadWorker()
            }
            else if (resp.data.code == 300) {
              alert("Deletion Failed")
            }
            else {
              alert(resp.data.message)
            }
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancel'
        })
      })
    },
    //Get worker information according to manager ID in store from the backend
    loadWorker () {
      let uname = this.$store.state.user.username
      var _this = this
      this.$axios.post('/worker', {id: uname}).then(resp => {
        if (resp && resp.status === 200) {
          _this.tableData = resp.data
        }
      })
    }
  }
}
</script>
