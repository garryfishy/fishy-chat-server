const bcrypt = require('bcrypt')

function hashPassword(password) {
	const salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt)
}

  function checkPassword(hash, password) {
	return bcrypt.compareSync(hash, password)
}

module.exports = {hashPassword, checkPassword}