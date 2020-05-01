var orderModel = require("../models/purchaseOrder")

module.exports = {
    getOrders : async (req, res) =>{   
        orderModel.find().then(orders =>{
            if(orders){
                res.status(200).send({status : 200, data : orders})
            }
        }).catch(err =>{
            res.status(500).send({status:500, data : "please try again"})
        })
    }
}

