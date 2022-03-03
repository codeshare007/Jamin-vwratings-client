<template>
  <transition name="fade">
    <div class="entityView" style="min-height: 85vh" v-if="screenLoaded" :class="{ 'entityView--claimed': item.claim && item.claim.user_id }">
<b-modal
        ref="statsModal"
        ok-title="Add"
        size="lg"
        ok-variant="dark"
        hide-footer
        modal-class="entitiesList__modal"
        title="testing">
		<EntityStatistics v-if="loggedIn" :data="item.statistics" />
      </b-modal>

      <b-modal
        ref="notRegistered"
        ok-only
        ok-title="Close"
        modal-class="entitiesList__modal"
        ok-variant="secondary"
        title="No no no !!!">
        <div>You must log in first.</div>
      </b-modal>

      <b-modal
        ref="limitedModal"
        ok-only
        ok-title="Close"
        modal-class="entitiesList__modal"
        ok-variant="secondary"
        title="No no no !!!">
        <div>You are temporarily banned</div>
      </b-modal>

      <b-row class="d-flex justify-content-center mb-1">
        <div class="d-flex">
          <button class="entitiesList__button mr-2" @click="showCreateDialog">Stats</button>
        </div>
      </b-row>
      <EntityInfo
        :screen="screenBack"
        :item="item"
        @toggle-favorite="toggleFavorite()"
      />

      <EntityRate
        v-if="loggedIn && !isLimited"
        @rated="rate"
        :user_rating="item.user_rating"
      >
        <p>Fill the stars below. Change them anytime.</p>
        <p>Stars above are the total average of all ratings.</p>
      </EntityRate>

      <CommentForm
        v-if="loggedIn && !isLimited"
        :id="id"
        :method="method"
        :name="item.name"
        @send="fetchItem"
        :comments="item.comments"
      />

      <div v-if="isLimited === true">
        <h4 class="text-danger text-center">You are temporarily banned</h4>
      </div>

      <div v-if="loggedIn === false">
        <h4 class="text-danger text-center">Log in to rate and comment</h4>
      </div>

      <CommentList
        :comments="item.comments"
      />
    </div>
  </transition>
</template>
<script>
import EntityInfo from "./entity/EntityInfo";
import EntityRate from './entity/EntityRate';
import CommentForm from './entity/comments/CommentForm';
import CommentList from './entity/comments/CommentList';
import EntityStatistics from "./entity/EntityStatistics";

export default {
  props: {
    id: {},
    method: String
  },
  data() {
    return {
      item: {
        average_rating: null,
        user_rating: null,
        comments: []
      },
      screenLoaded: false,
    }
  },

  components: {
    EntityStatistics,
    EntityInfo,
    EntityRate,
    CommentForm,
    CommentList
  },

  mounted() {
    this.fetchItem();
  },

  computed: {
    screenBack() {
      return `ratings.${this.method}.list`
    },
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
    isLimited() {
      return this.$store.getters['auth/isLimited']
    }
  },

  methods: {

	closeCreateForm() {
      this.createError = null;
      this.form.name = null;
      this.$refs['statsModal'].hide();
    },
    showCreateDialog() {
      let modalName = !this.loggedIn ?
        'notRegistered' :
        (this.isLimited ? 'limitedModal' : 'statsModal');

      if (modalName) this.$refs[modalName].show();
    },	
    rate(value) {
      this.$api[this.method].rating(this.id, {rating: value})
        .then(() => this.fetchItem());
    },
    fetchItem() {
      this.$api[this.method].get(this.id).then(response => {
        this.item = response.data;
        this.screenLoaded = true;
        document.title = 'vwRatings — ' + this.item.name + ' Player Page'
      })
    },
    toggleFavorite() {
      this.$api[this.method].toggleFavorite(this.id).then(() => this.fetchItem())
    }
  }
}
</script>
<style lang="scss">
.entityView {
  background: rgb(41 73 94 / 75%);
  padding: 10px 30px;
  border: 1px solid #18786f;


  @media screen and (min-width: 1200px) {
    margin: 0 150px;
  }

  &--claimed {
    background: rgb(41 73 94 / 75%);
  }

  &__buttons {
    padding-bottom: 30px;
  }

  .vue-star-rating-rating-text[data-v-fde73a0c] {
    width: 20px;
  }

  @media screen and (min-width: 1024px) {
    &__buttons {
      padding: 20px;
    }
  }

  @media screen and (max-width: 1024px) {
    margin: 20px;
    padding: 7px 25px;
  }

  .btn {
    background: #3c786b;
    border: 1px solid #082b30;
    font-size: 12px;

    &.active, &:focus, &:active {
      outline: 0;
      box-shadow: none;
    }
  }

  hr {
    background: #0b6e58;
    height: 1px;
  }

  .form-group__error {
    border: 2px solid red;
    border-radius: 5px;
  }

  .commentItem__content {
    border-bottom: 1px solid #274a30;
  }
}
</style>
