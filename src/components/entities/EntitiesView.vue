<template>
  <transition name="fade">
    <div class="entityView" style="min-height: 85vh" v-if="screenLoaded" :class="{ 'entityView--claimed': item.claim && item.claim.user_id }">
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

  .vue-star-rating-rating-text[data-v-fde73a0c] {
    width: 20px;
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
