const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const orderSchema = new mongoose.Schema({
	ObjType       : {type : String},
	PONumber      : {type : String},
	ItemNumber    : {type : String},
    itemName      : {type : String},
	Description   : {type : String},
	Quantity      : {type: Number,default:null},
	UnitPrice     : {type : String},
	Amount        : {type : String},
	State         : {type : String},
	ShipTo        : {type : String},            //"addr" // buyer location
	DeliveryDue   : {type : String},                  //"delvry"  //at what time buyer want the delivery
	BuyerID       : {type : String},
	SupplierID    : {type : String},	
	Creator       : {type : String},
	UpdateBy	  : {type : String},
	CreateTs      : {type : String},
	UpdateTs      : {type : String}, 
	PoStatus      : {type : String},        //create 	, Inprogress, reject, Instock
	Ownership     : {type : String},
	CarrierId     : {type : String},   // shipment company id  who is responsible for driveing the truck
	ShipmentId    : {type : String},  //delivery order number
	Truckno       : {type : String},
	RegulatorId   : {type : String},
	DoStatus      : {type : String},   //pending ,expecting confirmation from regulator, shipped, inDispute, arrived,
	GTIN          : {type : String} ,
	InvMngId      : {type : String},
	ExpDate       : {type : String},
	StockLocation : {type : String}, // zone1
	GoodReceipt   : {type : String},
	GRStatus      : {type : String},
	DoNumber      : {type : String},
	Innerdia      : {type : Number, default : null},
	Outerdia      : {type : Number, default : null},
	Wallwidth     : {type : Number, default : null},
	StadBatchWeght: {type : Number, default : null}, 
	Standard      : {type :Array}, 
    ForemenUpdate : [{"foreid": String,"purps": String,"fdec": String, "ccorder": String,"conum": String,"pquanty":Number, "futs":String, "batchid" : String, "bweght" : String, "density" : String}]
});
var order = mongoose.model('order', orderSchema);
module.exports = order;



