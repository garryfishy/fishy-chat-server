const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const {User, Translation, VideoRoom} = require('./models/')
const {hashPassword, checkPassword} = require('./helpers/bcrypt')
const {sign, authentication} = require('./helpers/jwt')
const axios = require('axios')
const upload = require('./middleware/multer')
const image = require('./helpers/imagekit')

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
		res.status(500).json(error)
	}
})


app.get('/getrooms', async (req, res) => {
	let result = await VideoRoom.findAll({ attributes: {exclude: ['createdAt','updatedAt']}, order: [['name', 'ASC']]})
	console.log('test')
	try {
		if(result){
			res.status(200).json(result)
		}else{
			res.status(500).json('Internal Server Error')
		}
	} catch (error) {
		res.status(500).json('Internal Server Error')
	}
})


app.use(authentication)


app.post('/videoRoom', upload.single('image'),  async(req,res) => {
	let result = await axios({
		method: "POST",
		url:"https://api.daily.co/v1/rooms",
		headers: {'Content-Type': 'application/json','Authorization': 'Bearer b399e15938e6f866ff346a310d8ca685b00cb1225ee8c5933dd0b075b6cf6b25'}
		})
		try {
			if (result){
				let {
					name,
					description,
				} = req.body
				const imageName = await req.file.originalname
				const buffer = req.file.buffer.toString('base64')
				let imgUrl =await image(imageName, buffer)
				let url = result.data.url
				imgUrl = imgUrl.url
				console.log(name,description,url,imgUrl)
				console.log(name,description,url,imgUrl)
				let video = await VideoRoom.create({name,description,url,imgUrl})
				try {
					if(video){
						res.status(201).json(video.dataValues)
					}
				} catch (error) {
					// console.log(error)
					res.status(500).json('Internal Server Error')
				}
			}
		} catch (error) {
			res.status(500).json('Internal Server Error')
		}
})



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
	// console.log(req.user.id)
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

app.delete('/translated/:id', async function(req, res){
	let result = await Translation.destroy({where: {UserId: req.user.id, id: req.params.id}})
	try {
		if(result){
			res.status(200).json('Deleted')
		}
	} catch (error) {
		res.status(500).json('Internal Server Error')
	}
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})