// TO Modify url, number_of_items, token
let optionHandler = (number_of_items, url, room_number) =>{
    const options = {
    url: url,
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token ccd973334144a36b2c459321e50c8cd202742f92'
    },
    data: JSON.stringify({number_of_items: number_of_items, room_number: room_number}),
}
return options
}

module.exports = optionHandler