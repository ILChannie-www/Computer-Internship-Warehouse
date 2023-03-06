<template>
  <body id="NewGood">
  <!--A button to go back to good page-->
  <router-link to="house"><el-button type="info" style="margin-right: 1130px;background: #545c64">Go Back</el-button></router-link>
  <!--Forms to be filled in for new good-->
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <h3 class="NewGood_title">Goods Information</h3>
    <el-form-item label="Good Type" prop="goodType">
      <el-input v-model="ruleForm.goodType"></el-input>
    </el-form-item>
    <el-form-item label="Color" prop="color">
      <!--Drop down box-->
      <el-select v-model="ruleForm.color" placeholder="Choose color">
        <el-option label="Red" value="Red"></el-option>
        <el-option label="White" value="White"></el-option>
        <el-option label="Blue" value="Blue"></el-option>
        <el-option label="Black" value="Black"></el-option>
        <el-option label="Yellow" value="Yellow"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Number" prop="goodNumber">
      <el-input v-model="ruleForm.goodNumber"></el-input>
    </el-form-item>
    <el-form-item label="Rack ID (part 1)" prop="rackId1">
      <el-input v-model="ruleForm.rackId1"></el-input>
    </el-form-item>
    <el-form-item label="Rack ID (part 2)" prop="rackId2">
      <el-input v-model="ruleForm.rackId2"></el-input>
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
    const Id1 = (rule, value, callback) => {
      const regEn = /[A-Z[\]]/im
      if (!regEn.test(value)) {
        callback(new Error('Please enter 1 capital letter'))
      } else {
        callback()
      }
    }
    const Id2 = (rule, value, callback) => {
      const regEn = /[`~!@#$%^&*()_+<>?:"{},.\\/;'[\]]/im
      const regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im
      const en = /[a-zA-Z[\]]/im
      if (regEn.test(value) || regCn.test(value) || en.test(value)) {
        callback(new Error('Please enter number'))
      } else {
        callback()
      }
    }
    return {
      goodData: [],
      ruleForm: {
        goodType: '',
        color: '',
        rackId1: '',
        rackId2: '',
        goodNumber: '',
        rackId: ''
      },
      //The content of the input box needs to meet the requirements. If it does not meet the requirements,
      //a prompt will be displayed and cannot be submitted
      rules: {
        color: [
          {required: true, message: 'Please choose color', trigger: 'change'}
        ],
        goodNumber: [
          {required: true, message: 'Please input good number', trigger: 'blur'},
          {min: 1, max: 10, message: 'Length should be 1 to 10', trigger: 'blur'},
          {pattern: /^\+?[1-9][0-9]*$/, message: 'Please enter positive integer', trigger: 'blur'}
        ],
        rackId1: [
          {required: true, message: 'Please input 1 capital letter', trigger: 'blur'},
          {min: 1, max: 1, message: 'Length should be 1', trigger: 'blur'},
          {validator: Id1, trigger: 'blur'}
        ],
        rackId2: [
          {required: true, message: 'Please input 4 number', trigger: 'blur'},
          {min: 4, max: 4, message: 'Length should be 4', trigger: 'blur'},
          {pattern: /^\+?[1-9][0-9]*$/, message: 'Please enter positive integer', trigger: 'blur'}
        ],
        goodType: [
          {required: true, message: 'Please input good type', trigger: 'blur'},
          {max: 10, message: 'Good type is too long', trigger: 'blur'},
          {validator: checkName, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    //Send the form content to the backend
    submitForm (form) {
      var _this = this
      this.$refs[form].validate(async (success) => {
          if (success) {
            console.log(`${this.ruleForm.rackId1}${this.ruleForm.rackId2}`)
            this.$axios
              .post('/createGoods', {
                warehouseId: _this.$store.state.warehouseId,
                goodType: this.ruleForm.goodType,
                goodNumber: this.ruleForm.goodNumber,
                color: this.ruleForm.color,
                rackId: `${this.ruleForm.rackId1}${this.ruleForm.rackId2}`,
              }).then(resp => {
              if (resp.data.code === 200) {
                this.$message('Successful!')
                _this.$router.replace('/house')
              } else if (resp.data.code === 300) {
                this.$message('Duplicate Good ID')
              } else {
                this.$message(resp.data.message)
              }
            }).catch(failResponse => {
            })
          } else {
            this.$message('Please input correct information!')
            console.log('Error!!')
            this.resetForm(this.ruleForm)
            return false
          }
        }
      )
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
