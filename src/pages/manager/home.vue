<template>
  <div>
    <section class="container">
      <div class="content-wrap">
        <div class="content">
          <div id="focusslide" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#focusslide" data-slide-to="0" class="active"></li>
              <li data-target="#focusslide" data-slide-to="1"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <div class="item active">
                <a target="_blank" title="木庄网络博客源码">
                  <img
                    src="../../assets/images//201610181557196870.jpg"
                    alt="木庄网络博客源码"
                    class="img-responsive"
                  >
                </a>
              </div>
              <div class="item">
                <a target="_blank" title="专业网站建设">
                  <img
                    src="../../assets/images//201610241227558789.jpg"
                    alt="专业网站建设"
                    class="img-responsive"
                  >
                </a>
              </div>
            </div>
            <a
              class="left carousel-control"
              href="#focusslide"
              role="button"
              data-slide="prev"
              rel="nofollow"
            >
              <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
              <span class="sr-only">上一个</span>
            </a>
            <a
              class="right carousel-control"
              href="#focusslide"
              role="button"
              data-slide="next"
              rel="nofollow"
            >
              <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
              <span class="sr-only">下一个</span>
            </a>
          </div>
          <br/> <br/> <br/>
          <div class="title">
            <h3>最新发布</h3>
            <div class="more">
              <a title="积极">积极</a>
              <a title="高效">高效</a>
              <a title="乐观">乐观</a>
              <a title="善思">创新</a>
              <a title="实践">实践</a>
            </div>
          </div>

          <div v-for="article in listData">
            <br/>
            <article class="excerpt excerpt-4 article" style>
              <a class="focus" title="article.title" target="_blank">
                <router-link :to="{name:'edit',path:'/manager/edit',params:{art:article}}">
                  <img
                    class="articleImg"
                    data-original="../../assets/images/201610181739277776.jpg"
                    src="../../assets/images/201610181739277776ed.jpg"
                    alt="素青"
                  >
                </router-link>
              </a>
              <header>
                <a class="cat" title="标签">{{tags(article.tag)}}
                  <i></i>
                </a>
                <h2>
                  <a title="标题" target="_blank">{{article.title}}</a>
                </h2>
              </header>
              <p class="meta">
                <time class="time">
                  <i class="glyphicon glyphicon-time"></i> {{timestampToTime(article.createAt)}}
                </time>
                <span class="views">
                  <i class="glyphicon glyphicon-eye-open"></i> {{article.counter.view}}
                </span>
                <span class="views">
                  <i class="glyphicon glyphicon-comment"></i> {{article.counter.comment}}
                </span>
              </p>
              <p class="note">{{article.keyWord}}</p>
            </article>
          </div>

          <br/><br/><br/>
          <!--<nav class="pagination" style="display: inline;">
            <ul>
              <li class="prev-page disabled">
                <a>上一页</a>
              </li>

              <li class="active"  v-for="page in pages.pageShow">
                <span>{{page}}</span>
              </li>
              <li>
                <a href="?page=2">24</a>
              </li>
              <li class="next-page">
                <a href="?page=2">下一页</a>
              </li>
              <li>
                <span>共 {{parseInt(pages.total/pages.pageSize) + 1}} 页</span>
              </li>
            </ul>
          </nav>-->

          <template>
            <Page :total="total" :pageSize="limit" :current="listPageNum" @on-change="getList" />
          </template>

        </div>
      </div>
      <div class="tlinks">Collect from
        <a href="http://www.cssmoban.com/">企业网站模板</a>
      </div>
      <aside class="sidebar">
        <div class="fixed">
          <div class="widget widget-tabs">
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active">
                <a href="#notice" aria-controls="notice" role="tab" data-toggle="tab">统计信息</a>
              </li>
              <li role="presentation">
                <a href="#contact" aria-controls="contact" role="tab" data-toggle="tab">联系我</a>
              </li>
            </ul>
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane contact active" id="notice">
                <h2>
                  日志总数:
                  88篇
                </h2>
                <h2>
                  网站运行:
                  <span id="sitetime">66天</span>
                </h2>
              </div>
              <div role="tabpanel" class="tab-pane contact" id="contact">
                <h2>
                  QQ:
                  <a
                    href
                    target="_blank"
                    rel="nofollow"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title
                    data-original-title="QQ:"
                  ></a>
                </h2>
                <h2>
                  Email:
                  <a

                    target="_blank"
                    data-toggle="tooltip"
                    rel="nofollow"
                    data-placement="bottom"
                    title
                    data-original-title="#"
                  ></a>
                </h2>
              </div>
            </div>
          </div>
          <div class="widget widget_search">
              <div class="input-group">
                <input
                  type="text"
                  name="keyword"
                  class="form-control"
                  size="35"
                  placeholder="请输入关键字"
                  maxlength="15"
                  autocomplete="off"
                  v-model="searchKey"
                >
                <span class="input-group-btn">
                  <button class="btn btn-default btn-search" @click="searchArticle" name="search" >搜索</button>
                </span>
              </div>
          </div>
        </div>
        <div class="widget widget_hot">
          <h3>最新评论文章</h3>
          <ul>

            <li><a title="要坐直" href="#"><span class="thumbnail">
            <img class="thumb" src="../../assets/images/rhinoceros.gif" alt="用傻笑世界" style="display: block;">
            </span><span class="text">坐直凝气神</span><span class="muted"><i class="glyphicon glyphicon-time"></i>
            2016-11-01
            </span><span class="muted"><i class="glyphicon glyphicon-eye-open"></i>88</span></a></li>
            <li><a title="多活动" href="#"><span class="thumbnail">
            <img class="thumb" data-original="../../assets/images/201610181739277776.jpg"
                 src="../../assets/images/201610181739277776ed.jpg" alt="以柔布棋局" style="display: block;">
            </span><span class="text">锻身为基础</span><span class="muted"><i class="glyphicon glyphicon-time"></i>
            2016-11-01
            </span><span class="muted"><i class="glyphicon glyphicon-eye-open"></i>88</span></a></li>

          </ul>
        </div>
<!--        <div class="widget widget_sentence">
          <a target="_blank" rel="nofollow" title="MZ-NetBlog主题">
            <img style="width: 100%" src="../../assets/images/ad.jpg" alt="MZ-NetBlog主题">
          </a>
        </div>-->
        <div class="widget widget_sentence">
          <h3>友情链接</h3>
          <div class="widget-sentence-link">
            <a title="网站建设" target="_blank">网站建设</a>
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>

<!--

<script src="js/bootstrap.min.js"></script>
<script src="js/jquery.ias.js"></script>
<script src="js/scripts.js"></script>
<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/nprogress.js"></script>
<script src="js/jquery.lazyload.min.js"></script>
-->

<script>
  // app预设置
  export default {
    name: "managerIndex",
    components: {},
    data() {
      return {
        // searchKey可选项目列表 （搜索无种类选择功能可删除此变量）
        // val为列表值
        // name为显示名
        searchKey: "",
//        pages:{
//          pageSize: 5, // string类型，列表每页记录数
//          total: 23, // Number类型，列表的长度
//          pageShow:[1,2]
//        }
      };
    },
    computed: {
      ...mapState("article", [
        "listData", // 主列表数据
        "listLoading", // 主列表loading状态
        "listPageNum", // 主列表页码
        "limit",
        "total"
      ]),
      ...mapGetters("base", ["paasCheck"])
    },
    methods: {
      ...mapActions("article", [
        "getList", // 获取数据
        "getArticle",
        "listChangePage" // 翻页
      ]),
      'tags': function (tag) {
        return tag.join(",")
      },
      'timestampToTime': function (stamp) {
        return timeTool.timestampToTime(stamp)
      },
      'searchArticle': function () {
        this.getArticle(this.searchKey)
      }
    },
    mounted() {
      this.getList(1);
    }

  };
  import {mapState, mapGetters, mapActions} from "vuex";

  import timeTool from '../../utils/time'
  //<link rel="apple-touch-icon-precomposed" href="../../assets/images/icon.png">
  //<link rel="shortcut icon" href="../../assets/images/favicon.ico">
</script>


<style scoped>
  @import "../../assets/css/nprogress.css";
  @import "../../assets/css/font-awesome.min.css";
  @import "../../assets/nav_files/mycolor.css";
  @import "../../assets/plugins/bootstrap/css/bootstrap.min.css";
  @import "../../assets/plugins/font-awesome/css/font-awesome.css";
  @import "../../assets/css/styles.css";

  .article {
    height: 150px;
  }

  .articleImg {
    border-radius: 5px;
    width: 220px;
    height: 130px;
    overflow: hidden;
    display: inline;
  }

</style>

