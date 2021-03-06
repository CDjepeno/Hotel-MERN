import jwt from 'jsonwebtoken'


export const auth = (req,res,next) => {
    
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader) {
        const message ="Vous n'avez pas fournie de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête"
        return res.status(401).json({message})
    }
    
    const token = authorizationHeader.split(' ')[1] 
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET, (error, decodedToken) => {
        if(error) {
            const message = "L'utilisateur n'est pas authorisé à acceder à cette ressource"
            return res.status(401).json({message, data:error})
        }

        const userId = decodedToken.userId

        if(req.body.userId && req.body.userId !== userId) {
            const message = "L'identifiant de l'utilisateur est invalide"
            res.status(401).json({ message })
        } else {
            next()
        }
    })
}