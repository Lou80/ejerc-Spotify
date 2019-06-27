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
        </div>`;

       table.innerHTML += banda; 
    })
    const viewAlbumsBttn = document.querySelectorAll('.view-albums');
    for (let i = 0; i < viewAlbumsBttn.length; i++) {
        const button = viewAlbumsBttn[i];
        button.onclick = function (e) {
         const bandId = e.target.parentNode.id;
         fetch(`${baseURL}/api/bands/${bandId}/albums`)
         .then(function (res) {
             return res.json()
           })
         .then(bandAlbums => {
             console.log(bandAlbums)
             bandAlbums.forEach(a => {
                 const album = `
                 <div class="album">
                     <div class="album-name">${a.name}</div>
                     <div class="album-year">${a.year}</div>
                 </div>
                 `;
             document.getElementById('albums').innerHTML+=album

             })
         })
        }
    }
  });

function deleteBand (band) {
    fetch(`${baseURL}/api/bands/${band}/delete`, {
    method: 'delete'
    }).then( res => {
        document.getElementById(band).remove();
    })
};

document.getElementById('new-band').onsubmit = function (e) {
  e.preventDefault();
  const newBandName = document.querySelector('form input').value;
  const formSelect = document.querySelector('form select');
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
  .then( res => res.json() )
  .then(n => {
    const banda = `
        <div class="band" id="${n.id}">
            <div class="band-name">${n.name}</div>
            <div class="band-genre">${n.genre}</div>
            <button class="delete" onclick="deleteBand(${n.id})">Eliminar</button>
            <button class="view-albums">Ver discos</button>
        </div>`;
    table.innerHTML += banda;
  })
}