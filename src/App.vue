<template lang="html">
  <div>
    <List
      :basicInfo="basicInfo"
      :listArray="listArray"
      :tabInd= "tabInd"
      :selectVal="selectVal"
      :pageNum="pageNum"
      @delete-fn="deleteFn"
      @check-val-fn="checkValFn"
      @input-blur-fn="inputBlurFn"
      @check-all-fn="checkAllFn"
      @head-search-icon-fn="headSearchIconFn"
      @opt-event-fn="optEventFn"
    />
    <Page
      :pageVal="pageVal"
      :totalPage="totalPage"
      :totalNum="totalNum"
      :firstLast="pagefalse"
      :txt="pagefalse"
      :jump="pagefalse"
      :prevNext="pagefalse"
      :showPage="10"
      :pageShow="20"
      @page-list-fn="pageListFn"
    />
  </div>
</template>

<script>
import List from '@/components/SearchList.vue'
import Page from '@/components/Page.vue'
/*
* @param basicInfo  配置信息
* @tabarr tab数组
* @tablineobj tab父元素相关配置
* @tabInd tab当前选中项索引
*/
export default {
  name: 'ZktList',
  data () {
    return {
      pageShow: 8,
      showPage: '',
      pageVal: 1,
      pagesize: 20,
      totalPage: 1,
      totalNum: 2,
      pagefalse: true,
      pageNum: 2, // 当前页总共多少条，用于判定是否全选
      listArray: [],
      basicInfo: {
        searchtxt: '查询',
        jsonopt: [ // 接口列表展示字段 全部 待处理 已处理
          ['check', 'rulename', 'HTML_keywords', 'replycontent', 'opt']
        ],
        listhead: [ // 列表头部展示字段 全部 待处理 已处理
          ['全选', '规则名称', '关键词', '回复内容', '操作']
        ],
        listpercent: [ // 列表百分比字段 全部 待处理 已处理
          ['5%', '20%', '25%', '25%', '25%']
        ],
        listheadsearch: [
          [
            'check',
            'rank',
            {
              type: 'input',
              typeVal: 'number'
            },
            'input',
            '',
            'opt'
          ]
        ]
      },
      selectVal: [
        [
          {
            val: '',
            show: false,
            txt: '',
            realval: ''
          },
          {
            val: '',
            show: false,
            txt: '...',
            realval: -1
          },
          {
            val: '',
            show: false,
            txt: '',
            realval: ''
          },
          {
            val: '',
            show: false,
            txt: '',
            realval: ''
          },
          {
            val: '',
            show: false,
            txt: '',
            realval: ''
          },
          {
            val: '',
            show: false,
            txt: '',
            realval: ''
          }
        ]
      ],
      tabInd: 0
    }
  },
  created () {
    this.listArray = [{
      id: '1',
      rulename: 'rulename',
      HTML_keywords: '<a>words</a>',
      replycontent: '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
      opt: [{
        ev: 'detail',
        val: '详情',
        class: 'opt'
      }, {
        ev: 'edit',
        val: '编辑',
        class: 'opt'
      }, {
        ev: 'del',
        val: '删除',
        class: 'opt'
      }]
    }, {
      id: '2',
      rulename: 'rulename',
      HTML_keywords: '<a>words</a>',
      replycontent: 'adsf',
      Hover_replycontent: 'adsf777',
      opt: [{
        ev: 'detail',
        val: '详情',
        class: 'opt'
      }, {
        ev: 'edit',
        val: '编辑',
        class: 'opt'
      }, {
        ev: 'del',
        val: '删除',
        class: 'opt'
      }]
    }]
  },
  components: {
    List,
    Page
  },
  methods: {
    pageListFn () {
      console.log('重新查询接口')
      /*
        分页处理接口查询
        需提供总条数以及当前页返回的数据项
        需配置
        pageShow: 8, 前后显示4个分页 默认8
        showPage: '',计算显示前后几个页码，均分Math.floor(this.pageShow / 2) 默认4
        pageVal: 1, 当前分页
        pagesize: 20, 每页多少条
        totalPage: 1, 总页码
        totalNum: 2, 总条数
        pagefalse: true, 分页文案显示与否
        pageNum: 2, // 当前页总共多少条，用于判定是否全选当有全选功能是使用
        listArray: [], 数据项
        selectVal: [], 查询值设置
      */
      // let that = this
      // that.listArray = []
      // that.pageNum = that.listArray.length // 当有checkbox时，需要制定当前页共有多少条数据，以提供全选功能
      // that.totalNum = temparr.result.total // 总条数
      // that.totalPage = Math.ceil(that.totalNum / that.pagesize) // 总页码
    },
    deleteFn (obj) {
      var flag = this.basicInfo.listheadsearch[this.tabInd][obj.ind]
      if (flag === 'input') {
        this.selectVal[this.tabInd][obj.ind]['txt'] = ''
        this.selectVal[this.tabInd][obj.ind].val = ''
      } else if (flag !== 'input' && flag !== '' && flag !== 'check') { // 非输入，非复选，非空
        this.selectVal[this.tabInd][obj.ind]['txt'] = '...'
        this.selectVal[this.tabInd][obj.ind].val = -1
        this.selectVal[this.tabInd][obj.ind].realval = -1
      }
      this.ResetpageValFn()
      // 重新查询接口数据
      this.pageListFn()
    },
    optEventFn (obj) { // 增删改查操作 obj包含索引，dom,和该条数据项{ind: ind, ev: ev, item: item}
      console.log(obj)
    },
    checkValFn (obj) {
      console.log(obj, '包含单选的所有值和全选的value值')
    },
    checkAllFn (obj) {
      console.log(obj.checkall, '全选的value值')
    },
    headSearchIconFn (obj) { // 隐藏搜索项
      if (obj.type === 'rank') {
        console.log(obj)
        this.selectVal[this.tabInd][obj.ind].val = obj.rankFlag
      }
      for (var i = 0; i < this.selectVal[this.tabInd].length; i++) {
        if (this.selectVal[this.tabInd][i].show) {
          this.selectVal[this.tabInd][i].show = false
        }
      }
      if (obj.ind !== null) {
        if (this.selectVal[this.tabInd][obj.ind].show) {
          this.selectVal[this.tabInd][obj.ind].show = false
        } else {
          this.selectVal[this.tabInd][obj.ind].show = true
        }
      }
    },
    inputBlurFn: function (obj) { // 搜索项处理
      if (obj.enterflag && obj.enterflag === 'enter') {
        this.selectVal[this.tabInd][obj.ind].show = false
      }
      if (this.basicInfo.listheadsearch[this.tabInd][obj.ind] === 'input') { // input处理
        this.selectVal[this.tabInd][obj.ind]['txt'] = this.selectVal[this.tabInd][obj.ind].val
        if (this.selectVal[this.tabInd][obj.ind]['txt'].replace(/\s/gi, '') === '') {
          this.selectVal[this.tabInd][obj.ind]['txt'] = ''
          this.selectVal[this.tabInd][obj.ind].val = ''
        }
      } else { // 下拉菜单处理
        let index = 0
        let val = this.selectVal[this.tabInd][obj.ind].val
        for (let item = 0; item < this.basicInfo.listheadsearch[this.tabInd][obj.ind].length; item++) {
          if (val === this.basicInfo.listheadsearch[this.tabInd][obj.ind][item].val) {
            index = item
          }
        }
        this.selectVal[this.tabInd][obj.ind]['txt'] = this.basicInfo.listheadsearch[this.tabInd][obj.ind][index].txt // 文本值
        this.selectVal[this.tabInd][obj.ind]['realval'] = this.basicInfo.listheadsearch[this.tabInd][obj.ind][index].realval // 索引值
      }
      // search重新查询
      this.ResetpageValFn()
      this.pageListFn()
    },
    ResetpageValFn () {
      this.pageVal = 1
    }
  }
}
</script>
