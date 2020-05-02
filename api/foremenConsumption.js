var hyperledger = require('../hyperledger/invoke')
var orderModel = require("../models/purchaseOrder")
var randomstring = require('randomstring');

module.exports = {
    
    foremenConsumption : async (req, res) =>{ 
        number = randomstring.generate({
            length: 5,
            charset: 'numeric'
          });
        var conum = "s" + number  
            args = {"po":req.body.po,"foreid":req.body.foreid,"purps":req.body.purps,"fdec":req.body.fdec, "ccorder":req.body.ccorder,"conum":conum,"pquanty":req.body.pquanty, "futs":req.body.futs};
            obj = {
                chainId : "mychannel",
                chaincodeId : "track",
                fnc : "formenConsumption",
                args : [JSON.stringify(args)]
            }
            hyperledger.invoke(obj, (cb)=>{
                console.log("AAAAAAAAAA", cb);
                if(cb.statusCode == 500) {
                    return res.status(500).send({status : cb.statusCode, data : cb.data}) 
                }else {
                    orderModel.findOne({PONumber : req.body.po}, (err, order)=>{
                        if(order){
                            order.ForemenUpdate.push({"foreid":req.body.foreid,"purps":req.body.purps,"fdec":req.body.fdec, "ccorder":req.body.ccorder,"conum":conum,"pquanty":req.body.pquanty, "futs":req.body.futs, "batchid" : null, "bweght" : null, "density" : null})
                            order.save()
                        }
                    })
                    return res.status(200).send({status : cb.statusCode, data : args, hash : cb.data[1].tx_id})
                }      
            })
    }
}

