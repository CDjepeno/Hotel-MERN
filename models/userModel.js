import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import pkg from 'validator';
const {isEmail} = pkg;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: {
            message: 'Le champ email est requis'
        },
        validate: [isEmail,'Email pas au bon format'],
        unique: true
    },
    password: {
        type: String,
        required: {
            message: 'Le champ password est requis'
        }
    },
    role: {
        type: [String],
        default: 'user'
    }
})

// Before - Register
UserSchema.pre('save', async function(next) {
    const user = this

    const hash = await bcrypt.hash(user.password, 10)

    user.password = hash

    next()
})


const Usermodel = mongoose.model('User', UserSchema)

export default Usermodel