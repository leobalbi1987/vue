<template>
  <div>
    
    <h1>Select Music App</h1>

    <form @submit.prevent="addSelectedMusic">

      <label>Musica	: 
        <input v-model="newMusic.title" list="titleSuggestions" @input="suggestTitles" required />
      </label>
      <datalist id="titleSuggestions">
        <option v-for="suggestion in titleSuggestions" :key="suggestion" :value="suggestion"></option>
      </datalist>

      <label>Artista: 
        <input v-model="newMusic.artist" list="artistSuggestions" @input="suggestArtists" required />
      </label>

      <datalist id="artistSuggestions">
        <option v-for="suggestion in artistSuggestions" :key="suggestion" :value="suggestion"></option>
      </datalist>

      <label>Frequency: 
        <input v-model="newMusic.frequency" required />
      </label>
      <button type="submit">Add List</button>
      <!-- <button type="submit">Cadastrar nova Musica</button> -->
      <button type="button" @click="addMusic">Cadastrar nova Musica</button>


    </form>

    <!-- <label>Selecionadas:  
      <select v-model="selectedMusic" @change="selectMusic">
        <option v-for="music in musics" :key="music._id" :value="music._id">
          {{ music.title }} - {{ music.artist }}
        </option>
      </select>
      <p v-if="selectedMusic"> {{ selectedMusic.title }}Selected Music:</p>
    </label> -->

     <!-- <table border="1">
      <th colspan="3">Escolhas Recentes</th>
      <tr>
        <td > Musica </td>
        <td>Artista</td>
        <td>Data</td>
      </tr>
      <tr  v-for="music in musics" :key="music._id">
        <td> {{ music.title }}</td>
        <td> {{ music.artist }}</td>
        <td>{{ formatarData(music.date) }}</td>
      </tr>
    </table>  -->


    <table border="1">
      <th colspan="3">Escolhas Recentes</th>
      <tr>
        <td > Musica </td>
        <td>Artista</td>
        <td>Data</td>
      </tr>
      <tr v-for="music in selectedMusic" :key="music._id">
        <td> {{ music.title }}</td>
        <td> {{ music.artist }}</td>
        <td>{{ formatarData(music.date) }}</td>
      </tr>
    </table> 
  </div>
</template>

<script>

export default {
  data() {
    return {
      newMusic: { title: '', artist: '', frequency: '' },
      musics: [],
      selectedMusic: null,
      titleSuggestions: [],
      artistSuggestions: [],
    };
  },

  
  methods: {

    
    // Este método é assíncrono (async) e é chamado quando há uma tentativa de adicionar uma nova música.

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
        const selectedMusics = await this.$axios.get('/api/getSelectedMusics');
        this.selectedMusic = selectedMusics.data;
        console.log('Músicas encontradas na tabela selectedMusic!');
      } catch (err) {
        console.error('Erro ao buscar músicas na tabela selectedMusic:', err);
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
