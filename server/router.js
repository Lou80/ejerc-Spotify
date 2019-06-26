const express = require('express');
const router = express.Router();
// se crea una mini app de express en otro archivo que puede crear routers, y se conecta con el archivo ppal


let idBandas = 3;


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
  const bands = bandas.filter(bands => bands.id != id);
  res.json(bands)
});

router.post('/api/bands', (req, res) => {
  const newBand = req.body;
  newBand.id = idBandas++;
  bandas.push(newBand);
  console.log(newBand);
  res.json(newBand);
});

module.exports = router;