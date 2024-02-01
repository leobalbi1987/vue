<template>

 <div class="w-screen h-20 flex justify-center items-center bg-green-500 ">
    <form class=" bg-green-400 rounded flex justify-center items-center flex-col shadow-md" @submit.prevent="login">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-gray-600 mb-2" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
      </svg>
      <label class="ml-2 p-1 text-3xl uppercase text-gray-600 ">Login</label>
      <input v-model="email" type="email" name="email" class="ml-3  p-1 focus:border-purple-700 rounded border-2 outline-none" autocomplete="off" placeholder="Email" required>
      <input v-model="password" type="password" name="password" class=" ml-10  p-1 w-80 focus:border-purple-700 rounded border-2 outline-none" autocomplete="off" placeholder="Password" required>
      <button class=" ml-1 hover:bg-white  hover:text-green-400 font-bold p-3 rounded-xl" type="submit">
  <span>Login</span>
</button>



      <button class=" hover:bg-white  hover:text-green-400 font-bold p-3 rounded-xl" type="submit">
  <span>Cadastre-se</span>
</button>


      
    </form>
  </div>
  



</template>


<script>

export default {
  name:  'LoginComponent',


}




</script>