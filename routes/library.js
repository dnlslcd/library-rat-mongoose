var express = require('express');
var router = express.Router();

const Book = require('../models/book');
// importar Authors
const Author = require('../models/author');


/* GET users listing. */
router.get('/add-author', function (req, res, next) {
  res.render('add-author')
});

router.post('/add-author', async function (req, res) {
  // Iteración 1

  // 1. Importar el modelo (Authors) al principio del fichero
  // const Author = require('../models/author');

  // 2. Recuperar todos los campos del POST
  const { firstName, familyName, dateBirth, dateDeath } = req.body;

  // 3. Crear un nuevo documento en base de datos usando Mongoose
  const createdAuthor = await Author.create({
    firstName,
    familyName,
    dateBirth,
    dateDeath
  });

  /** La forma que tenéis de momento de comprobar los autores añadidos a la base de datos 
   * es mediante console.log o el plugin de mongodb o ir a Atlas. 
   * Otra forma es devolver el autor que acabais de crear en formato JSON */
  res.json(createdAuthor);

})


router.get('/add-book', async (req, res) => {
  // Iteración 2
  // 1. Recuperar todos los autores de la coleccion Authors
  const authors = await Author.find();
  res.render('add-book', {
    authors
  })
})

router.post('/add-book', async (req, res) => {

  // ES6. Dentro del objeto req.body existe un campo de nombre 'title', otro 'summary', etc.

  // Iteración 3: NO hay que hacer nada, solo contestar a la pregunta del README.md
  const { title, summary, isbn, author } = req.body;

  const book = new Book({
    title,
    summary,
    isbn,
    author
  })

  const resultado = await book.save();
  res.send(resultado);

})

router.get('/books', async (req, res) => {
  const books = await Book.find(); // Iteración 4

  console.log("Libros a enviar a la vista: ", books);

  res.render('books', {
    books
  })
})

module.exports = router;
