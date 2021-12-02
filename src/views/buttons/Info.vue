<template>
  <transition name="fade">
    <div class="specialOne" v-if="loading">
      <div class="blackContainer">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="tabs">
                <div class="tab">
                  <input type="radio" id="rd1a" name="rd">
                  <label class="tab-label" for="rd1a">Party List</label>
                  <div class="tab-content">
                    The names on the party list are the people that host parties.<br>The party section is for rating party experiences.
                  </div>
                </div>
                <div class="tab">
                  <input type="radio" id="rd1" name="rd">
                  <label class="tab-label" for="rd1">Claiming Players</label>
                  <div class="tab-content">
                    It's easy to claim your player.  Just go to your profile page and do it. <br>
                    Once claimed, all negative comments will be removed, however, pics will remain.  Any future negative comments must be proven with pic otherwise they will not be posted.<br> Keeping your player claimed is up to you but once unclaimed, all negative comments will be reinstated. <br> Be a good player!
                  </div>
                </div>
                <div class="tab">
                  <input type="radio" id="rd2" name="rd">
                  <label class="tab-label" for="rd2">Claiming Parties</label>
                  <div class="tab-content">
                    Claiming parties is just like claiming a player.  However, the party host is the player being claimed.<br>You can claim one or both. Up to you!
                  </div>
                </div>
                <div class="tab">
                  <input type="radio" id="rd3" name="rd">
                  <label class="tab-label" for="rd3">Adding Names</label>
                  <div class="tab-content">
                    To add names simply fill in the box, as you type a list will appear, check to see if the name is already listed. If you see it then it has already been added.
                  </div>
                </div>
                <div class="tab">
                  <input type="radio" id="rd4" name="rd">
                  <label class="tab-label" for="rd4">Searching Lists</label>
                  <div class="tab-content">
                    Search the main list or use the drop down feature to filter lists.<br>  Start typing and the list will change until you narrow it down.<br> If you don't see them..add them! 
                  </div>
                </div>
                <div class="tab">
                  <input type="radio" id="rd5" name="rd">
                  <label class="tab-label" for="rd5">Rating</label>
                  <div class="tab-content">
                    Rating is pretty straight foward. Click the stars to rate your interaction with this player.<br>  If you happen to change your mind you can always change your rating.
                  </div>
                </div>
                <div class="tab">
                  <input type="radio" id="rd6" name="rd">
                  <label class="tab-label" for="rd6">Commenting</label>
                  <div class="tab-content">
                    Decide if your comment is Negative or Postive.<br>
					The more information you give the better the comments help other players.<br> 
					Your comments should be your opinion, not an argument, or attacking someone else's comment.<br>
					If your comment is removed it probably wasn't helpful in any way. Please think about your comments before you post them. <br>
					You don't have to have respect for the name you are commenting on, but you do have to have respect for the people reading the comments.<br><br>
					You can now put your pics with your posts
                  </div>
                </div>				
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      loading: false
    }
  },

  mounted() {
    this.loading = true;
  }
}
</script>
<style lang="scss">
.specialOne {

body {
  color: #2c3e50;
  background: #ecf0f1;
  padding: 0 1em 1em;
}
h1 {
  margin: 0;
  line-height: 2;
  text-align: center;
}
h2 {
  margin: 0 0 .5em;
  font-weight: normal;
}
input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
// Layout
.row {
  display:flex;
  .col {
    flex:1;
    &:last-child {
      margin-left: 1em;
    }
  }
}
/* Accordion styles */
.tabs {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 4px -2px rgba(0,0,0,0.5);
}
.tab {
  width: 100%;
  color: white;
  overflow: hidden;
  &-label {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    background: #2c3e50;
    font-weight: bold;
    cursor: pointer;
    /* Icon */
    &:hover {
      background: darken(#2c3e50, 10%);
    }
    &::after {
      content: "\276F";
      width: 1em;
      height: 1em;
      text-align: center;
      transition: all .35s;
    }
  }
  &-content {
    max-height: 0;
    padding: 0 1em;
    color: #2c3e50;
    background: white;
    transition: all .35s;
  }
  &-close {
    display: flex;
    justify-content: flex-end;
    padding: 1em;
    font-size: 0.75em;
    background: #2c3e50;
    cursor: pointer;
    &:hover {
      background: darken(#2c3e50, 10%);
    }
  }
}

// :checked
input:checked {
  + .tab-label {
    background: darken(#2c3e50, 10%);
    &::after {
      transform: rotate(90deg);
    }
  }
  ~ .tab-content {
    max-height: 100vh;
    padding: 1em;
  }
}

}
</style>