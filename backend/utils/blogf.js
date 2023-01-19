const user = require('../../models/userProfile');
const blog = require('../../models/blog');
const mongoose = require('mongoose');

const writeBlog = (req,res,next)=>{

    let userID = req.params.userID;
    res.render('createBlog',{
        userID:userID
    })

}

const newBlog = (req,res,next) =>{

    if('user' in req)
    {       
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
                        res.redirect(`/home/${userID}`);
                    }
                })
                
            }
        });
    }
    else
        res.redirect('/');    
    

}

const updateBlogPage = (req,res,next) =>{

    if('user' in req)
    {
        // res.send("In the update blog section")
        let userID = req.params.userID;
        let blogID = req.params.blogID;

        blog.findById(blogID,(err,data)=>{
            if(err)
                throw err;
            else
            {
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
    else
        res.redirect('/');    

}

const updateBlog = async (req,res,next) =>{
    
    if('user' in req)
    {
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
                res.redirect(`/home/${userID}`);
            }   
                
        })
    }
    else
        res.redirect('/');    



}

const getUserBlog = async (req,res,next) =>{

    if('user' in req)
    {

        let userID = req.params.userID;
        let query = {
            "_id": userID
        };
        const data = await user.find(query).populate({path: "blogs"});
        
        res.render('getUserBlogs',{
            data: data[0],
            userID: userID
        });
    }
    else
        res.redirect('/');    

}

const getAllBlogs = (req,res,next) =>{

    if('user' in req)
    {
        let userID = req.user._id;
        blog.find({},(err,data)=>{
            if(err)
                throw err;
            else    
            {
                res.render('getFeeds',{
                    data: data,
                    userID: userID
                })
            }
                
        })
    }
    else  
        res.redirect('/');    
    
}

const getOneBlog = (req,res,next) =>{

    if('user' in req)
    {
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
                let comments = await blog.find({"_id":blogID}).populate({path: "comments"});
                
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
    else
    res.redirect('/');    
    
    
}

const deleteBlog = (req,res,next) =>{

    if('user' in req)
    {
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
                        res.redirect(`/blog/${userID}/all`);
                    }
                })
            }
        })
    }
    else
        res.redirect('/')
    
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