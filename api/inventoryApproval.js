var hyperledger = require('../hyperledger/invoke')
var orderModel = require("../models/purchaseOrder")

module.exports = {
    inventoryApproval : async (req, res) =>{   
    
        args = {"po":req.body.po,"dosts":req.body.dosts,"posts":req.body.posts, "grsts":req.body.grsts, "uts":req.body.uts, "stanbathweght" : req.body.stanbathweght, "innerdia" :req.body.innerdia, "outerdia" : req.body.outerdia, "walldwidth": req.body.wallwidth}
        // obj = {
        //     chainId : "mychannel",
        //     chaincodeId : "track",
        //     fnc : "inventoryApproval",
        //     args : [JSON.stringify(args)]
        // }
        // hyperledger.invoke(obj, (cb)=>{
        //     console.log("AAAAAAAAAA", cb);  
        //     if(cb.statusCode == 500) {
        //         return res.status(500).send({status : cb.statusCode, data : cb.data}) 
        //     }else {
                orderModel.findOne({PONumber : req.body.po}, (err, order)=>{
                    if(order){
                        if (order.itemName == "Cement") {
                            if (order.Standard[0] * order.Quantity == req.body.stanbathweght) {
                                order.DoStatus = req.body.dosts
                                order.PoStatus = req.body.posts
                                order.GRStatus = req.body.grsts
                                order.UpdateTs = req.body.uts
                                order.Innerdia = req.body.innerdia
                                order.Outerdia = req.body.outerdia
                                order.Wallwidth = req.body.wallwidth
                                order.StadBatchWeght = req.body.stanbathweght
                                order.save()
                                return res.status(200).send({status : 200, data : "received", hash : ''}) //cb.data[1].tx_id
                            }else {
                                order.DoStatus = req.body.dosts
                                order.PoStatus = req.body.posts
                                order.GRStatus = "backorder"
                                order.UpdateTs = req.body.uts
                                order.Innerdia = req.body.innerdia
                                order.Outerdia = req.body.outerdia
                                order.Wallwidth = req.body.wallwidth
                                order.StadBatchWeght = req.body.stanbathweght
                                order.save()
                                return res.status(500).send({status : 500, data : "backorder", hash : ''}) //cb.data[1].tx_id
                            }
                        }else {
                            if (order.Standard[3] * order.Quantity == req.body.stanbathweght) {
                                if (order.Standard[0] == req.body.innerdia && order.Standard[1] == req.body.outerdia && order.Standard[2] == req.body.wallwidth) {

                                    order.DoStatus = req.body.dosts
                                    order.PoStatus = req.body.posts
                                    order.GRStatus = req.body.grsts
                                    order.UpdateTs = req.body.uts
                                    order.Innerdia = req.body.innerdia
                                    order.Outerdia = req.body.outerdia
                                    order.Wallwidth = req.body.wallwidth
                                    order.StadBatchWeght = req.body.stanbathweght
                                    order.save()
                                    return res.status(200).send({status : 200, data : "received", hash : ''}) //cb.data[1].tx_id
                                }else {
                                    order.DoStatus = req.body.dosts
                                    order.PoStatus = req.body.posts
                                    order.GRStatus = "backorder"
                                    order.UpdateTs = req.body.uts
                                    order.Innerdia = req.body.innerdia
                                    order.Outerdia = req.body.outerdia
                                    order.Wallwidth = req.body.wallwidth
                                    order.StadBatchWeght = req.body.stanbathweght
                                    order.save() 
                                    return res.status(500).send({status : 500, data : "backorder", hash : ''}) //cb.data[1].tx_id
                                }
                            }else {
                                order.DoStatus = req.body.dosts
                                order.PoStatus = req.body.posts
                                order.GRStatus = "backorder"
                                order.UpdateTs = req.body.uts
                                order.Innerdia = req.body.innerdia
                                order.Outerdia = req.body.outerdia
                                order.Wallwidth = req.body.wallwidth
                                order.StadBatchWeght = req.body.stanbathweght
                                order.save() 
                                return res.status(500).send({status : 500, data : "backorder", hash : ''}) //cb.data[1].tx_id
                            }
                        }
                    }
                })
                //return res.status(200).send({status : 200, data : args, hash : ''}) //cb.data[1].tx_id
        //     }   
        // })
    }
}

