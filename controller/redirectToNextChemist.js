const knex = require('../model/knex');

const session = require('express-session');

module.exports = async (req,res)=>{

    for(var drugs of req.session.context){

        await knex('local_chemist_list').where({

            'orderId' : drugs.orderId,
    
            'status' : 0
    
        }).then(async result=>{

            table_data = result;

        })

        // for(var table_coloumn of table_data){

            if(table_data.length == 0){

                await knex('orders').update({
            
                    status: '1'
                
                }).where({
        
                    'orderId' : drugs.orderId
        
                }).then(result=>{
        
                    res.send('done!');
                
                })

                return;
    
            }else{
    
                await knex('local_chemist_list').update({
    
                    'status' : 1
    
                }).where({
    
                    'orderId' : drugs.orderId,
            
                    'email' : table_data[0].email
            
                }).then(data=>{
    
                    res.send(req.session.context);
    
                })

                return;
    
            }
    
        // }
        return;

    }

};