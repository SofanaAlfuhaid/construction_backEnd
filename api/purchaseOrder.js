var hyperledger = require('../hyperledger/invoke');
var randomstring 	= require("randomstring");
var orderModel = require("../models/purchaseOrder")

module.exports = { 
    purchaseOrder : async (req, res) =>{   
    ponumber = randomstring.generate({
        length: 10,
        charset: 'numeric'
      });
      console.log(req.body)
    args = {"po":ponumber,"posts":req.body.posts,"itemno":req.body.itemno,"itemname":req.body.itemname,"desc":req.body.desc,"quan":req.body.quan,"uprice":req.body.uprice,"state":req.body.state,"addr":req.body.addr,"delvry":req.body.delvry,"buyerid":req.body.buyerid,"suppid":req.body.suppid,"cts":req.body.cts,"uts":req.body.uts,"amt":req.body.amt}
    obj = {
        chainId : "mychannel",
        chaincodeId : "track",
        fnc : "purchaseOrder",
        args : [JSON.stringify(args)]
    }
    hyperledger.invoke(obj, (cb)=>{
        // console.log("AAAAAAAAAA", cb, cb.data[1].tx_id);
        if(cb.statusCode == 500) {
            return res.status(500).send({status : cb.statusCode, data : cb.data}) 
        }else {
            orderModel.findOne({PONumber : ponumber}, (err, order)=>{
                if(!order){
                    var order = new orderModel()
                    order.PONumber = ponumber
                    order.PoStatus = req.body.posts
                    order.ItemNumber = req.body.itemno
                    order.itemName = req.body.itemname
                    order.Description = req.body.desc
                    order.Qunatity = req.body.quan
                    order.UnitPrice = req.body.uprice
                    order.Amount = req.body.amt
                    order.State = req.body.state
                    order.ShipTo = req.body.addr
                    order.DeliveryDue = req.body.delvry
                    order.BuyerID = req.body.buyerid
                    order.SupplierID = req.body.suppid
                    order.CreateTs = req.body.cts
                    order.UpdateTs = req.body.uts
                    order.save()
                }
            })
            return res.status(200).send({status : cb.statusCode, data : args, hash : cb.data[1].tx_id})
        }
    })
}

}
// purchaseOrder()
