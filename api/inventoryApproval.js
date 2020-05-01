var hyperledger = require('../hyperledger/invoke')
var orderModel = require("../models/purchaseOrder")

module.exports = {
    inventoryApproval : async (req, res) =>{   
    
        args = {"po":req.body.po,"dosts":req.body.dosts,"posts":req.body.posts, "grsts":req.body.grsts, "uts":req.body.uts}
        obj = {
            chainId : "mychannel",
            chaincodeId : "track",
            fnc : "inventoryApproval",
            args : [JSON.stringify(args)]
        }
        hyperledger.invoke(obj, (cb)=>{
            console.log("AAAAAAAAAA", cb);  
            if(cb.statusCode == 500) {
                return res.status(500).send({status : cb.statusCode, data : cb.data}) 
            }else {
                orderModel.findOne({PONumber : req.body.po}, (err, order)=>{
                    if(order){
                        order.DoStatus = req.body.dosts
                        order.PoStatus = req.body.posts
                        order.GRStatus = req.body.grsts
                        order.UpdateTs = req.body.uts
                        order.save()
                    }
                })
                return res.status(200).send({status : cb.statusCode, data : args, hash : cb.data[1].tx_id})
            }   
        })
    }
}

