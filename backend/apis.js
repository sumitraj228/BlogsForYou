const user = require('../models/userProfile');
const blog = require('../models/blog');
const mongoose = require('mongoose');

const welcomePage = (req,res,next) => {
    console.log("I am at the login Page");
    res.send("Hello! Please wait. Its loading!")
}

const registerPage = (req,res,next) =>{
    res.send("Welcome to the Register Page");
}

const signUp = (req,res,next) =>{

    let username = req.body.username;
    let password = req.body.password;

    const newUser = new user({
        username: username,
        password: password
    });

    let query = {"username": username};

    user.find(query, async function(err,result){
        if(err)
            throw err;
        else    
        {
            
            if(result.length>0)
                res.send("User exists!");
            else
            {
                await newUser.save();
                res.send("User Registerd");
            }
        }
    })
}

const userLogin = (req,res,next) => {

    let username = req.body.username;
    let password = req.body.password;

    let query = {username: username, password: password};
    user.find(query,(err,result)=>{
        if(err)
            throw err;
        else
        {
            if(result.length>0)
                res.send("Welcome to the login Page");
            else    
                res.send("User doesnot exist. Please register!")
        }        
    })
}

const homePage = (req,res,next) =>{
    res.send("You are in the home Page now"); 
}


const newBlog = (req,res,next) =>{

    let title = req.body.title;
    let content = req.body.content;
    let userID = req.params.userID;

    let query = {
        "_id": userID
    };

    const uploadBlog = new blog({
        title: title,
        content: content
    });

    blog.create(uploadBlog,(err,data) => {
        if(err)
            throw err;
        else  
        {
            user.find(query,async (err,result)=>{
                if(err)
                    throw err;
                else
                {
                    let dataID = data._id;
                    result[0].blogs.push(dataID);
                    await result[0].save();
                    res.send(result)
                }
            })
            
        }
    });

}

const updateBlog = async (req,res,next) =>{
    
    let title = req.body.title;
    let content = req.body.content;

    let userID = req.params.userID;
    let blogID = req.params.blogID;

    let query = {
        "_id" : blogID
    };

    const updateBlog = {
        title: title,
        content: content
    };

    blog.updateOne(query,updateBlog,(err,data) =>{
        if(err)
            throw err;
        else 
        {
            res.send(data);
        }   
            
    })



}

const getUserBlog = async (req,res,next) =>{

    let userID = req.params.userID;
    let query = {
        "_id": userID
    };

    const data = await user.find(query).populate({path: "blogs", model: "blog"});
    res.json(data);

}

const getAllBlogs = (req,res,next) =>{

    blog.find({},(err,data)=>{
        if(err)
            throw err;
        else    
            res.send(data);
    })
}

const deleteBlog = (req,res,next) =>{

    let userID = req.params.userID;
    let blogID = req.params.blogID;

    let query = {
        "_id" : blogID
    };

    let userQuery = {
        "_id" : userID
    };

    blog.findByIdAndDelete(blogID,(err)=>{
        if(err)
            throw err;
        else    
        {
            blogID = mongoose.Types.ObjectId(blogID)
            console.log(blogID);
            user.find(userQuery,async (error,data)=>{
                if(error)
                    throw error;
                else{
                    // console.log(data);
                    for(let index=0;index<data[0].blogs.length;index++)
                    {
                        console.log(data[0].blogs[index]);
                        if(data[0].blogs[index] === blogID)
                        {
                            console.log("Now it gets swapped");
                            swap(data[0].blogs[index],data[0].blogs[data[0].blogs.length-1]);
                            break;
                        }
                    }
                    data[0].blogs.pop();
                    await data[0].save();
                    res.send(data);
                }
            });
        }
    })
}

module.exports = function(app){

    app.get('/',welcomePage);
    app.get('/register', registerPage);
    app.post('/register', signUp);
    app.post('/login', userLogin);
    app.get('/home', homePage);

    app.post('/blog/:userID',newBlog);
    app.put('/blog/:userID/:blogID', updateBlog);
    app.get('/blog/:userID', getUserBlog);
    app.get('/blog/feed/all', getAllBlogs);
    app.delete('/blog/:userID/:blogID', deleteBlog);

    // app.post('/comment/:userID/:blogID', writeComment);
    // app.delete('/comment/:userID/:blogID', removeComment);
    // app.post('/like/:userID/:blogID', hitLike);
    // app.put('/like/:userID/:blogID', disLike);


}


