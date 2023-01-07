const welcomef = require('./utils/welcomef');
const userProfilef = require('./utils/userProfilef');
const blogf = require('./utils/blogf');
const commentf = require('./utils/commentf');
const likef = require('./utils/likef');

module.exports = function(app){

    app.get('/',welcomef.welcomePage);
    app.get('/register', userProfilef.registerPage);
    app.post('/register', userProfilef.signUp);
    app.post('/login', userProfilef.userLogin);
    app.get('/home', userProfilef.homePage);

    app.post('/blog/:userID',blogf.newBlog);
    app.put('/blog/:userID/:blogID', blogf.updateBlog);
    app.get('/blog/:userID', blogf.getUserBlog);
    app.get('/blog/feed/all', blogf.getAllBlogs);
    app.delete('/blog/:userID/:blogID', blogf.deleteBlog);

    app.post('/comment/:userID/:blogID', commentf.writeComment);
    app.delete('/comment/:userID/:blogID/:commentID', commentf.removeComment);
    app.post('/like/:userID/:blogID', likef.hitLike);


}


