import * as types from './mutation-types'
import article from '../../../fetch/article'
// import Cookies from 'js-cookie'

// initial state
const state = {
  listData: [], // 主列表数据
  listPageNum: 1, // 主列表页码
  searchKey: "",
  limit: 5,
  listLoading: false, // 主列表载入状态
  itemData: {}, // 当前详情数据
  total: 0,
}
// getters
const getters = {
  itemDataDetail: state => {
    if (state.itemData) {
      return state.itemData.article
    } else return {}
  },
  itemDataProject: state => {
    if (state.itemData) {
      return state.itemData.projects
    } else return []
  }
}
// actions
const actions = {
  // 获取列表
  getList({
    commit,
    state
  }, page) {
    commit(types.SET_LIST_LOADING, true)
    commit(types.LIST_CHANGE_PAGE, page)
    article._getArticle(state.limit, state.listPageNum, state.searchKey)
      .then(res => {
        commit(types.SET_LIST_DATA, res['data'])
        commit(types.SET_TOTAL, res['total'])
        commit(types.SET_LIST_LOADING, false)
      })
      .catch((error) => {
        console.log(error.response.data)
        commit(types.SET_LIST_LOADING, false)
      })
  },
  // 获取单条记录,传id则请求api数据，不传则清空
  getItem({
    commit,
    state
  }, id) {
    if (id) {
      article._getItem(id)
        .then(res => {
          commit(types.SET_ITEM_DATA, res['data'])
        })
        .catch((error) => {
          console.log(error.msg)
        })
    } else {
      commit(types.SET_ITEM_DATA, {})
    }
  },
  // 更改页码
  getArticle({
    dispatch,
    commit,
    state
  }, key) {
    commit(types.SET_KEY, key)
    article._getArticle(state.limit, state.listPageNum, key)
      .then(res => {
        commit(types.SET_LIST_DATA, res['data'])
        commit(types.SET_TOTAL, res['total'])
        commit(types.SET_LIST_LOADING, false)
      })
      .catch((error) => {
        console.log(error.response.data)
        commit(types.SET_LIST_LOADING, false)
      })
  }
}

// mutations
const mutations = {
  [types.SET_LIST_DATA](state, savedata) {
    state.listData = savedata
  },
  [types.SET_ITEM_DATA](state, savedata) {
    state.itemData = savedata
  },
  [types.SET_LIST_LOADING](state, savedata) {
    state.listLoading = savedata
  },
  [types.LIST_CHANGE_PAGE](state, savedata) {
    state.listPageNum = savedata
  },
  [types.SET_TOTAL](state, savedata) {
    state.total = savedata
  },
  [types.SET_KEY](state, savedata) {
    state.searchKey = savedata
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
