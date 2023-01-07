const welcomePage = (req,res,next) => {
    console.log("I am at the login Page");
    res.send("Hello! Please wait. Its loading!")
}

module.exports = {
    welcomePage: welcomePage
};