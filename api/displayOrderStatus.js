var hyperledger = require('../hyperledger/invoke')
var orderModel = require("../models/purchaseOrder")

module.exports = {

    displayOrderStatus : async (req, res) =>{   
        args = {"po":req.body.po,"ccorder":req.body.ccorder, "futs":req.body.futs,"conum":req.body.conum}
        obj = {
            chainId : "mychannel",
            chaincodeId : "track",
            fnc : "displayOrderStatus",
            args : [JSON.stringify(args)]                             
        }
        hyperledger.invoke(obj, (cb)=>{
            console.log("AAAAAAAAAA", cb); 
            if(cb.statusCode == 500) {
                return res.status(500).send({status : cb.statusCode, data : cb.data}) 
            }else {
                orderModel.findOne({PONumber : req.body.po}, (err, order)=>{
                    if(order){
                        for (i = 0; i < order.ForemenUpdate.length; i++){
                            if (order.ForemenUpdate[i].conum == req.body.conum) {
                                order.ForemenUpdate[i].ccorder = req.body.ccorder             //req.body.ccorder
                                order.ForemenUpdate[i].futs = req.body.futs
                                order.save()
                            }
                        }
                    }
                })
                return res.status(200).send({status : cb.statusCode, data : args, hash : cb.data[1].tx_id})
            }   
        })
    }
}

// displayOrderStatus()
