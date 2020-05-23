var hyperledger = require("../hyperledger/invoke");
var randomstring = require("randomstring");
var orderModel = require("../models/purchaseOrder");

module.exports = {
  purchaseOrder: async (req, res) => {
    // console.log("ss", req.body);
    ponumber = randomstring.generate({
      length: 10,
      charset: "numeric",
    });
    // console.log(req.body);
    args = {
      po: ponumber,
      posts: req.body.posts,
      itemno: req.body.itemno,
      itemname: req.body.itemname,
      desc: req.body.desc,
      quan: Number(req.body.quan),
      uprice: req.body.uprice,
      addr: req.body.addr,
      delvry: req.body.delvry,
      buyerid: req.body.buyerid,
      suppid: req.body.suppid,
      cts: req.body.cts.toString(),
      uts: req.body.uts.toString(),
      amt: req.body.amt.toString(),
    };
    obj = {
        chainId : "mychannel",
        chaincodeId : "track",
        fnc : "purchaseOrder",
        args : [JSON.stringify(args)]
    }
    hyperledger.invoke(obj, (cb)=>{
    console.log("AAAAAAAAAA", cb, cb.data[1].tx_id);
    if(cb.statusCode == 500) {
        return res.status(500).send({status : cb.statusCode, data : cb.data})
    }else {
        orderModel.findOne({PONumber : ponumber}, (err, order)=>{
          if(!order){
                var order = new orderModel()
                if (req.body.itemname == "Cement") {
                    order.Standard.push(100)
                }else {
                  order.Standard.push(3,2,1,10)
                }
                order.PONumber = ponumber
                order.PoStatus = req.body.posts
                order.ItemNumber = req.body.itemno
                order.itemName = req.body.itemname
                order.Description = req.body.desc
                order.Quantity = req.body.quan
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
    return res.status(200).send({ status: 200, data: args, hash: "" }); //cb.data[1].tx_id,cb.statusCode
        }
    })
  },
};
// purchaseOrder()
