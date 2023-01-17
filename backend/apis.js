const welcomef = require('./utils/welcomef');
const userProfilef = require('./utils/userProfilef');
const blogf = require('./utils/blogf');
const commentf = require('./utils/commentf');
const likef = require('./utils/likef');
const passport = require('passport');

module.exports = function(app){

    app.get('/',welcomef.welcomePage);
    app.get('/register', userProfilef.registerPage);
    app.post('/register', userProfilef.signUp);
    app.get('/login', userProfilef.loginPage);
    app.post('/login', passport.authenticate('local'),userProfilef.userLogin);
    app.get('/home/:userID', userProfilef.homePage);

    app.get('/blog/:userID',blogf.writeBlog);
    app.post('/blog/:userID',blogf.newBlog);

    app.get('/blog/update/:userID/:blogID', blogf.updateBlogPage);
    app.post('/blog/update/:userID/:blogID', blogf.updateBlog);

    app.get('/blog/:userID/all', blogf.getUserBlog);
    app.get('/feed', blogf.getAllBlogs);
    app.get('/feed/:userID/:blogID', blogf.getOneBlog);
    app.get('/blog/delete/:userID/:blogID', blogf.deleteBlog);

    app.post('/comment/:userID/:blogID', commentf.writeComment);
    app.delete('/comment/:userID/:blogID/:commentID', commentf.removeComment);
    app.get('/like/:userID/:blogID', likef.hitLike);
     
    app.get('/logout',userProfilef.logout)

} 


