function ValidateEmail (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}



module.exports = ValidateEmail;
