const renderRequest = function (user){
switch (user.account){
    case 'guest':

//        if (reqBody.account !== 'guest'){
//            console.log(`You are not ${reqBody.account}`)
//            throw new Error(`You are not a ${reqBody.account}`)
//            }

        return 'http://192.168.1.41:5000/home';
        break;

    case 'staff':
//        if (reqBody.account !== 'staff'){
//            console.log(`You are not ${reqBody.account}`)
//            throw new Error(`You are not ${reqBody.account}`)
//        }
        switch(user.designation){
            case 'admin':
//                if (reqBody.role !== 'admin'){
//                    console.log(`You are not ${reqBody.role}`)
//                    throw new Error(`You are not ${reqBody.role}`)
//                }
                switch(user.department){
                    case 'house keeping':
//                        if (reqBody.team !== 'house keeping'){
//                            console.log(`You are not in ${reqBody.team} team`)
//                            throw new Error(`You are not in ${reqBody.team} team`)
//                        }
                        console.log('this is housekeeping for Admin')
                        //res.respond('dashboard-hk')
                        break;
                    case 'room service':
//                        if (reqBody.team !== 'room service'){
//                            console.log(`You are not in ${reqBody.team} team`)
//                            throw new Error(`You are not in ${reqBody.team} team`)
//                        }
                        console.log('this is roomservice for admin')
                        res.respond('dashboard-rm')
                        break;
            break;
                }
            break;
            case 'personal':
//                 if (reqBody.role !== 'personal'){
//                    console.log(`You are not ${reqBody.role}`)
//                    throw new Error(`You are not ${reqBody.role}`)
//                }
                switch(user.department){
                    case 'house keeping':
//                        if (reqBody.team !== 'house keeping'){
//                            console.log(`You are not in ${reqBody.team} team`)
//                            throw new Error(`You are not in ${reqBody.team} team`)
//                        }
                        console.log('this is hosuekeeping for personal')
                        //res.respond('home-hk')
                        return 'http://192.168.1.41:5000/housekeeping';


                        break;
                    case 'room service':
//                        if (reqBody.team !== 'room service'){
//                            console.log(`You are not in ${reqBody.team} team`)
//                            throw new Error(`You are not in ${reqBody.team} team`)
//                        }
                        console.log('this is roomservice for persnoall')
                        //res.respond('home-rm')
                        return 'http://192.168.1.41:5000/roomservice';
                        break;
                    case 'bellboy':
//                        if (reqBody.team !== 'bellboy'){
//                            console.log(`You are not in ${reqBody.team} team`)
//                            throw new Error(`You are not in ${reqBody.team} team`)
//                        }
                        console.log('this is bellboy for personnal')
                        //res.respond('home-bb')
                        return 'http://192.168.1.41:5000/bellboy';
                        break;
                }
        break;
        }

    break;
}
}

module.exports = renderRequest