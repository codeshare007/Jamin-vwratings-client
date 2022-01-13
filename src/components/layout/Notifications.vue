<template>
  <div class="notificationsWidget">
    <div class="notificationsWidget__button" @click="notificationsOpened = !notificationsOpened">
      <b-avatar v-if="profile.notifications_count" badge variant="transparent" badge-variant="danger">
        <font-awesome-icon icon="bell" size="lg"/>
        <template #badge>{{ profile.notifications_count }}</template>
      </b-avatar>
      <b-avatar v-else variant="transparent" badge-variant="danger">
        <font-awesome-icon icon="bell" size="lg"/>
      </b-avatar>
    </div>
    <transition name="fade">
      <div class="notificationsWidget__menu" v-show="notificationsOpened">

        <div class="d-flex justify-content-between mb-3 align-items-center pr-3 pl-3">
          <h5 class="mb-0">Notifications</h5>
          <button
            class="mark-btn"
            v-if="Object.keys(notifications).length > 0"
            @click="emitMarkAll()">Mark all as read
          </button>
        </div>

        <div class="notificationItem"
             :class="{'notificationItem--unread': item.status === 1 || !item.hasOwnProperty('status')}"
             v-for="(item, key) in notifications"
             :key="key">
          <div class="notificationItem__content">
            {{ item.content }}
          </div>
        </div>

        <div class="text-center mt-2 mb-2" v-if="Object.keys(notifications).length > 0">
          <button class="view-btn" @click="emitViewAll()">View all</button>
        </div>

        <div v-if="!Object.keys(notifications).length" class="text-center mb-3">There is no notifications</div>
      </div>
    </transition>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

export default {
  data() {
    return {
      notificationsFetched: false,
      notificationsOpened: false,
      notifications: [],
      profile: {
        notifications_count: 0
      }
    }
  },

  watch: {
    notificationsOpened(value) {
      if (value && !this.notificationsFetched) this.fetchNotifications();
    }
  },

  created() {
    window.addEventListener('click', this.close)
  },

  beforeDestroy() {
    window.removeEventListener('click', this.close)
  },

  mounted() {
    this.profile = this.getProfile();
  },

  methods: {
    ...mapActions({fetchProfile: 'auth/GET_PROFILE'}),
    ...mapGetters({getProfile: 'auth/profile'}),

    fetchNotifications() {
      this.$api.profile.notifications().then(response => {
        this.notifications = response.data.data;
        this.notificationsFetched = true;
      })
    },

    toggle() {
      this.notificationsOpened = !this.notificationsOpened
    },

    close(e) {
      if (!this.$el.contains(e.target)) {
        this.notificationsOpened = false
      }
    },

    emitViewAll() {
      this.$router.push({name: 'ratings.profile.notifications'});
      this.hideMenu();
    },

    emitMarkAll() {
      this.$api.profile.readNotifications().then(response => {
        if (response.data.status === 'success') {
          this.fetchNotifications();
          this.fetchProfile().then(() => {
            this.profile = this.getProfile();
            this.hideMenu();
          })
        }
      })
    },

    hideMenu() {
      this.notificationsOpened = false;
      this.$emit('closed');
    },

    ...mapActions({
      logout: 'auth/LOGOUT'
    })
  }
}
</script>
<style lang="scss">
.notificationsWidget {
  position: relative;

  &__button {
    cursor: pointer;
    border-radius: 5px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
  }

  &__menu {
    top: 60px;
    width: 300px;
    background: #274457;
    right: 10px;
    border-radius: 10px;
    border: 3px solid #2cc7b8;
    box-shadow: 1px 1px 14px 9px #18786f6e;
    z-index: 1;
    padding: 16px 0 0;
    position: absolute;

    button {
      &:focus {
        outline: unset;
        border: unset;
      }
    }
  }

  .view-btn,
  .mark-btn {
    color: #78f9ed;
    background: unset;
    border: 0;

    &:hover {
      text-decoration: underline;
    }
  }

  .notificationItem {
    border-top: 1px solid #18786f;
    border-bottom: 1px solid #18786f;

    &--unread {
      background: #157272;
      border-top: 1px solid #20bfb0;
    }

    &__content {
      max-height: 85px;
      overflow: hidden;
      word-break: break-all;
      padding: 7px 19px 20px;
    }
  }
}
</style>