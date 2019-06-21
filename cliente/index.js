const baseURL = 'http://localhost:4003';

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

       document.querySelector('#table').innerHTML += banda; 
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
             document.getElementById(`${bandId}`).innerHTML+=album

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
