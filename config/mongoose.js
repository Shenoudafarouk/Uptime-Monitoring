var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
// mongoose.set('debug', true);

if(process.env.NODE_ENV === "test"){
    mongoose.connect('mongodb://127.0.0.1:27017/tooli-coins-managment-test', { useNewUrlParser: true }, function (err) {
        if (err) return console.error(err);
        console.log('*****************');
            console.log('connection successed to mongoDb>>> tooli-coins-managment-test');
        });
}else{
    mongoose.connect('mongodb://127.0.0.1:27017/tooli-coins-managment', { useNewUrlParser: true }, function (err) {
    if (err) return console.error(err);
    console.log('*****************');
        console.log('connection successed to mongoDb>>> tooli-coins-managment');
    });
}
// mongoose.connect('mongodb://admin:admin@localhost:27017/tooli-user-managment');
module.exports = {
    mongoose
};
