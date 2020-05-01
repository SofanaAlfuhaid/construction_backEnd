var hyperledger = require('../hyperledger/invoke')
var orderModel = require("../models/purchaseOrder")

module.exports = {
    invManagerReceipt : async (req, res) =>{   
            args = {"po":req.body.po,"invmngid":req.body.invmngid,"expdate":req.body.expdate, "gis":req.body.gis,"grept":req.body.grept,"grsts":req.body.grsts, "uts":req.body.uts}
            obj = {
                chainId : "mychannel",
                chaincodeId : "track",
                fnc : "inventoryManagerReceipt",
                args : [JSON.stringify(args)]
            }
            hyperledger.invoke(obj, (cb)=>{
                console.log("AAAAAAAAAA", cb);
                if(cb.statusCode == 500) {
                    return res.status(500).send({status : cb.statusCode, data : cb.data}) 
                }else {
                    orderModel.findOne({PONumber : req.body.po}, (err, order)=>{
                        if(order){
                            order.InvMngId = req.body.invmngid
                            order.ExpDate = req.body.expdate
                            order.StockLocation = req.body.gis
                            order.GoodReceipt = req.body.grept
                            order.GoodReceipt = req.body.grsts
                            order.UpdateTs = req.body.uts
                            order.save()
                        }
                    })
                    return res.status(200).send({status : cb.statusCode, data : args, hash : cb.data[1].tx_id})
                }      
            })
    }
}

// invManagerReceipt()
