const express = require('express');
const router = express.Router();
// se crea una mini app de express en otro archivo que puede crear routers, y se conecta con el archivo ppal


let idBandas = 3;
let idAlbums = 6;


const bandas = [
  { id: 1, name: 'Nirvana', genre: 'Grunge' },
  { id: 2, name: 'Foo Fighters', genre: 'Hard Rock' }
];

const albums = [
  { id: 1, bandId: 1, name: 'Bleach', year: 1989 },
  { id: 2, bandId: 1, name: 'Nevermind', year: 1991 },
  { id: 3, bandId: 2, name: 'Foo Fighters', year: 1995 },
  { id: 4, bandId: 2, name: 'The Colour and the Shape', year: 1997 },
  { id: 5, bandId: 2, name: 'There Is Nothing Left to Lose', year: 1999 }
];

router.get('/api/bands', function (req, res) {
  res.json(bandas)
});

router.get('/api/bands/:bandId/albums', function (req, res) {
  const id = parseInt(req.params.bandId);
  const bandAlbums = albums.filter(lp => lp.bandId == id);
  return res.json(bandAlbums);
});

router.delete('/api/bands/:bandId/delete', function (req, res) {
  const id = parseInt(req.params.bandId);
  function checkId(band) {
    return band.id == id;
  }
  bandas.splice(bandas.findIndex(checkId), 1);
  res.json(bandas)
});

router.post('/api/bands', (req, res) => {
  const newBand = req.body;
  newBand.id = idBandas++;
  bandas.push(newBand);
  res.json(newBand);
});

router.post('/api/:bandId/album', (req, res) => {
  const newAlbum = req.body;
  newAlbum.id = idAlbums++;
  newAlbum.bandId = parseInt(req.params.bandId);
  albums.push(newAlbum);
  return res.json(newAlbum)
})

module.exports = router;