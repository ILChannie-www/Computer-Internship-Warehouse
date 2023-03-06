<template>
  <!--The home page-->
  <div>
    <!--Import navigation bar-->
    <NavMenu></NavMenu>
    <router-view/>
    <body id="paper">
    <!--Picture rotation-->
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
      <!--Chart for data visualization-->
      <el-row :gutter="0">
        <el-col :span=12><div id="myChart" style="width: 500px; height: 800px"></div></el-col>
        <el-col :span="12"><div id="myPie" style="width: 500px; height: 800px"></div></el-col>
      </el-row>
    </div>
    </body>
  </div>
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
  import NavMenu from '@/components/common/NavMenu'
  export default {
    name: 'HomePage',
    components: {NavMenu},
    data () {
      return {
        background: {
          backgroundImage: 'url(' + require('../assets/img/bg/star.jpg') + ')',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        },
        chartPie: '',
        myChart: '',
        tableData: [],
        good: [],
        wId: [],
        gNumber: [],
        goodType: [],
        aux: []
      }
    },
    mounted () {
      setTimeout( () => {
        this.getWarehouse()
        this.getGood()
      }, 800)
    },

    methods: {
      // Get warehouse ID and good number
      getWarehouse () {
        let uname = this.$store.state.user.username
        var _this = this
        this.$axios.post('/getGoodStatistics', {managerId: uname}).then(resp => {
            if (resp && resp.status === 200) {
              _this.good = resp.data
            }else {
              console.log("failed")
            }
          }
        )
        setTimeout(() => {
          this.drawCharts() //Draw chart
        }, 800)
      },
      // Get good ID and good number
      getGood () {
        let uname = this.$store.state.user.username
        var _this = this
        this.$axios.post('/getRecordStatistics', {managerId: uname}).then(resp => {
          if (resp && resp.status === 200) {
            // = resp.data
            _this.goodType = resp.data
            this.goodType.forEach(element => {
            })
            console.log(this.goodType)
          }
        })
        setTimeout(() => {
          this.drawPie() //Draw pirchart
        }, 800)
      },
      //Draw piechart
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
      //Draw histogram
      drawCharts () {
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        this.good.forEach(element => {
          console.log(element)
          this.gNumber.push(element.value)
          this.wId.push(element.name)
        })
        console.log(this.good)
        console.log('111')
        let option = {
          title: [
            {
              text: 'Total quantity of goods of each type',
              textStyle: {
                fontWeight: 'normal',
                color: '#FFF'
              }
            }
          ],
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              formatter: function (params) {
                var newParamsName = ''
                const paramsNameNumber = params.length
                const provideNumber = 3
                const rowNumber = Math.ceil(paramsNameNumber / provideNumber)
                if (paramsNameNumber > provideNumber) {
                  for (let p = 0; p < rowNumber; p++) {
                    var tempStr = ''
                    var start = p * provideNumber
                    var end = start + provideNumber
                    if (p === rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                    newParamsName += tempStr
                  }
                } else {
                  newParamsName = params
                }
                return newParamsName
              }
            },
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
