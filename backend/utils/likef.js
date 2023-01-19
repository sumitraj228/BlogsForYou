const blog = require('../../models/blog');

const hitLike = (req,res,next) =>{

    if('user' in req)
    {
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
                    res.redirect(`/feed/${userID}/${blogID}`);
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
                            res.redirect(`/feed/${userID}/${blogID}`);
                        }
                    })
                }
            }
        })
    }
    else    
        res.redirect('/')
}

module.exports = {
    hitLike: hitLike
}