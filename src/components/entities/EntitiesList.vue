<template>
  <transition name="fade">
    <div class="entitiesList" v-if="screenLoaded">
      <b-modal
        ref="createModal"
        ok-title="Add"
        size="lg"
        ok-variant="dark"
        hide-footer
        modal-class="entitiesList__modal"
        title="Add a Name">

        <b-form @reset="closeCreateForm">
          <span class="d-block mb-3 text-center">Names that pop up are already added</span>
          <span class="d-block text-danger mb-3 text-center font-weight-bold" v-if="createError" v-html="createError"/>
          <b-row class="justify-content-center">
            <b-col cols="6">
              <b-form-group>
                <b-form-input v-mask="mask" type="text" placeholder="Enter Name" v-model="form.name"/>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row v-if="form.name">
            <b-col v-for="(item, key) in this.suggestions" :key="key" cols="3">
              <b-button
                :to="redirectToItem(item.id)"
                variant="light"
                size="sm"
                class="mb-2"
                v-html="item.name"
              />
            </b-col>
          </b-row>

          <div class="d-flex justify-content-end mt-5">
            <b-button variant="secondary" type="reset" class="mr-2">Cancel</b-button>
            <b-button variant="primary" @click="create">Add</b-button>
          </div>
        </b-form>

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
          <button class="entitiesList__button mr-2" @click="showCreateDialog">Add name</button>
        </div>
      </b-row>

      <b-row class="d-flex justify-content-center">
        <div class="d-flex justify-content-between">
          <b-form-select v-model="params.type" class="mr-2">
            <b-form-select-option
              v-for="(item, key) in this.types"
              :key="key"
              :value="key"
              v-html="item"
            />
          </b-form-select>
          <input
            class="form-control mb-3"
            placeholder="Search..."
            type="text"
            v-model="search"
          >
        </div>
      </b-row>
	<b-row class="d-flex justify-content-center">
<b-col cols="4">	  
      <Adsense
        data-ad-client="ca-pub-3655622089482340"
        data-ad-slot="4685794438"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </Adsense>
	</b-col>
<b-col cols="6">	  
        <router-link
          class="d-block"
          v-for="(item, i) in this.items" :key="i"
          :to="redirectToItem(item.id)"
          v-html="item.name"
        />
		</b-col>
	</b-row>
      <div v-if="items.length === 0">
        <p class="text-center">No name matches your search... you can add it.</p>
      </div>

      <div v-if="loading" class="d-flex justify-content-center mt-3 align-items-center" style="min-height: inherit;">
        <b-spinner/>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    entity: String,
    method: String
  },
  data() {
    return {
      items: [],
      suggestions: [],
      search: null,
      currentPage: 1,
      loading: true,
      createError: null,
      screenLoaded: false,
      types: {
        full_list: 'All',
        good_list: 'Good',
        bad_list: 'Bad',
        comments: 'Comments',
        pics: 'Pics'
      },
      form: {
        name: null
      },
      params: {
        type: 'full_list',
        per_page: 50
      },
      mask: {
        mask: 'SSSSSSSSSSSSSSSS',
        tokens: {'S': {pattern: /[0-9a-zA-Z ]/}}
      },
    }
  },

  computed: {
    loggedIn() {
      return this.$store.getters['auth/loggedIn']
    },
    isLimited() {
      return this.$store.getters['auth/isLimited'];
    }
  },

  watch: {
    'form.name'(value) {
      if (value && value.length >= 2) {
        this.searchItems();
      }
    },
    search(data) {
      if (data) {
        this.params.search = data;
        this.fetchItems();
      } else {
        delete this.params.search;
        this.fetchItems();
      }
    },
    'params.type'() {
      this.currentPage = 1;
      this.$router.push({query: {type: this.params.type}});
      this.items = [];
      this.fetchItems();
    }
  },

  mounted() {
    if (typeof this.$route.query.type !== 'undefined') {
      this.params.type = this.$route.query.type;
    } else {
      this.fetchItems();
    }
    this.lazyLoad();
  },

  methods: {
    redirectToItem(id) {
      const routeName = `ratings.${this.method}.view`
      return {name: routeName, params: {id: id}}
    },

    closeCreateForm() {
      this.createError = null;
      this.form.name = null;
      this.$refs['createModal'].hide();
    },

    create(e) {
      e.preventDefault();
      this.createError = null;
      this.$api[this.method].create(this.form).then(response => {
        if (response.data.status === 'success') {
          const item = response.data.data;
          this.$router.push({
            name: `ratings.${this.method}.view`,
            params: {id: item.id}
          })

          this.$refs['createModal'].clear();
        }
      }).catch(error => {
        if (error.response.data.status === 'error') {
          this.createError = error.response.data.message;
        }
      })
    },

    searchItems() {
      this.$api[this.method].fetch(1, {search: this.form.name, per_page: 5000}).then(response => {
        this.suggestions = response.data.data
      })
    },

    fetchItems(lazy = false) {
      this.loading = true;
      this.$api[this.method].fetch(this.currentPage, this.params).then(response => {
        lazy ? this.items = [...this.items, ...response.data.data] : this.items = response.data.data;
        if (!lazy) this.screenLoaded = true;
        this.loading = false;
      })
    },

    showCreateDialog() {
      let modalName = !this.loggedIn ?
        'notRegistered' :
        (this.isLimited ? 'limitedModal' : 'createModal');

      if (modalName) this.$refs[modalName].show();
    },

    clear() {
      this.form.name = ''
    },

    lazyLoad() {
      window.onscroll = () => {
        let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight) ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          if (this.$route.name === `ratings.${this.method}.list`) {
            this.currentPage = this.currentPage + 1;
            this.loading = true;
            this.fetchItems(true)
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.entitiesList {
  padding-top: 40px;
  margin: 0 20px 40px;
  padding-bottom: 40px;
  display: block;
  background: #29495ebf;
  border: 1px solid #18786f;

  @media screen and (min-width: 1024px) {

  }

  .cursor-pointer {
    cursor: pointer;
  }

  &__modal {
    .modal-content {
      background-color: #aec3d1;
    }

    .modal-backdrop {
      opacity: .9;
    }

    .close:focus {
      outline: 0;
    }

    .modal-footer {
      border-top: 0;
    }

    .modal-header {
      border-bottom: 0;
    }
  }

  @media screen and (min-width: 1024px) {
    margin-right: 150px;
    margin-left: 150px;
  }

  &__button {
    background: #348336;
    color: white;
    border: 0;
    padding: 5px 15px;
    margin-bottom: 5px;
    border-radius: 5px;

    &:hover {
      background: #307832;
    }

    &:focus {
      outline: 0;
    }
  }

  a {
    color: #ffffff;
    font-size: 20px;

    &:hover {
      color: #02cf4a;
    }
  }
}
</style>