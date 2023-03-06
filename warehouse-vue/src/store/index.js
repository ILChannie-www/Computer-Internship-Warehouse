import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { // Save user name
      username: window.localStorage.getItem('user' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('user' || '[]')).username
    },
    // Save warehouse ID
    warehouseId: window.localStorage.getItem('warehouseId' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('warehouseId' || '[]')),
    // Save good ID
    goodId: window.localStorage.getItem('goodId' || '[]') == null ? '' : JSON.parse(window.localStorage.getItem('goodId' || '[]'))
  },
  mutations: {
    // Save the current user name
    login (state, user) {
      state.user = user
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    // Save the current warehouse ID
    setWarehouseId (state, warehouseId) {
      state.warehouseId = warehouseId
      window.localStorage.setItem('warehouseId', JSON.stringify(warehouseId))
    },
    // Save the current good ID
    setGoodId (state, goodId) {
      state.goodId = goodId
      window.localStorage.setItem('goodId', JSON.stringify(goodId))
    },
    // Clear user name
    logout (state) {
      state.user.username = ''
      state.warehouseId = ''
      state.goodId = ''
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('warehouseId')
      window.localStorage.removeItem(('goodId'))
    }
  }
})
