const express = require('express');
const nodeController = require('../controllers/nodeController');
const router = express.Router();

router.get('/', nodeController.getAllNodes);
router.get('/:id', nodeController.getNodeById);
router.post('/', nodeController.createNode);
router.put('/:id', nodeController.updateNode);
router.delete('/:id', nodeController.deleteNode);

module.exports = router;
