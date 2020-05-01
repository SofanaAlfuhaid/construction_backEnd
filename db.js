var mongoose			=	require('mongoose');
mongoose.Promise 		=	global.Promise;

mongoose.connect("mongodb://localhost:27017/backend",{ useNewUrlParser: true,useUnifiedTopology: true },(error,response) =>{
    if (!response)
    {
        return console.log('Unable To Connect To MongoDB Local');
    }
    console.log('Connected To MongoDB local');
});
