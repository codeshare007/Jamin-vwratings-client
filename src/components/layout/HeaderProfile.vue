<template>
  <div class="headerProfile">
    <div class="headerProfile__button" @click="hidden = !hidden">
      <span class="headerProfile__name">{{ profile.username }}</span>
      <b-avatar :src="profile.avatar" size="1.5rem"/>
    </div>
    <transition name="fade">
      <div class="headerProfile__menu" v-if="!hidden">
        <button @click="$router.push({ name: 'ratings.profile' }).catch(err => {}); hidden = true">profile</button>
        <a v-if="isAdmin" href="/admin">admin</a>
        <button @click="emitLogout">logout</button>
      </div>
    </transition>
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      hidden: true,
    }
  },

  computed: {
    profile() {
      return this.$store.getters['auth/profile']
    },
    isAdmin() {
      return this.$store.getters['auth/isAdmin']
    }
  },

  methods: {
    emitLogout() {
      this.logout().then(() => {
        this.$router.push({name: 'auth.signin'})
      })
    },

    ...mapActions({
      logout: 'auth/LOGOUT'
    })
  }
}
</script>
<style lang="scss">
.headerProfile {
  position: relative;
  margin-left: 30px;

  a,
  &__button {
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid white;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  }

  &__name {
    color: white;
    font-size: 21px;
    font-weight: 300;
    text-transform: lowercase;
    margin-bottom: 3px;
  }

  .b-avatar {
    margin-left: 15px;
  }

  a,
  button {
    background: unset;
    border: 0;
    font-size: 24px;
    font-weight: 300;
    width: 100%;
    display: block;
    color: white;
    text-align: center;
    padding: 4px 10px;
    background: #15161c;

    &:hover {
      background: white;
      color: black;
    }
  }

  a:hover {
    text-decoration: unset;
  }

  &__menu {
    top: 50px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid white;
    z-index: 1;
    position: absolute;

    button {
      &:focus {
        outline: unset;
        border: unset;
      }
    }
  }
}
</style>
