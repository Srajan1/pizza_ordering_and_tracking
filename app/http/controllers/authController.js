const User = require('../../models/user');
const bcrypt = require('bcrypt');
function authController(){
    return {
        login(req, res){
            res.render('auth/login')
        },
        register(req, res){
            res.render('auth/register')
        },
        async postRegister(req, res){
            const {name, email, password} = req.body;
            // console.log(req.body);
            if(!name || !email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/register');
            }

            // Check if email exists
            User.exists({email: email}, (err, result) => {
                if(result){
                    req.flash('error', 'Email already in use');
                    return res.redirect('/register');
                }
            })
            // hash password
            const hashPassword = await bcrypt.hash(password, 10);

            // Create a user
            const user = new User({
                name: name,
                email: email,
                password: hashPassword
            })
            user.save().then((user) => {
                return res.redirect('/');
            }).cathc((err) => {
                req.flash('error', 'Something went wrong');
                    return res.redirect('/register');
            });

        }
    }
}

module.exports = authController;