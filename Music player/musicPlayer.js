const songs = [
  {
    id: 1,
    name: "Shape Of You",
    artist: "Ed Sheeran",
    img: "https://i1.sndcdn.com/artworks-000211076041-iyoj3q-t500x500.jpg",
    genre: "pop",
    source: "shapeOfYou.mpeg",
  },
  {
    id: 2,
    name: "All Of Me",
    artist: "Adele",
    img: "https://i.ytimg.com/vi/ngq5Aw0Q6rQ/maxresdefault.jpg",
    genre: "pop",
    source: "allOfMe.mpeg",
  },
  {
    id: 3,
    name: "nocopy-right",
    artist: "sonu",
    img: "https://pixabay.com/music/thumbnail/0d93568edd873cff4f00c3df39e63e33.svg",
    genre: "rock",
    source: "aura.mp3",
  },
  {
    id: 4,
    name: "aura",
    artist: "kumar",
    img: "https://cdn.pixabay.com/audio/2024/12/07/12-21-20-967_200x200.jpg",
    genre: "rock",
    source: "nocopyright.mp3",
  },
  {
    id: 5,
    name: "travi-tokyo",
    artist: "xing xang",
    img: "https://cdn.pixabay.com/audio/2023/07/22/02-53-18-138_200x200.jpg",
    genre: "hip-hop",
    source: "tvari-tokyo-cafe-159065.mp3",
  },
  {
    id: 6,
    name: "Village",
    artist: "KK.",
    img: "https://cdn.pixabay.com/audio/2024/04/18/15-53-09-54_200x200.jpg",
    genre: "hip-hop",
    source: "village.mp3",
  },
];

const audioPlayer = document.getElementById("audio-player");
const songList = document.getElementById("song-list");
const playList = document.getElementById("playlist");
const prevSong = document.getElementById("prev-btn");
const nextSong = document.getElementById("next-btn");
const selectedGenre = document.getElementById("genre-filter");
const addPlayList = document.getElementById("add-to-playlist");

const playlistForm = document.getElementById("playlistForm");
const playlistNameInput = document.getElementById("playlist-name");
const playlistList = document.getElementById("playlist-list");
const allPlayList = document.getElementById("all-playlist");

// Render all songs
let currentIndex = 0;

function renderSongs(genre = "all") {
  songList.innerHTML = "";
  const filteredSongs = songs.filter(
    (song) => genre === "all" || song.genre === genre
  );

  filteredSongs.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = `${song.name} - ${song.artist}`;
    li.onclick = () => playSong(song);
    songList.appendChild(li);
  });
  selectedGenre.addEventListener("change", () => {
    const genreValue = selectedGenre.value;
    console.log("Selected Genre:", genreValue);
    renderSongs(genreValue);
  });
}

// Play selected song
function playSong(song) {
  const index = songs.findIndex((s) => s.id === song.id);
  if (index !== -1) {
    currentIndex = index;
  }
  document.getElementById("song-title").textContent = song.name;
  document.getElementById("song-artist").textContent = song.artist;
  document.getElementById("song-img").src = song.img;
  audioPlayer.src = song.source;
  audioPlayer.play();
}
addPlayList.addEventListener("click", () => {
  const currentSong = songs[currentIndex];
  const playlistItem = document.createElement("li");
  playlistItem.textContent = `${currentSong.name} - ${currentSong.artist}`;
  playlistItem.onclick = () => playSong(currentSong);
  allPlayList.appendChild(playlistItem);
});
function playPrevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  const song = songs[currentIndex];
  playSong(song);
}
function playNextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  const song = songs[currentIndex];
  playSong(song);
}
function addListItems(text) {
  const listItem = document.createElement("li");
  listItem.textContent = text;
  list.appendChild(listItem);
}

playlistForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const playlistName = playlistNameInput.value.trim();

  if (playlistName !== "") {
    const newPlaylistItem = document.createElement("li");
    newPlaylistItem.textContent = playlistName;
    playlistList.appendChild(newPlaylistItem);
    playlistNameInput.value = "";
  } else {
    alert("Please enter a valid playlist name!");
  }
});
// Add toggle theme
prevSong.addEventListener("click", playPrevSong);
nextSong.addEventListener("click", playNextSong);

document.getElementById("theme-toggle").onclick = () => {
  const isDark = document.body.dataset.theme === "dark";
  document.body.dataset.theme = isDark ? "light" : "dark";
};

renderSongs();
