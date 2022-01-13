<template>
  <div class="headerProfile" id="dropdown">
    <div class="headerProfile__button" @click="menuOpened = !menuOpened">
      <span class="headerProfile__name">{{ profile.username }}</span>
      <b-avatar :src="profile.avatar" size="1.5rem"/>
    </div>
    <transition name="fade">
      <div class="headerProfile__menu" v-show="menuOpened">
        <button @click="emitProfile">profile</button>
        <button @click="emitAdmin" v-if="isAdmin">admin</button>
        <button @click="emitLogout">logout</button>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      menuOpened: false,
    }
  },

  created() {
    window.addEventListener('click', this.close)
  },

  beforeDestroy() {
    window.removeEventListener('click', this.close)
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
    toggle() {
      this.menuOpened = !this.menuOpened
    },

    close(e) {
      if (!this.$el.contains(e.target)) {
        this.menuOpened = false
      }
    },

    emitProfile() {
      this.$router.push({ name: 'ratings.profile.view' }).catch(() => {});
      this.hideMenu();
    },

    emitLogout() {
      this.hideMenu();
      this.logout().then(() => {
        this.$router.push({name: 'auth.signin'})
      });
    },

    hideMenu() {
      this.menuOpened = false;
      this.$emit('closed');
    },

    emitAdmin() {
      window.location.href = '/admin';
      this.hideMenu();
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
    width: fit-content;
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
