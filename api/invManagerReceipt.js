var hyperledger = require('../hyperledger/invoke')
var orderModel = require("../models/purchaseOrder")
var randomstring = require('randomstring');

module.exports = {
    invManagerReceipt : async (req, res) =>{ 
        number = randomstring.generate({
            length: 5,
            charset: 'numeric'
          });
        var grept = "GR" + number  
            args = {"po":req.body.po,"invmngid":req.body.invmngid,"expdate":req.body.expdate, "gis":req.body.gis,"grept":grept,"grsts":req.body.grsts, "uts":req.body.uts}
            // obj = {
            //     chainId : "mychannel",
            //     chaincodeId : "track",
            //     fnc : "inventoryManagerReceipt",
            //     args : [JSON.stringify(args)]
            // }
            // hyperledger.invoke(obj, (cb)=>{
            //     console.log("AAAAAAAAAA", cb);
            //     if(cb.statusCode == 500) {
            //         return res.status(500).send({status : cb.statusCode, data : cb.data}) 
            //     }else {
            //         orderModel.findOne({PONumber : req.body.po}, (err, order)=>{
            //             if(order){
            //                 order.InvMngId = req.body.invmngid
            //                 order.ExpDate = req.body.expdate
            //                 order.StockLocation = req.body.gis
            //                 order.GoodReceipt = grept
            //                 order.GRStatus = req.body.grsts
            //                 order.UpdateTs = req.body.uts
            //                 order.save()
            //             }
            //         })
                    return res.status(200).send({status : 200, data : args, hash : ''}) //cb.data[1].tx_id
            //     }      
            // })
    }
}

// invManagerReceipt()
