import mongoose from 'mongoose'

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        lowercase: true,
    },
    image: {
        type: String,
        required: true,
        lowercase: true,
    },
    maxPersons: {
        type: Number,
        default: 1,
        validate: value => {
            if(value <= 0) {
                throw new Error('La chambre doit pouvoir acceuillir au moins une personne.')
            }
        }
    }
})

const Room = mongoose.model('Room', RoomSchema)

export default Room