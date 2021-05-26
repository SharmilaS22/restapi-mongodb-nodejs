const express = require("express");
const router = express.Router();

const Book = require('../../models/Book')

router
    .get('/', (req, res) => {
        Book.find({}, (err, found) => {
            if ( !err ) {
                res.send(found);
            } else {
                res.send(err)
            }
        });
    })

    .post('/', (req, res) => {

        // check whether email already exist
        Book.findOne({ title: req.body.title }, (err, found) => {

            if (found) {

              res.send({
                msg: "Book already exist!"
              });

            } else {
                // new user
                const newBook = new Book({
                    title  : req.body.title,
                    author : req.body.author
                });

                newBook.save((err) => {
                    if (!err) {
                        res.send("Added new Book");
                    } else {
                        res.send(err);
                    }
                });
            }
        });
        
    })

    .delete('/', (req, res) => {

        Book.deleteMany({}, (err) => {

            if (!err) {
              res.send("Deleted all the books.");
            } else {
              res.send(err);
            }
        });

    })

    .get('/:bookid', (req, res) => {

        Book.findOne(
            { _id: req.params.bookid },
            (err, found) => {
              if (!err && found) {
                res.send({
                  book: found
                });
              } else if (!found) {
                res.send("No entry found");
              } else {
                res.send(err);
              }
            }
          );

    })

    .delete('/:bookid', (req, res) => {

      Book.deleteOne({ _id: req.params.bookid }, (err) => {
        if (!err) {
          res.send("Deleted the article")
        } else {
          res.send(err);
        }
      });
    })

    .put('/:bookid', (req, res) => {

      Book.replaceOne(
        { _id: req.params.bookid },
        {
          title: req.body.title,
          author: req.body.author
        },
        (err, updated) => {
          if (!err && updated.n === 1) {
            res.send("Updated Successfully");
          } else if (err) {
            res.send(err);
          } else {
            res.send("No document found to update!")
          }
        }
      );
    })

    .patch('/:bookid', (req, res) => {
      Book.findOneAndUpdate(
        { _id: req.params.bookid },
        { $set: req.body },
        (err, doc) => {
          if (!err) {
            res.send("Successfully updated the '" + doc.title + "' Book!!");
          } else {
            res.send(err);
          }
        }
      );
    });


module.exports = router;