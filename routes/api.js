var express = require('express');
var router = express.Router();
var consumptionApproval = require('../api/consumptionApproval');
var consumptionApprovalForPouring = require('../api/consumptionApprovalForPouring')
var createOrderBySupplier = require('../api/createOrderBySupplier')
var displayOrderStatus = require('../api/displayOrderStatus');
var foremenConsumtion = require('../api/foremenConsumption')
var inventoryApproval = require('../api/inventoryApproval');
var invManagerReceipt = require('../api/invManagerReceipt');
var logisticApproval = require('../api/logisticApproval');
var purchaseOrder = require('../api/purchaseOrder');
var recOrderbySupplier = require('../api/recOrderbySupplier');
var stockRelease = require('../api/stockRelease');
var getOrder = require('../api/getOrder')


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/purchaseOrder',purchaseOrder.purchaseOrder)
router.post('/recOrderbySupplier',recOrderbySupplier.recOrderBySupplier)
router.post('/createOrderBySupplier', createOrderBySupplier.createOrderBySupplier)
router.post('/logisticApproval', logisticApproval.logisticApproval)
router.post('/invManagerReceipt', invManagerReceipt.invManagerReceipt)
router.post('/inventoryApproval', inventoryApproval.inventoryApproval)
router.post('/foremenConsumtion',foremenConsumtion.foremenConsumption)
router.post('/stockRelease', stockRelease.stockRelease)
router.post('/consumptionApproval',consumptionApproval.consumptionApproval)
router.post('/displayOrderStatus', displayOrderStatus.displayOrderStatus)
router.post('/consumptionApprovalForPouring',consumptionApprovalForPouring.consumptionApprovalForPouring)
router.get('/alldata',getOrder.getOrders)


module.exports = router;
