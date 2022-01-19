<template>
  <div class="homePage">
    <div class="homePage__container">
      <h1 class="text-center">Welcome to vwRatings!</h1>
      <h2 class="text-center">Behaviour ratings of vw players to highlight the awesome and expose the rotten.</h2>

      <div class="d-flex flex-column flex-lg-row justify-content-between mt-4">
        <div class="infoCard">1000s of player names</div>
        <div class="infoCard">1000s of comments & pics</div>
        <div class="infoCard">1000s of ratings</div>
      </div>

      <div class="mt-4">
        <p class="text-center m-0">
          Rate and comment about other vw players that you think are exceptional or just plain trouble.
        </p>
        <p class="text-center">Everything is anonymous....</p>
      </div>

      <div class="d-flex justify-content-center">
       <div align="center" class="homePage__gallery">
         <viewer>
           <img class="homePage__image" alt="Image 1" src="../assets/images/home/1.png" />
           <img class="homePage__image" alt="Image 2" src="../assets/images/home/2.jpeg" />
           <img class="homePage__image" alt="Image 3" src="../assets/images/home/3.jpg" />
           <img class="homePage__image" alt="Image 4" src="../assets/images/home/4.jpeg" />
         </viewer>
       </div>
     </div>
        <Adsense
          data-ad-client="ca-pub-3655622089482340"
          data-ad-slot="6351914106"
          data-ad-format="auto"
          data-full-width-responsive="true">
        </Adsense>
      <div class="row">
        <div class="column">
          <div class="card">
            <div class="topy">What can you do here</div>
            <div class="contain first">
              <ul>
                <li>Rate game players</li>
                <li>Talk about players</li>
                <li>Claim your own player</li>
                <li>Rate & talk about parties</li>
                <li>Nominate & vote best players</li>
                <li>Nominate & vote worst players</li>
                <li>Vent</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <div class="topy"> Rate other players</div>
            <div class="contain">
              <p>Show others what you think of different players. Rate them from 1 to 12. Your rating will average
                in with other's ratings and we will see what the players are really like.</p>
              Things aren't always as they seem
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <div class="topy"> Comment on other players</div>
            <div class="contain">
              <p>Voice your opinions and let others know about your encounters with other players.<br>Btw--It's much
                more useful to have substance in your comments instead of a couple of derogatory remarks.</p>
              Answer the why.
            </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="topy"> Claim your name</div>
            <div class="contain">
              <p>Protect your little character's name from unproven comments. But it doesn't protect you from
                pictures showing you being a bad little avi.</p>
              Don't be one of those players that takes pride in being a total idiot.
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <div class="topy"> Rate party throwers</div>
            <div class="contain">
              <p>Let others know who throws the best parties or the worst. Which parties are fun and creative. Tell
                others about bad experiences while partying.</p>
              Announce upcoming party events if you like.
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <div class="topy"> Vote for best and worst players</div>
            <div class="contain">
              <p>Nominate and vote for the best players and the worst. We will showcase them so everyone knows who
                to enjoy or block.</p>
              It may be a game but respect is still key.
            </div>
          </div>
        </div>
		
        <div class="column">
          <div class="card">
            <div class="topy"> View Pics</div>
            <div class="contain">
              <p>See all the cool things and the trash that your fellow players have been caught doing. Hopefully you don't see yourself on the trash side.</p>
              Maybe you can snap a creep.
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <div class="topy"> Read Interviews</div>
            <div class="contain">
              <p>Get to know other players better. Read what they say when asked random questions from us. Some are fun and some are serious.</p>
              We dare you to do one.
            </div>
          </div>
        </div>		
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.homePage {

  &__container {
    border: 1px solid #18786f;
    background-color: #29495ebf;
    padding: 20px;
    margin: 20px;

    @media screen and (min-width: 1024px) {
      margin: 0 150px 20px;
      padding: 40px 30px;
    }
  }

  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 20px;
  }

  .infoCard {
    background: #336a7e;
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;

    @media screen and (min-width: 1024px) {
      max-width: 32%;
      flex: 0 0 32%;
      margin-bottom: 0;
    }
  }

  &__gallery {
    width: 345px;
    margin-bottom: 25px;
  }

  &__image {
    cursor: pointer;
    margin: 5px;
    width: 160px;
    height: 160px;
  }

  .column {
    float: left;
    width: 50%;
    margin-bottom: 16px;
    padding: 0 8px;
  }

  .card {
    background-color: transparent;
    border: 1px solid #99ff6666;
    border-radius: .25rem;
    margin: 8px;
    min-height: 220px;
  }

  .about-section {
    padding: 50px;
    text-align: center;
    background-color: #336a7e;
    color: white;
  }

  .contain {
    padding: 0 16px;
  }

  .contain::after, .row::after {
    content: "";
    clear: both;
    display: table;
  }

  .title {
    color: grey;
  }

  hr {
    margin: 0.3rem 0;
  }

  .topy {
    background-color: #336a7e;
    margin-bottom: 7px;
    text-align: center;
  }

  .first {
    text-align: left;
  }

  @media screen and (max-width: 768px) {
    .column {
      width: 100%;
      display: block;
    }
  }
  @media(max-width: 768px) and (min-width: 600px) {
    .card {
      width: 60%;
      margin: auto;
    }
  }
}
</style>