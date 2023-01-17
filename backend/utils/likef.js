const blog = require('../../models/blog');

const hitLike = (req,res,next) =>{

    let userID = req.params.userID;
    let blogID = req.params.blogID;

    blog.find({"_id": blogID}, async (err,result) =>{
        if(err)
            throw err;
        else{
            // find the userID in likes array
            if(!result[0].likes.includes(userID.toString()))
            {
                result[0].likes.push(userID);
                await result[0].save();
                console.log("Liked the blog");
                res.redirect('/feed');
            }
            else
            {   
                blog.findOneAndUpdate({"_id": blogID}, {
                    $pull: {
                        'likes': userID
                    }
                },(error, model) =>{
                    if(error)
                        throw error;
                    else    
                    {    
                        console.log("You removed your like from this blog.");
                        res.redirect('/feed');
                    }
                })
            }
        }
    })
}

module.exports = {
    hitLike: hitLike
}