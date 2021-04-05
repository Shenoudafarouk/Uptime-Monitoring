var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
// mongoose.set('debug', true);

if(process.env.NODE_ENV === "test"){
    mongoose.connect('mongodb://127.0.0.1:27017/tooli-point-managment-test', { useNewUrlParser: true }, function (err) {
        if (err) return console.error(err);
        console.log('*****************');
            console.log('connection successed to mongoDb>>> tooli-point-managment-test');
        });
}else{
    mongoose.connect('mongodb://127.0.0.1:27017/tooli-point-managment', { useNewUrlParser: true }, function (err) {
    if (err) return console.error(err);
    console.log('*****************');
        console.log('connection successed to mongoDb>>> tooli-point-managment');
    });
}
// mongoose.connect('mongodb://admin:admin@localhost:27017/tooli-user-managment');
module.exports = {
    mongoose
};
