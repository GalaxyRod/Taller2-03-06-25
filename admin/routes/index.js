var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/photos', async function(req, res, next) {
  const URL = 'https://dawm-fiec-espol-default-rtdb.firebaseio.com/photos.json'
    const config = {
      proxy: {
        host: 'localhost',      
      }
    }
  const response = await axios.get(URL);
  res.render('fotos', { title: 'Fotos', fotos: response.data });
});
  
router.get('/findAllByRate', (req, res) => {
  res.render('findAllByRate'); // Renderiza el archivo findAllByRate.ejs
})

router.get('/photos/add', function(req, res, next) {
  res.render('fotos_formulario', { title: 'Express' });
});

router.post('/photos/save', async function(req,res, next) {
  let { title, description, rate } = req.body
    const URL = 'http://localhost:4444/rest/fotos/save'
    let data = {
    titulo:title,
    descripcion: description,
    calificacion: rate,
    ruta: ''
  }
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
    const response = await axios.post(URL, data, config);
    if(response.status == '200' && response.statusText == 'OK') {
      res.redirect('/fotos/findAll/view')
  } else {
      res.redirect('/')
  }
});

module.exports = router;
