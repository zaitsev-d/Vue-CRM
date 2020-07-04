<template>
    <form class="card auth-card">
  <div class="card-content">
    <span class="card-title">Home accounting</span>
    <div class="input-field">
      <input id="email" type="text" class="validate">
      <label for="email">Email</label>
      <small class="helper-text invalid">Enter your Email</small>
    </div>
    <div class="input-field">
      <input id="password" type="password" class="validate">
      <label for="password">Password</label>
      <small class="helper-text invalid">Enter your Password</small>
    </div>
  </div>
  <div class="card-action">
    <div>
      <button class="btn waves-effect waves-light auth-submit" type="submit">
        Log In
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      First time?
      <a href="/">Sign Up</a>
    </p>
  </div>
</form>
</template>
