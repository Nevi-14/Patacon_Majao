const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (Contrasena) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(Contrasena, salt);
  return hash;
};

helpers.matchPassword = async (Contrasena, savedPassword) => {
  try {
    return await bcrypt.compare(Contrasena, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;
