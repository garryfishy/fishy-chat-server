const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const {User, Translation} = require('./models/')
const {hashPassword, checkPassword} = require('./helpers/bcrypt')
const {sign, authentication} = require('./helpers/jwt')
const e = require('express')
require('dotenv').config()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', async (req,res)=> {
	let info = {
		email: req.body.email,
		username: req.body.username,
		password:hashPassword(req.body.password)
	}
	let result = await User.create(info)
	try {
		if(result){
			res.status(201).json({id: result.id, username: result.username})
		}else{
			res.status(500).json('Internal Server Error')
		}
	} catch (error) {
		res.status(500).json(error)
		
	}
})

app.post('/login', async(req,res) => {
	let info = {
		username: req.body.username,
		password: req.body.password
	}

	let result = await User.findOne({where:{username: req.body.username}})
	try {
		if(!result){
			res.status(404).json('Username not found')
		}else{
			if(checkPassword(req.body.password, result.dataValues.password)){
				const token = sign({id: result.id, username:result.username}, process.env.secretcode)
				res.status(200).json({access_token: token})
			}else{
				res.status(500).json('Internal Server Error')
			}
		}
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
})

app.use(authentication)

app.get('/translated/:id', async(req,res)=> {
	let result = await Translation.findAll({include: User, where: {UserId: req.user.id}, exclude: ['createdAt', 'updatedAt']})
	try {
		if(result.length > 0){
			res.status(200).json(result)
		}else{
			res.status(404).json('No Data')
		}
	} catch (error) {
		res.status(500).json('Internal Server Error')
	}
})

app.post('/translated', async(req,res) => {
	let translation = {
		to: req.body.to,
		from: req.body.from,
		UserId: req.user.id
	}
	let result = await Translation.create(translation)
	try {
		if(result){
			res.status(201).json({to: result.to, from: result.from, UserId: result.UserId})
		}else{
			res.status(500).json('Internal Server Error')
		}
	} catch (error) {
		res.status(500).json('Internal Server Error')		
	}
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})