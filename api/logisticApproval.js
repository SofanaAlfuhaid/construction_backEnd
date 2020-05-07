var hyperledger = require('../hyperledger/invoke')
var orderModel = require("../models/purchaseOrder")

module.exports= {
    logisticApproval : async (req, res) =>{ 

            args = {"po":req.body.po,"dosts":req.body.dosts, "uts":req.body.dosts}
            // obj = {
            //     chainId : "mychannel",
            //     chaincodeId : "track",
            //     fnc : "logisticApproval",
            //     args : [JSON.stringify(args)]
            // }
            // hyperledger.invoke(obj, (cb)=>{
            //     console.log("AAAAAAAAAA", cb);  
            //     if(cb.statusCode == 500) {
            //         return res.status(500).send({status : cb.statusCode, data : cb.data}) 
            //     }else {
                    orderModel.findOne({PONumber : req.body.po}, (err, order)=>{
                        if(order){
                            order.DoStatus = req.body.dosts
                            order.UpdateTs = req.body.uts
                            order.save()
                        }
                    })
                    return res.status(200).send({status : 200, data : args, hash : ''}) //cb.data[1].tx_id
            //     }                   
            // })
    }
}
