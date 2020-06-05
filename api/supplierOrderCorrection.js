var hyperledger = require('../hyperledger/invoke')
var orderModel = require("../models/purchaseOrder")

module.exports = {
   supplierOrderCorrection : async (req, res) =>{  
       args = {"po":req.body.po,"posts": req.body.posts, "uts" : req.body.uts}
       obj = {
           chainId : "mychannel",
           chaincodeId : "track",
           fnc : "stockRelease",
           args : [JSON.stringify(args)]
       }
       hyperledger.invoke(obj, (cb)=>{
           console.log("AAAAAAAAAA", cb); 
           if(cb.statusCode == 500) {
               return res.status(500).send({status : cb.statusCode, data : cb.data}) 
           }else {
               orderModel.findOne({PONumber : req.body.po}, (err, order)=>{
                   if(order){
                       order.PoStatus = req.body.PoStatus
                       order.UpdateTs = req.body.uts
                       order.save()
                   }
               })
               return res.status(200).send({status : 200, data : args, hash : ''}) //cb.data[1].tx_id
           }
       })
   }        
}