<template>
  <transition name="fade">
    <div class="peeps">
      <div class="blackContainer">
        <div class="timer">
          <template>            
            <div class="peeplist">
              <div class="text-center">
                <h4>VW Peeps</h4>
                <p>These are the players that are voted as most liked by their peers.</p>
				
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
.peeps {

.col-6 {
  max-width: fit-content;
}

.blackContainer {
  padding-top: 0;
}
}

</style>