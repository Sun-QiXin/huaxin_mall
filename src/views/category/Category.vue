<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <div slot="nav-bar-center">商品分类</div>
    </nav-bar>
    <tab-control v-show="isTabFixed" class="tab-control tab-control2"
                 :titles="['综合', '新品', '销量']" @tabClick="tabClick" ref="tabControl1"/>
    <div class="content">
      <tab-menu :categories="categories"
                @selectItem="selectItem"/>
      <scroll id="tab-content" :data="[categoryData]" ref="scroll"
              :probe-type="3" @scroll="ContentScroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"/>
          <tab-control :titles="['综合', '新品', '销量']"
                       @tabClick="tabClick" ref="tabControl2"/>
          <goods-list :goods="showCategoryDetail"/>
        </div>
      </scroll>
    </div>

    <back-top v-show="isShowBackTop" @click.native="backClick"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import TabMenu from './childComps/TabMenu'
  import TabContentCategory from './childComps/TabContentCategory'


  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
  import {POP, SELL, NEW, TOP_DISTANCE} from "commonjs/const";
  import {tabControlMixin, itemImgListenerMixin, backTopMixin} from "commonjs/mixin";

  export default {
    name: "Category",
    components: {
      NavBar,
      TabMenu,
      Scroll,
      TabContentCategory,
      GoodsList
    },
    mixins: [tabControlMixin, itemImgListenerMixin, backTopMixin],
    data() {
      return {
        categories: [],
        categoryData: {},
        currentIndex: -1,
        isTabFixed: false,
        saveY: 0,
        tabOffsetTop: 0
      }
    },
    created() {
      // 1.请求分类数据
      this._getCategory()
    },
    computed: {
      showSubcategory() {
        if (this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories
      },
      showCategoryDetail() {
        if (this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
      }
    },
    methods: {
      /**
       * 网络请求相关的方法
       */

      //1、拿到所有的分类数据
      _getCategory() {
        getCategory().then(res => {
          // 1)保存分类数据
          this.categories = res.data.category.list
          console.log(res);
          // 2)初始化每个类别的子数据
          for (let i = 0; i < this.categories.length; i++) {
            this.categoryData[i] = {
              subcategories: {},
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubcategories(0)
        })
      },

      //2、根据分类栏目的下标去请求相应的数据
      _getSubcategories(index) {
        this.currentIndex = index;
        const mailKey = this.categories[index].maitKey;
        getSubcategory(mailKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },

      //3、根据类型请求相应的商品数据（pop，new，sell）
      _getCategoryDetail(type) {
        // 1)获取请求的miniWallkey
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        // 2)发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // 3)将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
        })
      },

      /**
       * 事件响应相关的方法
       */
      //1、监听点击了哪个分类栏目
      selectItem(index) {
        this._getSubcategories(index)
      },

      //3、监听滚动的位置（使用scroll组件传过来的事件）
      ContentScroll(position) {
        //1)、监听BackTop是否显示
        this.isShowBackTop = position.y < -TOP_DISTANCE;

        //2)、判断tabControl是否需要吸顶显示
        this.isTabFixed = this.tabOffsetTop <= (-position.y);
      },

      //1、监听tabControl的点击,mixin里的tabClick发生点击事件并调用此方法
      _tabClick(){
        this.$refs.tabControl1.currentIndex = this.MixinCurrentIndex;
        this.$refs.tabControl2.currentIndex = this.MixinCurrentIndex;
      },
    },
    mounted() {
      this.$bus.$on('gridViewImgLoad', () => {
        //refresh():重新计算 better-scroll,   this.$refs.scroll：组件创建完成才能执行后面函数
        this.mixinRefresh();
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        this.tabOffsetLeft = this.$refs.scroll.$el.offsetLeft;
      })
    },
    activated() {
      //一进入组件就滚动到离开时保存的位置
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, this.saveY, 10);
      //refresh():重新计算 better-scroll,
      this.$refs.scroll && this.$refs.scroll.refresh();
    },
    deactivated() {
      //1、保存离开时的位置
      this.saveY = this.$refs.scroll.getScrollY();

      //2、取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener);
    }
  }
</script>

<style scoped>
  #category {
    height: 100%;
  }

  .nav-bar {
    position: relative;
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
    z-index: 3;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
  }

  #tab-content {
    overflow: hidden;
    height: calc(100vh - 49px - 44px);
    flex: 1;
  }

  .tab-control2{
    position: absolute;
    width: calc(100% - 101px);
    z-index: 3;
    right: 0;
  }
</style>
