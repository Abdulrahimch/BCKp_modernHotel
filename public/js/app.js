
//const http = require('http');
//const data = JSON.stringify({
//  number_of_items: 5
//})
//
//
//const options = {
//  url: 'http://127.0.0.1:8000/api/roomservice/pide/',
//  method: 'POST',
//  headers: {
//    'Content-Type': 'application/json',
//    'Content-Length': data.length,
//    'Authorization': "Token ccd973334144a36b2c459321e50c8cd202742f92"
//  },
//  data: JSON.stringify({number_of_items: 7})
//}




function removeOrder(id) {

    id.parentNode.innerHTML = '';
}



const isGuest = function(){
    const guest = document.getElementById('radioOne')
    const staff = document.getElementById('radioTwo')
    const admin = document.getElementById('admin')
    const personal = document.getElementById('personal')
    let style = ""
    if (guest.checked == true){
        style = "none"
        document.getElementById("role").style.display = style
        document.getElementById("team").style.display = style
        document.getElementById("bellboy").style.display = style

    } else if (staff.checked == true){
        style = "block"
        document.getElementById("role").style.display = style
        document.getElementById("team").style.display = style
        document.getElementById("bellboy").style.display = style
        if (admin.checked == true){
            document.getElementById("bellboy").style.display = 'none'
        }
    }

}





//let  getResults = async (query, req) => {
//    let url = 'http://127.0.0.1:5000/users/login'
//    let res = await fetch(url, req)
//
//}
//getResults().then((res) => {
//    console.log(` the result is ${res}`)
//}).catch((error) => {
//    console.log(`the error is ${error}`)
//})
//const readCredentials(){
//    email = document.getElementById('email').placeholder
//    pass = document.getElementById('pass').placeholder
//    const req = {
//    method: 'POST',
//    headers: {
//        'Content-Type': 'application/json',
//    },
//    mode: 'no-cors',
//    body: JSON.stringify({email:email, password:pass})
//    getResults()
//}
//

//const redirect = function(){
//    console.log('verifying detecting click')
//    const guest = document.getElementById('guest')
//    const staff = document.getElementById('staff')
//    const admin = document.getElementById('admin')
//    const personal = document.getElementById('personal')
//    const hk = document.getElementById('hk')
//    const rm = document.getElementById('rm')
//    const bb = document.getElementById('bb')
//    if (guest.checked == true){
//        readCredentials()
//        console.log('been sent')
//    }
//}





























//on submit:
//1- if is_guest ----> redirect to guest/homepage http://127.0.0.1/5000/hone
//2- else if is_staff {
//    1- admin:
//        1-houseKeeping: return housekeeping/dashboard
//        2-roomService: return roomservice/dashboard
//    2- personal:
//        1-houseKeeping: return housekeeping/staff http://127.0.0.1/1337/housekeeping
//        2-roomService: return roomservice/staff http://127.0.0.1/1337/roomservice
//        3-bellBoy: return bellboy/staff http://127.0.0.1/1337/bellboy



//
//acount: is_guest OR is_staff
//
//role: is_admin OR is_staff
//
//team: is_housekeeping OR is_roomservice or is_bellboy
//
//account: [{is_guest:true}, {is_staff:true}]

//if (req.body.account === {is_guest:true}){
//    user = User.findByCredentials(email, password)
//    if (user)
//    return res.redirect('home')
//} else if()
//
//if (user){
//    if (req.body.account === {is_guest:true}){
//        return res.redirect('home')
//    }else if (req.body.account === {is_staff:true}){
//        if (req.body.role === {is_admin:true}){
//            if (req.body.team === {is_hosuekeeping}){
//                return res.redirect('dashbaord-HK')
//            }else {
//                return res.redirect('dashbaord-RM')
//            }
//        } else if (req.body.role === {is_personal:true})
//             if (req.body.team === {is_hosuekeeping}){
//                return res.redirect('home-HK')
//            }else if (req.body.team === {is_roomservice}){
//                return res.redirect('home-RM')
//            }else{
//                return res.redirect('home-bellboy')
//            }
//    }
//    }
//}
//

//switch (account){
//    case 'guest':
//        res.redirect('home')
//        break;
//
//    case 'staff':
//        switch(role){
//            case 'admin':
//                switch(team){
//                    case 'housekeeping':
//                        res.respond('dashboard-hk')
//                        break;
//                    case 'roomservice':
//                            res.respond('dashboard-rm')
//                            break;
//                }
//            case 'personal':
//                switch(team){
//                    case 'housekeeping':
//                        res.respond('home-hk')
//                        break;
//                    case 'roomservice':
//                        res.respond('home-rm')
//                        break;
//                    case 'bellboy':
//                        res.respond('home-bb')
//                        break;
//                }
//        }
//}