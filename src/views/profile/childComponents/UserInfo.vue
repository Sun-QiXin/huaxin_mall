<template>
  <div class="user-info">
    <img class="avatar" src="~assets/img/profile/avatar.svg" alt="">
    <div class="info">
      <div class="login">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  .user-info {
    height: 85px;
    background-color: var(--color-tint);
    padding: 6px 15px;

    display: flex;
    color: #fff;
  }
  
  .user-info .avatar {
    width: 70px;
    height: 70px;
  }

  .info {
    padding-left: 15px;
    flex: 1;
  }

  .info .login {
    margin-top: 15px;
  }

  .phone img {
    width: 20px;
    height: 30px;
    vertical-align: middle;
    margin-left: -5px;
  }

  .phone span {
    font-size: 13px;
  }

  .arrow {
    width: 20px;
    line-height: 85px;
  }

  .arrow img {
    width: 20px;
  }
</style>