const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')
const User = require('./models/user')
const Token = require('./models/token')

const configPassport = (passport) => {
    
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({email: email})
        console.log('User', user)
        
        if(!user) {
            console.log('User does not exist')
            return done(null, false, { message: 'User with that email does not exist.'})
        }

        try {
            if(await bcrypt.compare(password, user.password)) {
                console.log('Compare')
                return done(null, user);
            } else {
                console.log('Compare Failed')
                return done(null, false, { message: 'Password Incorrect.'})
            }
        } catch(e) {
            console.log('Catch Block')
            return done(e);
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
      
    passport.deserializeUser(async (id, done) => {
        return done(null, await User.findById(id));
    });
}

module.exports = configPassport