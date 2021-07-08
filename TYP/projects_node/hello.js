// function hello() {
//     console.log("hello")
// }

// module.exports = hello;

const hello = require("index.js");
const mongoose = require('mongoose');
const app = hello();

app.get("/:msg/:getting/:car", function(request, response) {
    console.log("params", request.params)
    response.send("Hello World")
});

mongoose.connect('mongodb+srv://shreya:shreyanshi11>@cluster0.bnb8f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then((data) => console.log("connect to database"))
    .catch((err) => console.log("err occured while connecting"));

app.listen(8080, function() {
    console.log("server is up on port 8080")
});