<template>
  <transition name="fade">
    <div class="creeps">
      <div class="blackContainer">
        <div class="timer">
          <template>            
            <div class="creeplist">
              <div class="text-center">
                <h4>VW Creeps</h4>
                <p>These are the players that are voted as most disliked by their peers.</p>
				
                <b-row class="d-flex justify-content-center">
                  <b-col cols="6">
                    <p>name linked to avi id page<p>
					<p>name linked to avi id page<p>
					<p>name linked to avi id page<p>
					<p>name linked to avi id page<p>
                  </b-col>
                </b-row>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      error: null,
    };
  },
};
</script>
<style lang="scss">
.creeps {

.col-6 {
  max-width: fit-content;
}

.blackContainer {
  padding-top: 0;
}
}

</style>