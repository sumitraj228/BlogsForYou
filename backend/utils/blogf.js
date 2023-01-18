const user = require('../../models/userProfile');
const blog = require('../../models/blog');
const mongoose = require('mongoose');

const writeBlog = (req,res,next)=>{

    let userID = req.params.userID;
    console.log("You are in the write blog Page");
    res.render('createBlog',{
        userID:userID
    })

}

const newBlog = (req,res,next) =>{

    let title = req.body.title;
    let content = req.body.content;
    let userID = req.params.userID;
    let createdBy = req.user.name;

    let query = {
        "_id": userID
    };

    const uploadBlog = new blog({
        title: title,
        content: content,
        createdBy: createdBy,
        userID: userID
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
                    console.log("A new blog got created");
                    res.redirect(`/home/${userID}`);
                }
            })
            
        }
    });

}

const updateBlogPage = (req,res,next) =>{

    // res.send("In the update blog section")
    let userID = req.params.userID;
    let blogID = req.params.blogID;

    console.log("In the update blog Page");

    blog.findById(blogID,(err,data)=>{
        if(err)
            throw err;
        else
        {
            console.log(data);
            let title = data.title;
            let content = data.content;

            res.render('updateBlog',{
                userID: userID,
                blogID: blogID,
                title: title,
                content: content
            });
        }
    })
    

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
            console.log("Data updated successfullly");
            res.redirect(`/home/${userID}`);
        }   
            
    })



}

const getUserBlog = async (req,res,next) =>{

    let userID = req.params.userID;
    let query = {
        "_id": userID
    };

    // const data = await user.find(query).populate({path: "blogs", model: "blog"});
    const data = await user.find(query).populate({path: "blogs"});
    
    res.render('getUserBlogs',{
        data: data[0],
        userID: userID
    });

}

const getAllBlogs = (req,res,next) =>{

    console.log("You are in the feed section");
    // res.send("You are in the feed section");
    let userID = req.user._id;


    blog.find({},(err,data)=>{
        if(err)
            throw err;
        else    
        {
            // console.log(data)
            res.render('getFeeds',{
                data: data,
                userID: userID
            })
        }
            
    })
}

const getOneBlog = (req,res,next) =>{

    let userID = req.params.userID;
    let blogID = req.params.blogID;
    let userBlog = false;

    user.findById(userID,(err,data)=>{
        if(err)
            throw err;
        else
        {
            for(let i=0;i<data.blogs.length;i++)
            {
                if(data.blogs[i]._id == blogID)
                {
                    userBlog = true;
                    break;
                }
            }
        }
    })
        
    blog.findById(blogID,async (err,data)=>{
        if(err)
            throw err;
        else  
        {
            // console.log(data)
            let comments = await blog.find({"_id":blogID}).populate({path: "comments"});
            // console.log(comments[0])
            
            res.render('getOneBlog',{
                title: data.title,
                content: data.content,
                userID: userID,
                blogID: blogID,
                comment: comments[0],
                userBlog: userBlog
            })
        }
        
    })
    
}

const deleteBlog = (req,res,next) =>{

    console.log("You are in the delete Process")
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
                {
                    console.log("You have deleted successfully")
                    res.redirect(`/blog/${userID}/all`);
                }
            })
        }
    })
}


module.exports = {
    newBlog: newBlog,
    updateBlog: updateBlog,
    getUserBlog: getUserBlog,
    getAllBlogs: getAllBlogs,
    deleteBlog: deleteBlog,
    writeBlog: writeBlog,
    updateBlogPage: updateBlogPage,
    getOneBlog: getOneBlog
};