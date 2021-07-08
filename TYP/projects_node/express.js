//Create server through Express

const express = require("express");
const mongoose = require('mongoose');
const app = express();
const { FriendModel } = require("./friend.model"); //filename

//connecting to mongodb
mongoose.connect('mongodb+srv://shreya:shreyanshi11@cluster0.bnb8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then((data) => console.log("connect to database"))
    .catch((err) => console.log("err occured while connecting"));

//parsing body
app.use(express.json());
//saving Data to DB
app.post("/add/book", (req, res) => {
    const data = req.body;

    const friend = new FriendModel({
        BookName: data.friendName,
        Price: data.Price,
        Author: data.Author,
        Language: data.Language,
        AboutAuthor: data.AboutAuthor,
    });
    friend.save().then((data) => {
        console.log("data", data);
        res.send(data);
    }).catch((err) => {
        console.log("err", err);
        res.send("unable to send");
    });
});

//getting a document by id

app.get("/get/bookById", (req, res) => {
    const _id = req.query._id;
    // console.log("req.query", req.query);
    if (_id) {
        console.log("inside then");
        FriendModel.findOne({ _id: _id }).then((data) => {
            if (!data) {
                res.send("couldn't find user");
            } else {
                res.send(data);
            }
        }).catch((err) => {
            console.log("err", err);
            res.send("something wrong");
        });
        //console.log("friend", friend);
    } else {
        res.send("Invalid Id");
    }
});

// //fetch all docs inside a collection

//delete object through i
app.delete("/delete/bookById", (req, res) => {
    const _id = req.query._id;
    const data = req.body;
    FriendModel.findByIdAndDelete({ _id: _id }).then((data) => {
        res.status(200).send("Deleted Successfully");
    }).catch(err => {
        console.log("err", err);
        res.status(500).send("something went wrong ,Please try again later!");
    })
});

//Update object through id
app.put("update/bookById", (req, res) => {
    const _id = req.query._id;
    const data = req.body;

    console.log("data", data);
    FriendModel.findByIdAndUpdate({ _id: _id }, { $set: { BookName: data.BookName } }, { new: true })
        .then((data) => {
            res.status(200).send("data", data);
        }).catch(err => {
            console.log("err", err);
            res.status(500).send("something went wrong ,Please try again later!");
        })
});

app.listen(8080, function() {
    console.log("server is up on port 8080");
});