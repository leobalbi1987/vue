<template>

<div class="bg-gray-900 text-white p-4 m-1">

    
  <p class="text-3xl font-circular tracking-wide sans-serif mb-4 text-green-400 bg-opacity-75 flex items-center justify-center  "> Music List </p>

   
  <form @submit.prevent="addSelectedMusic" class="p-4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto shadow-md">


      <label class="block mb-2">Musica:
        <input v-model="newMusic.title" list="titleSuggestions" class="bg-gray-800 text-white p-2 rounded-md w-full" @input="suggestTitles" required />
      </label>
      <datalist id="titleSuggestions">
        <option v-for="suggestion in titleSuggestions" :key="suggestion" :value="suggestion"></option>
      </datalist>

      <label class="block mb-2">Artista:
        <input v-model="newMusic.artist" list="artistSuggestions" class="bg-gray-800 text-white p-2 rounded-md w-full" @input="suggestArtists" required />
      </label>
      <datalist id="artistSuggestions">
        <option v-for="suggestion in artistSuggestions" :key="suggestion" :value="suggestion"></option>
      </datalist>

      <button
        type="submit"
        class="bg-green-500 p-2 m-2 hover:bg-green-400 text-white rounded-md w-full shadow-md"
      >
        Add List
      </button>

      <button
        type="button"
        @click="addMusic"
        class="bg-green-500 p-2 m-2 hover:bg-green-400 text-white rounded-md cursor-pointer w-full shadow-md"
      >
        Cadastrar nova Musica
      </button>
      <button
         type="button"
          @click="removeLastSelectedMusic"
         class="bg-red-500 p-2 m-2 hover:bg-red-400 text-white rounded-md cursor-pointer w-full shadow-md"
            >
           Remover
            </button>

 


<div v-if="progressPercent > 0" class="  pt-1">
    <div class="flex mb-2 items-center justify-between">
      <div>
        <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
          Processando
        </span>
      </div>
      <div class="text-center">
        <span class="text-xs font-semibold inline-block text-teal-600">
          {{ progressPercent }}%
         
        </span>
 
      </div>
    </div>
    <div class="flex mb-2 items-center justify-between">
      <div class="w-full">
        <div class="relative pt-1">
          <div class="flex mb-2 items-center justify-between">
            <div class="flex">
              <span
                class="text-xs font-semibold inline-block py-1 px-3 uppercase rounded-full w-24 "
                :style="{ background: `linear-gradient(90deg, #6495ED ${progressPercent}%, #ffff ${progressPercent}%)` }"
              >
                &nbsp;
              </span>
            </div>
          </div>
          <div class="flex mt-2 items-center justify-between">
            <div class="flex w-full">
              <div
                :style="{ width: `${progressPercent}%` }"
                class="bg-teal-500 h-2 rounded-full transition-all duration-300 ease-in-out"
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</form>

<div v-if="successMessage" class="alert alert-success text-center  mb-4 ">
    {{ successMessage }}
  </div>


    <!-- <label>Selecionadas:  
      <select v-model="selectedMusic" @change="selectMusic">
        <option v-for="music in musics" :key="music._id" :value="music._id">
          {{ music.title }} - {{ music.artist }}
        </option>
      </select>
      <p v-if="selectedMusic"> {{ selectedMusic.title }}Selected Music:</p>
    </label> -->

  </div>
 





  <div class="grid grid-cols-3 gap-4 mt-1">
  <div class="col-span-3">
    <h1 class="text-xl font-circular mb-4 text-center p-1 mt-2">Escolhas Recentes</h1>
  </div>
  <div class="col-span-3">
    <div class="grid grid-cols-3 border-b-2 border-gray-500 mb-2">
      <div class="col-span-1 border-r-2 border-gray-500 p-2 ">Musica</div>
      <div class="col-span-1 border-r-2 border-gray-500 p-2">Artista</div>
      <div class="col-span-1 p-2">Data</div>
    </div>
    <div v-for="music in selectedMusic" :key="music._id" class="grid grid-cols-3 border-b-2 border-gray-500">
      <div class="col-span-1 border-r-2 border-gray-500 p-2">{{ music.title }}</div>
      <div class="col-span-1 border-r-2 border-gray-500 p-2">{{ music.artist }}</div>
      <div class="col-span-1 p-2">{{ formatarData(music.date) }}</div>
    </div>
  </div>
</div>
</template>

<script>

export default {

  name:'PrincipalComponent',

  data() {
    return {
      newMusic: { title: '', artist: '', frequency: '' },
      musics: [],
      selectedMusic: null,
      titleSuggestions: [],
      artistSuggestions: [],
      progressPercent: 0,
      progressStatus: 'pending',
      successMessage: null,
      email: '',
      password: '',
    };
  },

  
  methods: {


    
    // Este método é assíncrono (async) e é chamado quando há uma tentativa de adicionar uma nova música.

    showSuccessMessage(message) {
    this.successMessage = message;

    // Após 3 segundos, limpe a mensagem de sucesso
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  },

    

    async addSelectedMusic() {
      try {
        console.log('Dados a enviar:', this.newMusic);

        const response = await this.$axios.post('/api/addSelectedMusic', this.newMusic);
        console.log('Respuesta del servidor:', response.data);

        this.newMusic = { title: '', artist: '', frequency: '' };
        this.titleSuggestions = [];
        this.artistSuggestions = [];
        this.getSelectedMusics();
      } catch (error) {
        console.error('Error al agregar música:', error.response ? error.response.data.message : error.message);
      }
    },


    
    async addMusic() {
      try {
        console.log('Dados a enviar:', this.newMusic);

        const response = await this.$axios.post('/api/addMusic', this.newMusic);
        console.log('Respuesta del servidor:', response.data);

        this.newMusic = { title: '', artist: '', frequency: '' };
        this.titleSuggestions = [];
        this.artistSuggestions = [];
        this.getMusics(); // Adiciona esta linha para atualizar a lista de músicas após adicionar uma nova música
      } catch (error) {
        console.error('Error ao adicionar música:', error.response ? error.response.data.message : error.message);
      }
    },





    async getMusics() {
      try {
        const response = await this.$axios.get('/api/getMusics');
        this.musics = response.data;
      } catch (error) {
        console.error('Error fetching music list:', error.response ? error.response.data.message : error.message);
      }
    }, 
    
    
    async getSelectedMusics() {
  try {
    this.progressStatus = 'loading'; // Definir o status como 'loading'
    // Loop de 101 iterações (de 0 a 100)
    for (let i = 0; i <= 100; i++) {
      // Atualizar progresso
      this.progressPercent = i;

      // Simular uma operação assíncrona
      await new Promise(resolve => setTimeout(resolve, 10));

      // Ao chegar a 50, fazer a solicitação HTTP
      if (i === 50) {
        try {
          // Fazer a solicitação HTTP
          const selectedMusics = await this.$axios.get('/api/getSelectedMusics');
          this.selectedMusic = selectedMusics.data;
          this.showSuccessMessage('Música adicionada com sucesso!');
          console.log('Músicas encontradas na tabela selectedMusic!');
        } catch (error) {
          // Tratar erro na solicitação HTTP
          console.error('Erro ao buscar músicas na tabela selectedMusic:', error);
        }
      }
    }
  } finally {
    // Definir o status como 'completed'
    this.progressStatus = 'completed';

    // Agora, esperar um tempo antes de redefinir o progresso e status
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Resetar o progresso após o término do loop
    this.progressPercent = 0;
    // Resetar o status para 'pending'
    this.progressStatus = 'pending';
  }
},




async removeMusic(musicId) {
  try {
    // Início do progresso
    this.progressPercent = 10;

    // Simular uma operação assíncrona
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Atualizar progresso
    this.progressPercent = 50;

    // Fazer a solicitação HTTP para remover a música pelo ID
    const response = await this.$axios.delete(`/api/removeMusic/${musicId}`);
    console.log('Música removida:', response.data);

    // Atualizar a lista de músicas após remover uma música
    this.getMusics();

    // Fim do progresso
    this.progressPercent = 100;
  } catch (error) {
    console.error('Erro ao remover música:', error.response ? error.response.data.message : error.message);
  }
},


    async removeLastSelectedMusic() {
  try {
    const response = await this.$axios.delete('/api/removeLastSelectedMusic');
    console.log('Resposta do servidor:', response.data);
    this.getSelectedMusics();
  } catch (error) {
    console.error('Erro ao remover a última música:', error.response ? error.response.data.error : error.message);
  }
},


    // Este método recebe uma string de data como parâmetro e a formata para um formato específico.

    formatarData(dataString) {
      const data = new Date(dataString);
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const hora = data.getHours().toString().padStart(2, '0');
      const minutos = data.getMinutes().toString().padStart(2, '0');

      return `${dia}/${mes} ${hora}:${minutos}`;
    },

    selectMusic() {
      const selectedMusic = this.musics.find(music => music._id === this.selectedMusic);
      console.log(selectedMusic);
    },


    suggestTitles() {
      const input = this.newMusic.title.toLowerCase();
      this.titleSuggestions = [...new Set([...this.musics.map(music => music.title.toLowerCase()), input])]
        .filter(title => title.includes(input))
        .filter(title => title !== input)
        .slice(0, 5);
    },
    
    suggestArtists() {
      const input = this.newMusic.artist.toLowerCase();
      this.artistSuggestions = [...new Set([...this.musics.map(music => music.artist.toLowerCase()), input])]
        .filter(artist => artist.includes(input))
        .filter(artist => artist !== input)
        .slice(0, 5);
    },
  },


  
  
  
  mounted() {
    this.getMusics();
    this.getSelectedMusics();
  },
  
  
};

</script>

<style scoped>
/* Estilos específicos para este componente si es necesario */
</style>
