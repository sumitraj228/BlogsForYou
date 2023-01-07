const user = require('../../models/userProfile');
const blog = require('../../models/blog');
const mongoose = require('mongoose');

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

            user.findOneAndUpdate(userQuery, {
                $pull: {
                    'blogs': blogID
                }
            },(err, model) =>{
                if(err)
                    throw err;
                else    
                    res.send("The given ID got deleted from user as blog model");
            })
        }
    })
}


module.exports = {
    newBlog: newBlog,
    updateBlog: updateBlog,
    getUserBlog: getUserBlog,
    getAllBlogs: getAllBlogs,
    deleteBlog: deleteBlog
};