var hyperledger = require('../hyperledger/invoke')
var orderModel = require("../models/purchaseOrder")

module.exports= {
    logisticApproval : async (req, res) =>{ 
            // console.log("req.body", req.body)
            args = {"po":req.body.po,"dosts":req.body.dosts, "uts":req.body.dosts.toString()}
            obj = {
                chainId : "mychannel",
                chaincodeId : "track",
                fnc : "logisticApproval",
                args : [JSON.stringify(args)]
            }
            hyperledger.invoke(obj, (cb)=>{
                console.log("AAAAAAAAAA", cb);  
                if(cb.statusCode == 500) {
                    return res.status(500).send({status : cb.statusCode, data : cb.data}) 
                }else {
                    orderModel.findOne({PONumber : req.body.po}, (err, order)=>{
                        if(order){
                            if (order.itemName == "Cement") {
                                if (order.Standard[0] * order.Quantity == req.body.weght) {
                                    order.DoStatus = req.body.dosts
                                    order.UpdateTs = req.body.uts
                                    order.save()
                                    return res.status(200).send({status : 200, data : "received", hash : ''}) //cb.data[1].tx_id
                                }else {
                                    order.DoStatus = "dispute"
                                    order.UpdateTs = req.body.uts
                                    order.save()
                                    return res.status(500).send({status : 500, data : "dispute", hash : ''}) //cb.data[1].tx_id
                                }
                            }else {
                                if (order.Standard[3] * order.Quantity == req.body.weght) {
                                    if (order.Standard[0] == req.body.innerdia && order.Standard[1] == req.body.outerdia && order.Standard[2] == req.body.wallwidth) {
                                        order.DoStatus = req.body.dosts
                                        order.UpdateTs = req.body.uts
                                        order.save()
                                        return res.status(200).send({status : 200, data : "received", hash : ''}) //cb.data[1].tx_id
                                    }else {
                                        order.DoStatus = "dispute"
                                        order.UpdateTs = req.body.uts
                                        order.save() 
                                        return res.status(500).send({status : 500, data : "dispute", hash : ''}) //cb.data[1].tx_id
                                    }
                                }else {
                                    order.DoStatus = "dispute"
                                    order.UpdateTs = req.body.uts
                                    order.save() 
                                    return res.status(500).send({status : 500, data : "dispute", hash : ''}) //cb.data[1].tx_id
                                }
                            }
                        }
                    })
                        //   return res.status(200).send({status : 200, data : args, hash : ''}) //cb.data[1].tx_id
                }                   
            })
    }
}
