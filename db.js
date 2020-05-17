var mongoose			=	require('mongoose');
mongoose.Promise 		=	global.Promise;

mongoose.connect("mongodb://localhost:27017/backend",{ useNewUrlParser: true,useUnifiedTopology: true },(error,response) =>{
    if (!response)
    {
        return console.log('Unable To Connect To MongoDB Local');
    }
    console.log('Connected To MongoDB local');
});

//localhost:27017/backend
//shashank:g9971441252@ds159020.mlab.com:59020/construction_app