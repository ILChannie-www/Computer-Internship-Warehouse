<template>
  <body id="NewWorker">
  <!--A button go back to worker page-->
  <router-link to="worker"><el-button type="info" style="margin-right: 1130px;background: #545c64">Go Back</el-button></router-link>
  <!--Forms to be filled in for new worker-->
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <h3 class="NewWorker_title">Worker Information</h3>
    <el-form-item label="Worker Name" prop="workerName">
      <el-input v-model="ruleForm.workerName"></el-input>
    </el-form-item>
    <el-form-item label="Worker ID" prop="workerId">
      <el-input v-model="ruleForm.workerId"></el-input>
    </el-form-item>
    <!--Get warehouse ID from backend, and put them in drop down box-->
    <el-form-item label="Warehouse ID" prop="warehouseId">
      <el-select v-model="ruleForm.warehouseId" placeholder="Choose a warehouse">
        <el-option v-for="item in warehouseData"
                   :key="item.id"
                   :label="item.warehouseId"
                   :value="item.warehouseId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Salary" prop="salary">
      <el-input v-model="ruleForm.salary"></el-input>
    </el-form-item>
    <el-form-item label="Telephone" prop="telephoneNumber">
      <el-input v-model="ruleForm.telephoneNumber"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
      <el-button @click="resetForm('ruleForm')">Reset</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>

  export default {
    data () {
      const checkName = (rule, value, callback) => {
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/im
        const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
        const num = /[0123456789[\]]/im
        if (regEn.test(value) || regCn.test(value) || num.test(value)) {
          callback(new Error('Please enter English name'))
        } else {
          callback()
        }
      }
      const checkAccount = (rule, value, callback) => {
        const regEn = /[`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/im
        const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
        if (regEn.test(value) || regCn.test(value)) {
          callback(new Error('Please enter numbers or letters'))
        } else {
          callback()
        }
      }
      return {
        warehouseData: [],
        ruleForm: {
          workerName: '',
          warehouseId: '',
          workerId: '',
          salary: '',
          telephoneNumber: '',
          employmentTime: '',
          resignationTime: '',
          managerId: ''
        },
        //The content of the input box needs to meet the requirements. If it does not meet the requirements,
        //a prompt will be displayed and cannot be submitted
        rules: {
          workerId: [
            {required: true, message: 'Please input 10 digits worker ID', trigger: 'blur'},
            {min: 10, max: 10, message: 'Length should be 10', trigger: 'blur'},
            {validator: checkAccount, trigger: 'blur'}
          ],
          warehouseId: [
            {required: true, message: 'Please choose warehouse', trigger: 'change'}
          ],
          telephoneNumber: [
            {required: true, message: 'Please input telephone number', trigger: 'blur'},
            {pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/, message: 'Please input telephone number', trigger: 'blur'}
          ],
          workerName: [
            {required: true, message: 'Please input worker name', trigger: 'blur'},
            {max: 15, message: 'Name is too long', trigger: 'blur'},
            {validator: checkName, trigger: 'blur'}
          ],
          salary: [
            {required: true, message: 'Please input salary', trigger: 'blur'},
            {max: 10, message: 'Salary is too high', trigger: 'blur'},
            {pattern: /^\+?[1-9][0-9]*$/, message: 'Please enter positive integer', trigger: 'blur'}
            // {validator: checkNu, trigger: 'blur'}
          ]
        }
      }
    },
    //getWarehouse as soon as user open this page
    mounted: function () {
      this.getWarehouse()
    },
    methods: {
      //Accoring to the user ID in store, get all warehouse ID from backend
      getWarehouse () {
        let uname = this.$store.state.user.username
        var _this = this
        console.log(uname)
        this.$axios.post('/getWarehouseId', {id: uname}).then(resp => {
          if (resp && resp.status === 200) {
            let result = resp.data
            result.forEach(element => {
              _this.warehouseData.push({warehouseId: element})
            })
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      //Send the form content to the backend
      submitForm (form) {
        var _this = this
        this.$refs[form].validate(async (success) => {
            if (success) {
              // this.$message('ok')
              this.$axios
                .post('/addWorker', {
                  workerId: this.ruleForm.workerId,
                  warehouseId: this.ruleForm.warehouseId,
                  telephoneNumber: this.ruleForm.telephoneNumber,
                  workerName: this.ruleForm.workerName,
                  salary: this.ruleForm.salary,
                  managerId: this.$store.state.user.username
                }).then(resp => {
                if (resp.data.code === 200) {
                  this.$message('Successful!')
                  _this.$router.replace('/worker')
                }
                else if(resp.data.code === 300) {
                  this.$message("Duplicate Worker ID")
                }
                else {
                  this.$message(resp.data.message)
                }
              })
            } else {
              this.$message('Please input correct information!')
              console.log('Error!!')
              this.resetForm(this.ruleForm)
              return false
            }
          }
        ).catch(failResponse => {
        })
      }
    }
  }
</script>

<style>
  body {
    margin-left: 100px;
  } .demo-ruleForm{
      background-clip: padding-box;
      margin-left: 250px;
      margin-right: 380px;
      margin-top:30px;
    }.NewWorker_title{
       margin-left: 50px;
     }
</style>
