<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/"><i class="fa fa-home" aria-hidden="true"></i> Home</router-link>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item me-4">
              <router-link class="nav-link" to="/list-student">
                <i class="fa fa-users" aria-hidden="true"></i> Students
              </router-link>
            </li>
            <li class="nav-item me-4">
              <router-link class="nav-link" to="/list-register">
                <i class="fa fa-plus" aria-hidden="true"></i> Registrations
              </router-link>
            </li>
            <li class="nav-item me-4">
              <router-link class="nav-link" to="/list-payement">
                <i class="fa fa-credit-card-alt" aria-hidden="true"></i> Payements
              </router-link>
            </li>
            <li class="nav-item me-4">
              <router-link class="nav-link" to="/list-module">
                <i class="fa fa-book" aria-hidden="true"></i> Modules
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>
  
  .router-link-active {
    color: white;
    border-bottom: 5px  solid whitesmoke;
    
  }
  </style>
  
  
  
  
  