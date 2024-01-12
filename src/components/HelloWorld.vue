<template>
  <div id="app">
    <h1>Vue Music App</h1>
    <form @submit.prevent="addMusic">
      <label>Title: <input v-model="newMusic.title" required /></label>
      <label>Artist: <input v-model="newMusic.artist" required /></label>
      <label>Frequency: <input v-model="newMusic.frequency" required /></label>
      <button type="submit">Add Music</button>
    </form>
    <select v-model="selectedMusic" @change="selectMusic">
      <option v-for="music in musics" :key="music._id" :value="music._id">
        {{ music.title }} - {{ music.artist }}
      </option>
    </select>
    <p v-if="selectedMusic">Selected Music: {{ selectedMusic.title }}</p>
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
    addMusic() {
      this.$axios.post('http://localhost:3000/api/addMusic', this.newMusic)
        .then(response => {
          console.log(response.data);
          this.newMusic = { title: '', artist: '', frequency: '' };
          this.getMusics();
        })
        .catch(error => {
          console.error(error);
        });
    },
    getMusics() {
      this.$axios.get('http://localhost:3000/api/getMusics')
        .then(response => {
          this.musics = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    selectMusic() {
      const selectedMusic = this.musics.find(music => music._id === this.selectedMusic);
      console.log(selectedMusic);
    },
  },
  mounted() {
    this.getMusics();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}

select {
  padding: 10px;
  margin-top: 10px;
}
</style>

