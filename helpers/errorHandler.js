function errorHandler(err, req,res,next) {
	let code = err.code || 500;
	let message = "Internal Server Error"

	if(err.name === "badRequest"){
		message = "Bad Request"
	}else if(message === "SequelizeValidationError"){
		code= 400
		const errors = err.erros.map(err =>{
			return error.message
		})
		message=errors
	}else if (err.name === "emailNotFound"){
		message = "Email not registered"
	}else if(err.name === 'invalidCredentials'){
		message = "Email or Password mismatch"
	}else if(err.name === 'invalidJWT'){
		message = "Invalid JWT"
	}else if (err.name === 'NotFound'){
		message = "Selected news cannot be found"
	}else if (err.name === 'Forbidden'){
		message = "You don't have access to edit this article"
	}

	res.status(code).json({message})
}

module.exports=errorHandler