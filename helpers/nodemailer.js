const nodemailer = require('nodemailer');

function sendMail(id){

	let transport = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'login',
			user: process.env.emailMailer,
			pass: process.env.passwordMailer
		}
	})
	
	let mailOptions= {
		from: 'bboyfishy@gmail.com',
		to: 'agassi.garry@gmail.com',
		subject: 'A new room has been created',
		text:  `A new room with url ${id} has been created`		
	}

	transport.sendMail(mailOptions , function(err, data) {
		if(err){
			console.log(err)
		}else{
			console.log("email sent")
		}
	})
}

module.exports = {sendMail}