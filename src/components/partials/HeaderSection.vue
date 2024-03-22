<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a class="navbar-brand" :href="jobscanDomain" target="_blank"><img class="index-logo" alt="Jobscan logo" src="../../assets/logo-transparent.png"></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only"></span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact Us</a>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script>
export default {
data() {
  return {
    jobscanDomain: process.env.VUE_APP_JOBSCAN_DOMAIN
  }
}
}
</script>
<style>
.index-logo{
width: 100px;
}
.navbar{
padding: 10px;
}
.navbar-brand{
margin-left: 5%;
}
</style>



