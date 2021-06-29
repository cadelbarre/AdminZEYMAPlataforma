const formattedNumber = (number = 0) => 
    number.toFixed()
    .toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); 

  //   const formattedNumber = (number = 0) => { 
  //   var fixed = number.toFixed()
  //   .toString()
  //   .replace(/\D/g, "")
  //   .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  //   var final = ''
   // number < 0 ? final = '-'+fixed : final = fixed

  //   return final 
  // } 

export {
    formattedNumber
}