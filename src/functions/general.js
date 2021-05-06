const formattedNumber = (number = 0) => 
    number.toFixed()
    .toString()
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); 



export {
    formattedNumber
}