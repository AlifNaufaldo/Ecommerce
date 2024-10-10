function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
//   let mail = 'arif@gmail.com'
//   console.log(isValidEmail(mail));
  
module.exports = isValidEmail