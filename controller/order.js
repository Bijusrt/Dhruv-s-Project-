const knex = require('../model/knex');

module.exports = async(req, res) => {

    var orderDict = {

        phone : req.body['Phone_Number'],

        cloudpath : req.body['Cloud_Path'],

        lat : req.body.Lat,

        lon : req.body.Long,

        address : req.body.Address,

        phone_path : req.body['Phone_Path'],

        orderId : req.body.OrderId

    }
    
    await knex('orders').where({
        
        'orderId':req.body.OrderId
    
    }).then(async result=>{

        if(result.length == 0){

            await knex('orders').insert(orderDict).then(async result=>{

                for(var i of Object.keys(req.body.chemist)){
        
                    await knex('local_chemist_list').where({
                        
                        'email':i,
                        
                        'orderId':req.body.OrderId
                    
                    }).then(async result=>{
        
                        if(result.length == 0){
        
                            await knex('local_chemist_list').insert({
                        
                                'email': i,
                     
                                'orderId' : req.body.OrderId,
                
                                'status' : req.body.chemist[i]
                
                            })
        
                        }
        
                    })
                   
                }
        
            })

        }

    });

    res.status(200).json('order placement success!')

};