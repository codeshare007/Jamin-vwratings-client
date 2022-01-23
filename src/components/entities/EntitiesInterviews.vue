<template>
  <div class="entitiesInterviews">
    <div class="profileContainer">
      <div class="d-flex align-items-center mb-4">

        <b-button
          class="mr-4 btn-back"
          @click="$router.go(-1)"
          v-html="`Back`"
        />

        <div class="entitiesInterviews__disclaimer">
          <router-link :to="{name: 'ratings.contact'}">Message Us</router-link>
          if you dare to be interviewed or re-interviewed.
        </div>

        <div />
      </div>

      <b-row class="d-flex justify-content-center">
<b-col cols="4">	  
      <Adsense
        data-ad-client="ca-pub-3655622089482340"
        data-ad-slot="4037252704"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </Adsense>
	</b-col>
<b-col cols="6 d-flex flex-column justify-content-center">	
        <router-link
          :to="{ name: `ratings.${entities}.interview.view`, params: {id: item[entity].id }}"
          class="entityItem mr-3 text-white"
          v-html="item[entity].name"
          v-for="(item, key) in interviews" :key="key"
        />
	</b-col>		
      </b-row>
    </div>
  </div>
</template>
<script>
export default {

  props: {
    entities: String,
    entity: String
  },

  data() {
    return {
      interviews: []
    }
  },

  mounted() {
    this.fetchInterviews()
  },

  methods: {
    fetchInterviews() {
      this.$api[this.entities].fetchInterviews().then(response => {
        this.interviews = response.data;
      })
    }
  }
}
</script>
<style lang="scss">
.entitiesInterviews {
  @media screen and (min-width: 1024px) {
    padding: 0 150px;
  }

  &__disclaimer {
    color: #48c443;

    a {
      color: #25ed1d;
      text-decoration: underline;
    }
  }

  .profileContainer {
    background: rgb(41 73 94 / 75%);
    width: 100%;
    height: calc(100% - 20px);
    padding: 20px 25px;
    min-height: 250px;
    margin-bottom: 20px;
    border: 1px solid #18786f;
  }

  .btn-back {
    background: #3c786b;
    border: 1px solid #082b30;
    font-size: 12px;
  }

  .entityItem {
    font-size: 20px;
  }
}
</style>