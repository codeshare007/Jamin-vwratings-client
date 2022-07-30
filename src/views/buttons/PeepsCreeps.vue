<template>
  <transition name="fade">
    <div class="peepsCreepsPage" v-if="loading">
      <div class="blackContainer">
        <div class="text-center">
          <p class="mb-4">
            Nominate and vote on your favorite players and the worst players you
            know.<br />Peeps will get treats.<br />Creeps are just creeps.
          </p>
          <h2 class="mb-4">COMING SOON</h2>
        </div>
        <div class="sidey text-center">
          <b-button :to="{name: 'ratings.peeptimer'}">Peeps</b-button>
          <br />
          Peeps = Decent players
        </div>
        <div class="sidey text-center">
          <b-button :to="{name: 'ratings.creeptimer'}">Creeps</b-button>
          <br />
          Creeps = Not so decent
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    };
  },

  mounted() {
    this.loading = true;
  },
  methods: {
  },
};
</script>
<style lang="scss">
.peepsCreepsPage {
  .btn-secondary {
    color: #fff;
    background-color: transparent;
    border-color: #99ff66;
    font-size: 1rem;

    &:hover {
      color: #57bd25;
      background-color: #ffffff;
      border-color: #57bd25;
    }
  }

  .sidey {
    border: none;
    padding: 1rem 1rem;
    vertical-align: middle;
    width: 45%;
    margin-bottom: 40px;
    display: inline-block;
  }
}
</style>