const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const allowRoles = require('../middleware/roleCheck');
const { statsController, featuresController, roadmapController } = require('../controllers/homeAdminController');

router.use(verifyToken, allowRoles('admin'));

router.get('/stats', statsController.list);
router.get('/stats/:id', statsController.getOne);
router.post('/stats', statsController.add);
router.put('/stats/:id', statsController.edit);
router.delete('/stats/:id', statsController.remove);

router.get('/features', featuresController.list);
router.get('/features/:id', featuresController.getOne);
router.post('/features', featuresController.add);
router.put('/features/:id', featuresController.edit);
router.delete('/features/:id', featuresController.remove);

router.get('/roadmap', roadmapController.list);
router.get('/roadmap/:id', roadmapController.getOne);
router.post('/roadmap', roadmapController.add);
router.put('/roadmap/:id', roadmapController.edit);
router.delete('/roadmap/:id', roadmapController.remove);

module.exports = router;