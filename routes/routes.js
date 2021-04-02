import express from 'express'
import {config} from '../Docs-API/docs-config.js'
import {server} from '../Docs-API/docs-config.js'
import {getRooms,deleteRooms,getOneRoom,updateRoom,addRoom} from '../controllers/roomControllers.js'
import {register, login, logout} from '../controllers/userController.js'
import { auth } from '../auth/auth.js'
// Path with ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()
const app = express()

/**
 * Documentation API
 */
router.use('/api-docs', server, config)


router.get('/', (_,res) => {
    res.send('home page')
})

router.get('/api/rooms',auth, getRooms)

router.put('/api/rooms/:id',auth, updateRoom)

router.post('/api/rooms',auth, addRoom)

router.post('/api/register',auth, register)

router.post('/api/login', login)

router.get('/api/rooms/:id', auth, getOneRoom)

router.get('/api/logout',auth, logout)

router.delete('/api/rooms/:id', auth, deleteRooms)

//  router.get('/*', (_,res) => {
//     res.sendFile(path.join(__dirname,'../client/build/index.html'))
//  })

export default router