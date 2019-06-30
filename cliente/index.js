const baseURL = 'http://localhost:4003';
const table = document.querySelector('#table');

fetch(`${baseURL}/api/bands`)
  .then(function (res) {
    return res.json()
  })
  .then(function (bands) {
    bands.forEach(b => {
      const banda = `
        <div class="band" id="${b.id}">
            <div class="band-name">${b.name}</div>
            <div class="band-genre">${b.genre}</div>
            <button class="delete" onclick="deleteBand(${b.id})">Eliminar</button>
            <button class="view-albums">Ver discos</button>
            <button class="new-album-btn" onclick="newAlbum()">Nuevo album</button>
            <form class="new-album" id="form-${b.id}">
              <input type="text" placeholder="Nombre album" class="new-album-name">
              <input type="number" placeholder="Año" class="new-album-year">
              <button>Guardar album</button>
            </form>
        </div>`;

      table.innerHTML += banda;

      document
        .querySelectorAll('.new-album')
        .forEach(form => {
          form.onsubmit = function (e) {
            e.preventDefault();
            const bandId = e.target.parentNode.id;
            const newAlbumName = document.querySelector(`#form-${bandId} .new-album-name`).value;
            const newAlbumYear = document.querySelector(`#form-${bandId} .new-album-year`).value;
            const newAlbum = {
              bandId: bandId,
              name: newAlbumName,
              year: newAlbumYear
            }
            fetch(`${baseURL}/api/${bandId}/album`, {
              method: 'post',
              body: JSON.stringify(newAlbum),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(res => res.json())
              .then(na => {
                JSON.stringify(na);
                const band = e.target.parentNode.firstElementChild.innerText;
                alert(`Se agregó el disco ${na.name} a la banda ${band}`);
              })
          }
        })
    })
    const viewAlbumsBttns = document.querySelectorAll('.view-albums');
    for (let i = 0; i < viewAlbumsBttns.length; i++) {
      const button = viewAlbumsBttns[i];
      button.onclick = function (e) {
        const bandId = e.target.parentNode.id;
        fetch(`${baseURL}/api/bands/${bandId}/albums`)
          .then(function (res) {
            return res.json()
          })
          .then(bandAlbums => {
            bandAlbums.forEach(a => {
              const album = `
                 <div class="album">
                     <div class="album-name">${a.name}</div>
                     <div class="album-year">${a.year}</div>
                 </div>
                 `;
              document.getElementById('albums').innerHTML += album

            })
          })
      }
    }
  });

function deleteBand(band) {
  fetch(`${baseURL}/api/bands/${band}/delete`, {
    method: 'delete'
  }).then(res => {
    document.getElementById(band).remove();
  })
};

function newAlbum(params) {
}



document.getElementById('new-band').onsubmit = function (e) {
  e.preventDefault();
  const newBandName = document.querySelector('#new-band input').value;
  const formSelect = document.querySelector('#new-band select');
  const newBandGenre = formSelect.options[formSelect.selectedIndex].value;
  const newBand = {
    name: newBandName,
    genre: newBandGenre
  }
  fetch(`${baseURL}/api/bands`, {
    method: 'post',
    body: JSON.stringify(newBand),
    //pasa un objeto a un string y puedo volver atrás
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(nb => {
      const banda = `
      <div class="band" id="${nb.id}">
          <div class="band-name">${nb.name}</div>
          <div class="band-genre">${nb.genre}</div>
          <button class="delete" onclick="deleteBand(${nb.id})">Eliminar</button>
          <button class="view-albums">Ver discos</button>
          <button class="new-album-btn" onclick="newAlbum()">Nuevo album</button>
          <form class="new-album" id="form-${nb.id}">
            <input type="text" placeholder="Nombre album" class="new-album-name">
            <input type="number" placeholder="Año" class="new-album-year">
            <button>Guardar album</button>
          </form>
      </div>`;
      table.innerHTML += banda;
    })
}