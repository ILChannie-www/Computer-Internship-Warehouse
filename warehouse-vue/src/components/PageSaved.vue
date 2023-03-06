<template>
  <body id="paper">
  <div :style="background">
    <el-carousel :interval="4000" type="card" height="230px">
      <el-carousel-item>
        <img src="../assets/img/bg/eva1.jpg" width="100%">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/bg/wel.jpg" width="100%">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/bg/w1.jpg" width="100%">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/bg/w2.jpg" width="100%">
      </el-carousel-item>
      <el-carousel-item>
        <img src="../assets/img/bg/w3.jpg" width="100%">
      </el-carousel-item>
    </el-carousel>
    <el-row :gutter="0">
      <el-col :span=12><div id="myChart" style="width: 500px; height: 800px"></div></el-col>
      <el-col :span="12"><div id="myPie" style="width: 500px; height: 800px"></div></el-col>
    </el-row>
  </div>
  </body>
</template>

<style>
  .el-row {
    margin-bottom: 20px;} :last-child {
                            margin-bottom: 0;
                          }

  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  #paper{}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

<script>

  export default {
    name: 'HomePage',
    data () {
      return {
        background: {
          backgroundImage: 'url(' + require('../assets/img/bg/star.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        },
        chartPie: '',
        myChart: '',
        tableData: ['1', '2', '3', '4', '5', '1111'],
        good: [],
        wId: [],
        gNumber: [],
        goodType: [],
        aux: []
      }
    },
    mounted () {
      this.getWarehouse()
      this.getGood()
    },

    methods: {
      getWarehouse () { // Get warehouse ID and good number
        let uname = this.$store.state.user.username
        var _this = this
        this.$axios.post('/getGoodStatistics', {managerId: uname}).then(resp => {
            if (resp && resp.status === 200) {
              _this.good = resp.data
              this.good.forEach(element => {
                element =Object.assign({}, element)
                // console.log(element)
                console.log(element.value)
                this.gNumber.push(element.value)
                this.wId.push(element.name)
              })
            }else {
              console.log("failed")
            }
            this.wId = Object.assign({}, this.wId)
            // console.log(JSON.parse(JSON.stringify(this.wId)))
            // this.wId = JSON.parse(JSON.stringify(this.wId))
            this.gNumber = JSON.parse(JSON.stringify(this.gNumber))
            console.log(this.wId)
            console.log(this.gNumber)
          }
        )
        this.drawCharts()
      },
      getGood () { // Get good ID and good number
        let uname = this.$store.state.user.username
        var _this = this
        this.$axios.post('/getRecordStatistics', {managerId: uname}).then(resp => {
          if (resp && resp.status === 200) {
            // = resp.data
            _this.goodType = resp.data
            this.goodType.forEach(element => {
              element = JSON.parse(JSON.stringify(element))
              // _this.goodType.push(element)
              // console.log(element)
              this.goodType.push(element)
            })
            console.log(this.goodType)
          }
        })
        this.drawPie()
      },
      drawPie () {
        let myPie = this.$echarts.init(document.getElementById('myPie'))
        let option = {
          title: [
            {
              text: 'Number of orders for each kind of goods',
              textStyle: {
                fontWeight: 'normal',
                color: '#FFF'
              }
            }
          ],
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: 'bottom',
            left: 'center',
            textStyle: {
              fontWeight: 'normal',
              color: '#FFF'
            }
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
                normal: {
                  color: function (colors) {
                    var colorList = [
                      '#fc8251',
                      '#5470c6',
                      '#F8D6D6',
                      '#91cd77',
                      '#ef6567',
                      '#F2F2F2',
                      '#f9c956',
                      '#75bedc',
                      '#D6809C'
                    ]
                    return colorList[colors.dataIndex]
                  }
                }
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: true
              },
              data: this.goodType
            }
          ]
        }
        myPie.setOption(option)
      },
      drawCharts () {
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // this.good.forEach(element => {
        //   console.log(element)
        //   this.gNumber.push(element.value)
        //   this.wId.push(element.name)
        // })
        let option = {
          title: [
            {
              text: 'Total quantity of goods in each warehouse',
              textStyle: {
                fontWeight: 'normal',
                color: '#FFF'
              }
            }
          ],
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            data: this.wId
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          },
          series: [
            {
              data: this.gNumber,
              itemStyle: {
                normal: {
                  color: function (colors) {
                    var colorList = [
                      '#fc8251',
                      '#5470c6',
                      '#F8D6D6',
                      '#91cd77',
                      '#ef6567',
                      '#F2F2F2',
                      '#f9c956',
                      '#75bedc',
                      '#D6809C',
                    ]
                    return colorList[colors.dataIndex]
                  }
                }
              },
              type: 'bar'
            }
          ]
        }
        myChart.setOption(option)
      }
    }
  }
</script>
