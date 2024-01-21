<template>
  <div>
    <h1>Select Music App</h1>
    <form @submit.prevent="addMusic">
      <label>Title: <input v-model="newMusic.title"  required /></label>
      <label>Artist: <input v-model="newMusic.artist" required /></label>
      <label>Frequency: <input v-model="newMusic.frequency" required /></label>
      <button type="submit">Add Music</button>
    </form>


    <label>selecionadas:  <select v-model="selectedMusic" @change="selectMusic">
      <option v-for="music in musics" :key="music._id" :value="music._id">
        {{ music.title }} - {{ music.artist }}
      </option>
    </select>
    <p v-if="selectedMusic"> {{ selectedMusic.title }}Selected Music:</p>

  </label>

  <!-- <select v-model="selectedMusic" @change="selectMusic">
      <option v-for="music in musics" :key="music._id" :value="music._id">
        {{ music.title }} - {{ music.artist }}
      </option>
    </select>
    <p v-if="selectedMusic"> {{ selectedMusic.title }}Selected Music:</p> -->

    <!-- <ul>
      <li v-for="music in musics" :key="music._id">
        {{ music.title }} - {{ music.artist }} - {{ music.frequency }}
      </li>
    </ul> -->

        <table border="3">
          <th colspan="3">Escolhas Recentes</th>
    <tr>
        <td > Musica </td>
        <td>Artista</td>
        <td>data</td>
       
    </tr>
    <tr  v-for="music in musics" :key="music._id">
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
    };
  },
  methods: {
    async addMusic() {
      try {
        console.log('Datos a enviar:', this.newMusic);

        const response = await this.$axios.post('/api/addMusic', this.newMusic);
        console.log('Respuesta del servidor:', response.data);

        this.newMusic = { title: '', artist: '', frequency: '' };
        this.getMusics();
      } catch (error) {
        console.error('Error al agregar música:', error.response ? error.response.data.message : error.message);
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
    selectMusic() {
      const selectedMusic = this.musics.find(music => music._id === this.selectedMusic);
      console.log(selectedMusic);
    },
    formatarData(dataString) {
      const data = new Date(dataString);
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const hora = data.getHours().toString().padStart(2, '0');
      const minutos = data.getMinutes().toString().padStart(2, '0');

      return `${dia}/${mes} ${hora}:${minutos}`;
    },
  },
  mounted() {
    this.getMusics();
  },
};
</script>

<style scoped>
/* Estilos específicos para este componente si es necesario */
</style>
