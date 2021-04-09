import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = (req,res) => {
    UserModel
        .create({
            email: req.body.email,
            password: req.body.password
        })
        .then(_ => {
            const message = `L'utilisateur à bien été crée`
            res.json({message})
        })
        .catch(error => {
            res.status(401).send(error.errors)
        })
}


export const login = (req, res) => {
    const {email , password} = req.body
    
    UserModel
        .find({ email })
        .then(user => {
            if(!user) {
                const message = "Utilisateur inconnu"
                res.status(404).json({ message })
            }
            bcrypt
                .compare(password, user[0].password)
                .then(isPasswordValid => {
                    if(isPasswordValid) {
                        const accesstoken = jwt.sign({userId: user._id}, process.env.TOKEN_SECRET, {expiresIn: '24h'})
                        const message = "Connecter"
                        res.json({message, accesstoken, user})
                    } else {
                        const message = "Mot de passe invalid"
                        res.status(401).json({ message })
                    }
                })
        })
        .catch(err => {
            const message = "L'utilisateur n'a pas pu être connecter. Réesayer dans quelques instants"
            res.status(500).json({ message, data: err })
        })
}


export const logout =  (_,res) => {
    res.send('deconnexion')
}