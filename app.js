const express = require('express');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');

const app = express();

const body_parser = require('body-parser');

const machining_controller = require('./machining_controller');

app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
})); 


app.use((req, res, next) => {
    console.log(req.method, ' ', req.path);
    next();
});

app.use("/", express.static("public"));

//Create
app.post("/machining-parameter-set", machining_controller.post_machining_parameter_set);

//Read
app.get("/machining-parameter-sets", machining_controller.get_machining_parameter_sets);

//Read by id 
app.get("/machining-parameter-set/:id", machining_controller.get_machining_parameter_set);

//Update
app.put("/machining-parameter-set/:id", machining_controller.put_machining_parameter_set);

//Delete
app.delete("/machining-parameter-set/:id", machining_controller.delete_machining_parameter_set);


const database_uri = "mongodb+srv://server:df5OnEZush49tpT2@cluster0-9q7ur.mongodb.net/machiningdb?retryWrites=true&w=majority";
                    
mongoose.connect(database_uri, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log('database connected');
    app.listen(port);
}).catch(err => {
    console.log(err);
});