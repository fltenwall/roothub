<template>
  <div class="pg-home">
    <DashboardHeader title="仪表盘"></DashboardHeader>
    <PageWrap>
      <Row :gutter="24">
        <Col span="14">
          <MyCard class="t1">
            <h1>欢迎使用RootHub</h1>
            <div class="item">
              <Icon type="logo-designernews" />
              <div>
                <h3>设计规范</h3>
                <p>多端统一物料平台，低码化、移动化、组件化、区块化、治理降本、流通降本、社区化、国际化</p>
                <p>物料设计研发规范 （效率、体验、质量）</p>
                <p>物料运营管理规范</p>
              </div>
            </div>
            <div class="item">
              <Icon type="ios-analytics" />
              <div>
                <h3>可视化开发</h3>
                <p>可视化UI界面，物料预览，源码查看，个性化配置</p>
              </div>
            </div>
            <div class="item">
              <Icon type="ios-appstore" />
              <div>
                <h3>配套工具</h3>
                <p>CLI、脚手架、配套的CI命令帮助你快速开发物料，管理项目等</p>
              </div>
            </div>

            <div class="item">
              <Icon type="md-apps" />
              <div>
                <h3>丰富物料</h3>
                <p>集成 ant-design 物料，基于丰富的物料可帮助你快速开发页面，并且支持私有物料</p>
                <p v-for="item of MATERIALS_LIST" :key="item.title">
                  {{ item.title }}&nbsp;<a class="grn" v-if="item.url" :href="item.url" target="_blank">{{
                    item.url
                  }}</a>
                </p>
              </div>
            </div>

            <div class="ta-center">
              <Button type="primary">
                <a target="_blank" :href="DOC_URL">了解更多 ></a>
              </Button>
            </div>
          </MyCard>
        </Col>
        <Col span="10">
          <MyCard class="t2">
            <Row>
              <Col flex="auto">
                <span class="news-title">前端资讯</span>
              </Col>
              <Col flex="200px">
                <div class="new-setting" @click="openSettig">
                  <i v-if="sendNewStatus.isOpen" class="send-tip">{{
                    sendNewStatus.mode === 'timing'
                      ? `每天${sendNewStatus.value}推送`
                      : `每隔${sendNewStatus.value}小时整点推送`
                  }}</i>
                  <Icon type="md-settings" />
                </div>
              </Col>
            </Row>
            <!--  <ul>
              <li v-for="(item, key) in news" :key="key">
                <a :href="item.node.originalUrl" target="_blank">{{
                  item.node.title
                }}</a>
              </li> 
            </ul> -->
            <iframe
              id="newsIframe"
              src="https://front-end-rss.vercel.app/"
              frameborder="0"
              style="width: 100%; height: 94%"
            ></iframe>
          </MyCard>
        </Col>
      </Row>
    </PageWrap>

    <!-- 设置前端咨询推送 -->
    <Modal v-model="sendNewsModal" title="推送设置">
      <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="80">
        <FormItem label="推送频率">
          <Select v-model="formData.mode">
            <Option value="timing">定时</Option>
            <Option value="interval">时间间隔</Option>
          </Select>
        </FormItem>
        <FormItem label="定时" v-if="formData.mode === 'timing'" prop="value">
          <TimePicker type="time" placeholder="选择时间" v-model="formData.value"></TimePicker>
        </FormItem>
        <FormItem label="每隔" v-else prop="intervalvalue">
          <InputNumber
            :max="23"
            :min="1"
            v-model="formData.intervalValue"
            :formatter="value => `${value} 小时`"
          ></InputNumber>
        </FormItem>
        <FormItem label="状态">
          <i-switch v-model="formData.isOpen">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button @click="setSendConfig">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { DOC_URL, MATERIALS_LIST } from '@/const'
import axios from 'axios'
import Api from '@/api'

const instance = axios.create({
  baseURL: 'https://web-api.juejin.im',
  timeout: 20000,
  headers: {
    'X-Agent': 'Juejin/Web'
  }
})

// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response.data.data
  },
  function (error) {
    console.error(error.response)
    window &&
      window.vm.$Notice.error({
        title: '提示',
        desc: error.response.data || '接口出错了'
      })
    return Promise.reject(error)
  }
)

export default {
  name: 'Home',
  data() {
    return {
      currentCom: 'select',
      news: [],
      DOC_URL,
      MATERIALS_LIST,
      //{value: "09:00:00", mode: "timing", isOpen: true}
      sendNewsModal: false,
      formData: {
        intervalValue: 1,
        value: '',
        mode: '',
        isOpen: undefined
      },
      ruleValidate: {
        value: [{ required: true, message: '不能为空', trigger: 'blur' }],
        intervalValue: [{ required: true, message: '不能为空!', trigger: 'blur' }]
      },
      sendNewStatus: {
        isOpen: false
      }
    }
  },
  components: {},
  mounted() {
    this.getNewsStatus()
    // this.queryNews();
  },
  watch: {
    'formData.mode': function () {
      if (this.formData.mode === 'timing') {
        this.formData.intervalValue = 1
      } else {
        this.formData.intervalValue = parseInt(this.formData.value) || 1
      }
    }
  },
  methods: {
    switchSendNews(isOpen) {
      Api.post('/news/switchSendNews', { isOpen: isOpen }).then(res => {})
    },
    getNewsStatus() {
      Api.get('/news/getSendNewsStatus').then(res => {
        this.sendNewStatus = res
      })
    },
    openSettig() {
      this.formData = { ...this.formData, ...this.sendNewStatus }
      this.sendNewsModal = true
    },
    setSendConfig() {
      this.$refs['formValidate'].validate(valid => {
        if (valid) {
          Api.post('/news/changeSendNewsConfig', {
            value: this.formData.mode === 'timing' ? this.formData.value : this.formData.intervalValue + '',
            mode: this.formData.mode,
            isOpen: this.formData.isOpen
          }).then(res => {
            this.sendNewStatus = { ...res }
            this.sendNewsModal = false
            this.switchSendNews(this.formData.isOpen)
          })
        }
      })
    },
    cancel() {
      this.sendNewsModal = false
      this.$refs['formValidate'].resetFields()
    },

    queryNews() {
      instance
        .post('/query', {
          operationName: '',
          query: '',
          variables: {
            tags: [],
            category: '5562b415e4b00c57d9b94ac8',
            first: 20,
            after: '',
            order: 'POPULAR'
          },
          extensions: {
            query: { id: '653b587c5c7c8a00ddf67fc66f989d42' }
          }
        })
        .then(res => {
          this.news = res.articleFeed.items.edges
        })
    }
  }
}
</script>

<style lang="less" scoped>
.t1 {
  padding: 0 20px 20px 20px;
  h1 {
    text-align: center;
    font-weight: normal;
    margin: 40px auto;
  }
  .item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 40px;
    i {
      cursor: default !important;
      font-size: 40px;
      margin-right: 20px;
      color: @primary-color !important;
    }
  }
}
.news-title {
  font-size: 18px;
}
.t2 {
  padding: 20px;
  height: 80vh;
  a:hover {
    color: @primary-color;
  }

  ul {
    overflow-y: scroll;
    height: 90%;
  }
  li {
    margin-bottom: 20px;
  }
  .send-tip {
    font-style: normal;
    padding: 0 10px;
  }
  .new-setting {
    cursor: pointer;
    text-align: right;
  }
}
</style>
