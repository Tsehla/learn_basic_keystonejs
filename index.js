//import keystone module
var keystone = require("keystone");
//

//set keystone option
keystone.init({
    "cookie secret" : "my_cookie_secret", //cookie sercret is allways required
    "auth" : true,// to require authentication to acess keystone admin dashboard
    "auto update" : true, //used to add contents from update folder to keystone automatically
    "user model" : "user_model"//your user model name
    //Tip: pay attention to commas
    
});
//

//define user model

var my_user_model = new keystone.List("user_model");//keystone store data in list mostly
//

//define user_model data fields 

my_user_model.add({// .add(), is widely used to porpulate the keystone.Lists(), its not the only way
    
    name : {type : String},//type of field should always be included
    age : {type : Number},//this could be any html allowed input type
    email : {type : keystone.Field.Types.Email, unique: true},//this is a specific keystone type field
    password : {type : keystone.Field.Types.Password}//advantage of keystone type is that it does validation on the data entered by the user on the field automatically
    // unique is one of the options like "required : true;" which will cause certain validation or work to be done on the field
    // ie. required means field can not be empty, unique means email can never be the same in the whole database
    //the name/age/email/password in this case will be used as columns names also
});
//

//give users admin rights
//lets disable admin rights
my_user_model.schema.virtual("canAccessKeystone").get(function(){return true}); //allows the user created with this data model to acess keystone admin//This is mangoose schema
//

//chose details what to be shown in the admin area
my_user_model.defaultColumns = 'id, name, email, password, age';
//

//register dataModel to keystone
  my_user_model.register();//add user model to keystone
//

//define Express routes
keystone.set("routes", function(app){//bind keystone key "routes" used for routing by using set() and passing a function and add a parameter "app" which  is an express app (var app = express()), then use it to develop routes and direct as needed.
    
    app.use("/", function(request, respond){//normal express router/app.use()/app.get()
        
        respond.write("We are at home page: goto localhost:3000/keystone to acess admin menu"); 
        respond.end();//
        //write to the route//you can also use view.render(); if you use custom engine/pug/etc; this will be demonstrated in tutorials to come
        
    });
    
});
//

// keystone.set("port", 3001);//change port to your choosing if you need to
//

keystone.start();//start keystone


