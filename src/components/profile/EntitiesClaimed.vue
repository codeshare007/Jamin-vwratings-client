<template>
  <div class="entitiesClaimed">
    <p class="m-0">Your claimed {{ entityLabel }}</p>
    <span class="text-center">Simply add a {{ entityLabel }} name and don't let the timer run out.</span>
    <div v-for="(item, i) in items" :key="i" class="entitiesClaimed__item">
      <div>{{ item[entityName].name }}</div>
      <div>
        <vue-countdown :time="countdown(item.claimed_until)" :interval="100" v-slot="{ totalHours, minutes, seconds }">
          {{ totalHours + ':' +  minutes + ':' + seconds }}
        </vue-countdown>
      </div>
      <div>
        <b-button variant="warning" size="sm"><b-icon-arrow-clockwise /></b-button>
      </div>
    </div>

    <div class="mt-3 mb-3 d-flex justify-items-start" v-if="!Object.keys(items).length">
      <b-input type="text" class="mr-3 w-50" v-model="form.name" :placeholder="`Enter ${entityLabel} name`" />
      <b-button variant="warning">Claim</b-button>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {

  props: {
    entity: Number
  },

  data() {
    return {
      items: [],
      entityName: 'avi',
      entityLabel: 'player',
      form: {
        name: null
      }
    }
  },

  watch: {
    entity(value) {
      if (value === 1) this.entityName = 'avi';
      if (value === 2) this.entityName = 'party';
      if (value === 1) this.entityLabel = 'player';
      if (value === 2) this.entityLabel = 'party';
      this.fetchClaimed();
    }
  },

  mounted() {
    this.fetchClaimed()
  },

  methods: {
    fetchClaimed() {
      this.loading = true;
      this.$api.profile.claimed().then(response => {

        if (this.entity === 1) this.items = response.data.data.avis;
        if (this.entity === 2) this.items = response.data.data.parties;
        this.loading = false;
      })
    },

    countdown(date) {
      let until = moment(date.until);
      let duration = moment.duration(until.diff(date.now));
      return duration['_milliseconds'];
    }
  }
}
</script>
<style lang="scss">
.entitiesClaimed {
  background: #3a6581;
  min-height: 100px;
  border-radius: 7px;
  padding: 15px 9px 3px;
  width: 100%;
  margin-bottom: 20px;

  &__item {
    margin-top: 10px;
    cursor: pointer;
    background: #4f83a5;
    padding: 10px;
    border-radius: 7px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>