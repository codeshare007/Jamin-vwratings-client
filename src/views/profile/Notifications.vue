<template>
  <transition name="fade">
    <div class="notificationsPage" v-if="loaded">
      <h2>Notifications</h2>
      <b-list-group class="notificationsPage__list">
        <b-list-group-item v-for="(notification, i) in notifications" :key="i" class="d-flex justify-content-between align-items-center">
          <span>{{notification.content}}</span>
          <!-- <span>{{notification.created_at}}</span> -->
          <!-- <b-button variant="danger" primary><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg></b-button> -->
        </b-list-group-item>
      </b-list-group>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      loaded: false,
      notificationsFetched: false,
      notifications: [],
    }
  },

  mounted() {
    this.fetchAllNotifications();
    this.loaded = true;
  },

  methods: {
    fetchAllNotifications() {
      this.$api.profile.notifications(1).then(response => {
        this.notifications = response.data.data;
        this.notificationsFetched = true;
      })
    },
  }
}
</script>
<style lang="scss">
  .notificationsPage {
    background: #157272;
    border-radius: 15px;
    padding: 20px 19px;
    .list-group {
      
    }
    .list-group-item {
      background-color: transparent;
      border-top: 1px solid rgb(68, 26, 26);
      border-radius: 0;
      color: rgb(255,255,255);
    }
  }
  
</style>