const knex = require('../model/knex');

module.exports = async(req,res)=>{

    submit_by_jan_aushadhi = [];

    for(var drug of Object.keys(req.body)){

        if(drug != 'orderId'){

            genericDrugs = {};
    
            for(var keys of Object.keys(req.body[drug])){
               
               if(/^\d*\.?\d+$/.test(keys)){
    
                    genericDrugs.drug_code = keys;
    
                    genericDrugs.price = req.body[drug][keys].Price;
        
                    genericDrugs.composition =  req.body[drug][keys].composition;

                    genericDrugs.quantity = req.body[drug][keys].Quantity;

                    genericDrugs.orderId = req.body.orderId;
    
                    submit_by_jan_aushadhi.push(genericDrugs);
    
                    break;
    
               }
    
            }
    
        }

    }

    for(var genericDrug of submit_by_jan_aushadhi){

        await knex('orders').where({

            'orderId' : req.body.orderId

        }).then(async result=>{
            
            if(result.length != 0 ){

                await knex('generic_drugs').where({

                    'drug_code' : genericDrug.drug_code
    
                }).then(async result=>{
                    
                    if(result.length == 0){
    
                        await knex('generic_drugs').insert(genericDrug).then(async result=>{

                            await knex('orders').update({
            
                                status: '2'
                            
                            }).where({
                    
                                'orderId' : req.body.orderId
                    
                            }).then(result=>{
                    
                                res.send('done!');
                            
                            })

                        })

                    }
    
                })

            }

        })
    }

};