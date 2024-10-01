// // const express = require('express');
// // const router = express.Router();
// // const vendorController = require('../controllers/vendorControllers');

// // router.post('/', vendorController.createVendor);
// // router.get('/', vendorController.getVendors);
// // router.get('/:id', vendorController.getVendor);
// // router.put('/:id', vendorController.updateVendor);
// // router.delete('/:id', vendorController.deleteVendor);

// // module.exports = router;







// // routes/vendors.js
// const express = require('express');
// const router = express.Router();
// const vendorController = require('../controllers/vendorcontrollers');

// router.post('/', vendorController.createVendor);
// router.get('/', vendorController.getVendors);
// router.get('/:id', vendorController.getVendor);
// router.put('/:id', vendorController.updateVendor);
// router.delete('/:id', vendorController.deleteVendor);

// module.exports = router;





const express = require('express');
const router = express.Router();
// const vendorController = require('../controllers/vendorControllers');
const vendorController = require('../controllers/vendorcontrollers');

router.post('/', vendorController.createVendor);
router.get('/', vendorController.getVendors);
router.get('/deleted', vendorController.getDeletedVendors);
router.get('/:id', vendorController.getVendor);
router.put('/:id', vendorController.updateVendor);
router.delete('/:id', vendorController.deleteVendor);
router.put('/:id/restore', vendorController.restoreVendor);

module.exports = router;