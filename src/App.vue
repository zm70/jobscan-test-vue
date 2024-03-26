<template>

  <div>
    <HeaderSection />
    <main role="main">
      <div>
        <WelcomeSection />
        <JobPositions />
      </div> 
    </main>
    <FooterSection />
  </div>

</template>

<script>

import HeaderSection from './components/partials/HeaderSection.vue'
import FooterSection from './components/partials/FooterSection.vue'
import WelcomeSection from './components/partials/WelcomeSection.vue'
import JobPositions from './components/pages/JobPositionsTypeScript.vue'

export default {
  name: 'App',
  components: {
    HeaderSection,
    FooterSection,
    JobPositions,
    WelcomeSection
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.zm-section{
  padding: 5%;
  background-color: lightblue;
  text-align: left;
}
</style>
