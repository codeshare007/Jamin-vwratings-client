<template>
  <transition name="fade">
    <div class="peepsCreepsPage" v-if="loading">
      <div class="blackContainer">
        <div class="text-center">
		<h4>Peeps & Creeps</h4>
          <p class="mb-4">
            Nominate and vote on your favorite players and the worst players you
            know.<br />Peeps will get treats.<br />Creeps are just creeps.<br />Scroll to bottom for rules.
          </p>
        </div>
		<b-row class="side">
        <div class="sidey text-center">
          <b-button class="good" :to="{name: 'ratings.peeptimer'}">Peeps</b-button>
          <br />
          Peeps = Decent players
        </div>
        <div class="sidey text-center">
          <b-button class="bad" :to="{name: 'ratings.creeptimer'}">Creeps</b-button>
          <br />
          Creeps = Not so decent
        </div>
		</b-row>
		
        <Adsense
          data-ad-client="ca-pub-3655622089482340"
          data-ad-slot="2013033941"
          data-ad-format="auto"
          data-full-width-responsive="true">
        </Adsense>
		<div class="text-center mt-3">
			<p>You need to be a member to enter the pages<br />Any member can nominate a name<br />Any member can vote on names<br />The nomination/voting cycle repeats itself, so keep coming back.<br />Only three random nominations will make it to voting</p>
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
  .side {
	justify-content: space-evenly;
  }
.bad {
	border-color: #f00;
}	
}
</style>