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
        <p class="text-center m-0">Rate and comment about other vw players that you think are exceptional or just plain trouble.</p>
        <p class="text-center">Everything is anonymous....</p>
      </div>

      <div class="d-flex justify-content-center">
        <div class="homePage__gallery">
          <viewer>
            <img class="homePage__image" alt="Image 1" src="../assets/images/home/1.png" />
            <img class="homePage__image" alt="Image 2" src="../assets/images/home/2.jpeg" />
            <img class="homePage__image" alt="Image 3" src="../assets/images/home/3.jpg" />
            <img class="homePage__image" alt="Image 4" src="../assets/images/home/4.jpeg" />
          </viewer>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.homePage {


  &__container {
    background-color: rgba(0,0,0,.7);
    padding: 20px;
    margin: 20px;

    @media screen and (min-width: 1024px) {
      margin: 0 140px;
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
    background: #1c4a1d;
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
  }

  &__image {
    cursor: pointer;
    margin: 5px;
    width: 160px;
    height: 160px;
  }
}
</style>