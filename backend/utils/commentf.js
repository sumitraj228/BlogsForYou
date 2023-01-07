const blog = require('../../models/blog');
const mongoose = require('mongoose');
const comment = require('../../models/comment');

const writeComment = (req,res,next) =>{
    
    let text = req.body.text;
    let userID = req.params.userID;
    let blogID = req.params.blogID;

    let query = {
        text: text,
        userDetails: userID
    }

    comment.create(query,(err,data) =>{
        if(err)
            throw err;
        else
        {
            blog.find({"_id":blogID},async (error,result)=>{
                if(error)
                    throw err;
                else
                {
                    result[0].comments.push(data._id);
                    await result[0].save();
                    res.send(result);
                }
            })
        }
    })
}

const removeComment = (req,res,next) =>{

    let userID = req.params.userID;
    let blogID = req.params.blogID;
    let commentID = req.params.commentID;

    let blogQuery = {
        "_id" : blogID
    }

    comment.findByIdAndDelete(commentID,(err)=>{
        if(err)
            throw err;
        else    
        {
            commentID = mongoose.Types.ObjectId(commentID)
            console.log(commentID);

            blog.findOneAndUpdate(blogQuery, {
                $pull: {
                    'comments': commentID
                }
            },(err, model) =>{
                if(err)
                    throw err;
                else    
                    res.send("The comment with given ID got deleted from blog ");
            })
        }
    })

}

module.exports = {
    writeComment: writeComment,
    removeComment: removeComment
}