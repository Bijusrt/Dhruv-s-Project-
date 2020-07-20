const session = require('express-session');

const knex = require('../model/knex');

module.exports = async(req,res)=>{

    var final_submit_by_chemist = [];

    for(var drug of Object.keys(req.body)){

        if(drug != 'orderId'){

            brandedDrugs = {

                drug_name : drug,
    
                quantity : req.body[drug].Quantity,
    
                data_price : req.body[drug].Data_Price,

                orderId : req.body.orderId
    
            }
    
            for(var keys of Object.keys(req.body[drug])){
               
               if(/^\d*\.?\d+$/.test(keys)){
    
                    brandedDrugs.generic_key = keys;
    
                    brandedDrugs.branded_price = req.body[drug][keys].Price;
    
                    brandedDrugs.store = req.body[drug][keys].Store;
    
                    brandedDrugs.composition =  req.body[drug][keys].composition;
    
                    final_submit_by_chemist.push(brandedDrugs);
    
                    break;
    
               }else{
                    
                    brandedDrugs.generic_key = 404;
    
                    brandedDrugs.branded_price = req.body[drug].Price;
    
                    brandedDrugs.store = req.body[drug].Store;
    
                    brandedDrugs.composition = req.body[drug].composition;
    
                    final_submit_by_chemist.push(brandedDrugs);
    
                    break;
    
               }
    
            }
    
        }

    }

    redirect_to_next_chemist_list = [];

    var redirect_flag = true; 

    for(var brandedDrug of final_submit_by_chemist){

        if(brandedDrug.branded_price == undefined || brandedDrug.branded_price == ''){console.log(1);

            delete brandedDrug.branded_price;

            delete brandedDrug.store;

            redirect_to_next_chemist_list.push(brandedDrug);

            redirect_flag = false;

        }else{

            await knex('orders').where({

                'orderId' : req.body.orderId

            }).then(async result=>{
                
                if(result.length != 0 ){

                    await knex('branded_drugs').where({

                        'drug_name' : brandedDrug.drug_name
        
                    }).then(async result=>{
                        
                        if(result.length == 0){
        
                            await knex('branded_drugs').insert(brandedDrug).then(result=>{})
                        }
        
                    })

                }

            })

        }
        
    }

    if(redirect_flag){

        knex('orders').update({
            
            status: '1'
        
        }).where({

            'orderId' : req.body.orderId

        }).then(result=>{

            res.send('done!');
        
        })

    }else{ 
        console.log(12);
        req.session.context = redirect_to_next_chemist_list ;

        res.redirect('/redirect/nextchemist');

    }

}