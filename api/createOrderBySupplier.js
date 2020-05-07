var hyperledger = require('../hyperledger/invoke')
var orderModel = require("../models/purchaseOrder")
var randomstring 	= require("randomstring")

module.exports = {
    
    createOrderBySupplier :  async (req, res) =>{
        number = randomstring.generate({
            length: 5,
            charset: 'numeric'
          });
        var donumber = "DO" + number
        args = {"po":req.body.po,"cid":req.body.cid,"shid":req.body.shid,"donumber" : donumber,"trno":req.body.trno,"regid":req.body.regid,"dosts":req.body.dosts,"gtin":req.body.gtin,"uts":req.body.uts}
        // obj = {
        //     chainId : "mychannel",
        //     chaincodeId : "track",
        //     fnc : "createOrderBySupplier",
        //     args : [JSON.stringify(args)]
        // }
        // hyperledger.invoke(obj, (cb)=>{
        //     console.log("AAAAAAAAAA", cb); 
        //     if(cb.statusCode == 500) {
        //         return res.status(500).send({status : cb.statusCode, data : cb.data}) 
        //     }else {
                orderModel.findOne({PONumber : req.body.po}, (err, order)=>{
                    if(order){
                        order.CarrierId = req.body.cid
                        order.ShipmentId = req.body.shid
                        order.Truckno = req.body.trno
                        order.RegulatorId = req.body.regid
                        order.DoStatus = req.body.dosts
                        order.GTIN = req.body.gtin
                        order.UpdateTs = req.body.uts
                        order.save()
                    }
                })
                return res.status(200).send({status : 200, data : args, hash : ''}) //cb.data[1].tx_id
        //     }  
        // })
    }
}

// createOrderBySupplier()
