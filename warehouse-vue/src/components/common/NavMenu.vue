<!--This is the menu of management system-->
<template>
  <div>
    <el-form>
      <!--Use menu element in vue-->
      <el-menu
        :default-active="activeIndex2"
        router
        class="menu"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!--Set navigation bar content-->
        <el-menu-item index="page">Home</el-menu-item> <!--Jump to home page-->
        <el-submenu index="2">
          <template slot="title">Manage</template>
          <el-submenu index="">
            <template slot="title">Warehosue</template>
            <el-menu-item @click="newHouse">Create new warehouse</el-menu-item>
            <!--Get the warehouse ID and place them in the navigation bar-->
            <el-menu-item index="house" v-for="item in warehouseData" :key="item.id" @click="postHouseId(item.warehouseId)">{{item.warehouseId}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="worker">Worker</el-menu-item> <!--Jump to worker page-->
        </el-submenu>
        <span style="position: absolute;padding-top: 20px;right: 40%;font-size: 20px;font-weight: bold">Start Managing Your Warehouse</span>
        <el-submenu index="3"  style="position: absolute;right: 0%">
          <template slot="title">  Personal Information  </template>
          <el-menu-item @click="logOut">Logout</el-menu-item> <!--Logout-->
        </el-submenu>
      </el-menu>
    </el-form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        warehouseData: [], //Store warehosue ID
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    mounted: function () {
      this.getWarehouse() //getWarehouse() as soon as user open the page
    },
    methods: {
      //A message appears asking whether to create a new warehouse
      newHouse () {
        this.$confirm('Add a new warehouse', 'Tips', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$axios
            .post('/addHouse', {managerId: this.$store.state.user.username}).then(resp => {
            if (resp.data.code === 200) { //Successful return value
              this.$message({
                type: 'success',
                message: 'Successfully add new warehouse'
              })
              location.reload()
            }
          }).catch(() => { //Return value failed
            this.$message({
              type: 'info',
              message: 'Cancel'
            })
          })
        })
      },
      //A message appears asking whether to logout
      logOut(){
        this.$confirm('Are you sure to log out', 'Tips', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => { //Choose yes
          this.$message({
            type: 'success',
            message: 'Successfully logged out'
          });
          this.$store.commit('logout') //Delete user name in store
          this.$router.replace('/') //Go back to login page
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel'
          });
        });
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      //When user select a warehouse, return the warehouse ID to the backend
      postHouseId (id) {
        var _this = this
        _this.$store.commit('setWarehouseId', id) //Put the warehouse ID in store
        _this.$router.push('/back') //Refresh page
          .catch(failResponse => {})
      },
      //Return all warehouse IDs of the manager from the backend, put them in warehouseId
      getWarehouse () {
        let uname = this.$store.state.user.username
        var _this = this
        this.$axios.post('/getWarehouseId', {id: uname}).then(resp => {
          if (resp && resp.status === 200) {
            let result = resp.data //Return successfully, put them in warehouseId[]
            result.forEach(element => {
              _this.warehouseData.push({warehouseId: element})
            })
          }
        })
      }
    }
  }
</script>
