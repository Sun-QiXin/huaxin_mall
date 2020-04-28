<template>
  <div id="profile">
    <nav-bar class="nav-bar"><div slot="center">我的档案</div></nav-bar>
    <user-info/>
    <account-info/>
    <normal-list-view :list-data="orderList"/>
    <normal-list-view :list-data="serviceList"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import UserInfo from './childComponents/UserInfo'
  import AccountInfo from './childComponents/AccountInfo'
  import NormalListView from './childComponents/NormalListView'

  export default {
    name: "Profile",
    components: {
    	NavBar,
      UserInfo,
      AccountInfo,
      NormalListView
    },
    data() {
    	return {
		    orderList: [
			    {icon: 'message.svg', info: '我的消息'},
			    {icon: 'pointer.svg', info: '积分商城'},
			    {icon: 'vip.svg', info: '会员卡'},
		    ],
		    serviceList: [
			    {icon: 'cart.svg', info: '我的购物车'},
			    {icon: 'shopping.svg', info: '下载购物APP'},
		    ]
      }
    }
  }
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
