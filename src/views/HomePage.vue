<template>
    <div>
      <h1>Welcome to the Bike Tracker 🚴‍♀️</h1>
      <p>Track your rides and discover new locations!</p>
  
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
  
      <router-view></router-view>
    </div>
  </template>
  
  <style>
  nav {
    padding: 10px;
    background: #42b883;
  }
  nav a {
    color: white;
    text-decoration: none;
    margin: 0 10px;
    font-weight: bold;
  }
  </style>
  
  