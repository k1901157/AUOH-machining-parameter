const machining_model = require('./machining_model');

const machining_data = (req) => {
    let data = {
        tool_name: req.body.tool_name,
        material: req.body.material,
        cutting_speed: req.body.cutting_speed,
        feed_rate: req.body.feed_rate
    };
    return data;
};

// Create
const post_machining_parameter_set = (req, res, next) => {
    console.log('post_machining_parameter_set');
    let data = machining_data(req);

    let new_machining_parameter_set = machining_model(data);

    new_machining_parameter_set.save().then(() => {
        console.log(new_machining_parameter_set);
        res.send(JSON.stringify(new_machining_parameter_set));
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    }); 
};

//Read
const get_machining_parameter_sets = (req, res, next) => {
    console.log('get_machining_parameter_sets');

    machining_model.find({})
        .lean()
        .then(machining_parameter_set  => {
            res.send(JSON.stringify(machining_parameter_set));
        }).catch(err => {
            res.status(500);
            res.send(err.errmsg);
            console.log(err);
        });
};
//Read by id 
const get_machining_parameter_set = (req, res, next) => {
    let id = req.params.id;

    machining_model.findById(id)
    
        .lean()
        .then(machining_parameter_set  => {
        res.send(JSON.stringify(machining_parameter_set));
        res.send();
        
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

// Update
const put_machining_parameter_set = (req, res, next) => {
    console.log('put_machining_parameter_set');
    let id = req.params.id;
    let data = machining_data(req);

    machining_model.findByIdAndUpdate(id, data, {
        new: true
    }).then((machining_parameter_set) => {
        res.send(machining_parameter_set);
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });

};


//Delete

const delete_machining_parameter_set = (req, res, next) => {
    let id = req.params.id;

    machining_model.findByIdAndRemove(id).then(() => {
        res.send();
    }).catch(err => {
        res.status(500);
        res.send(err.errmsg);
        console.log(err);
    });
};

module.exports.post_machining_parameter_set = post_machining_parameter_set;
module.exports.get_machining_parameter_sets = get_machining_parameter_sets;
module.exports.get_machining_parameter_set = get_machining_parameter_set;
module.exports.put_machining_parameter_set = put_machining_parameter_set;
module.exports.delete_machining_parameter_set = delete_machining_parameter_set;