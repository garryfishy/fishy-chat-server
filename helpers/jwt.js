const jwt = require('jsonwebtoken')
const {User, News} = require('../models')

  function sign(payload, secretcode){
	return  jwt.sign({payload},secretcode)
}

async function authentication (req,res,next){
    const {access_token} = req.headers;
	// console.log(access_token)
	try {
		if(access_token){
			// console.log('2')
			const tokenUser = jwt.verify(access_token, process.env.secretcode)
			// console.log(tokenUser, "<<<<ini access token coba")
			let result = await User.findByPk(tokenUser.payload.id)
			if(result){
				// console.log(result)
				req.user = {id : result.dataValues.id, username: result.dataValues.username}
				if (result){
					// console.log(result) 
					console.log(req.user.id)
					next();
				}else{
					// console.log('err')
					res.status(500).json('Internal Server Error')
				}
			}	
		}
	} catch (error) {
		res.status(500).json('Internal Server Error')
	}
}

async function authorization(req,res,next){
	try {
		const foundNews = await News.findByPk(req.params.id);
		
		if(!foundNews){
			throw{
				code: "404",
				name: "NotFound"
			}
		}

		const AuthorId = foundNews.AuthorId
		if(AuthorId !== +req.user.id ){
			// console.log(AuthorId, req.user.id)
			throw{
				code:"403",
				name: "Forbidden"
			}
		}else if(AuthorId === +req.user.id || req.user.role === 'Admin'){
			next()
		}
	} catch (error) {
		// console.log(error)
		res.status(500).json('Internal Server Error')
	}	
}

async function authorizationAdmin(req,res,next){
	try {
		const foundNews = await News.findByPk(req.params.id);
		
		if(!foundNews){
			throw{
				code: "404",
				name: "NotFound"
			}
		}

		const AuthorId = foundNews.AuthorId
		if(AuthorId !== +req.user.id ){
			// console.log(AuthorId, req.user.id)
			throw{
				code:"403",
				name: "Forbidden"
			}
		}else if(req.user.role === 'Admin'){
			next()
		}
	} catch (error) {
		// console.log(error)
		res.status(500).json('Internal Server Error')
	}	
}

module.exports = {authentication, sign,authorization, authorizationAdmin}