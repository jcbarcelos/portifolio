var express = require('express')
var router = express.Router()
var controller = require('../controller/controller')

router.get("/api/", async function (req, res) {
  return await controller.list(req, res)
});
router.post("/api/page", async function (req, res) {
  return await controller.page(req, res)
});
router.get("/api/:id", async function (req, res) {
  return await controller.listaId(req, res)
});
router.post("/api/", async function (req, res) {
  return await controller.insert(req, res);
});
router.patch("/api/:id", async function (req, res) {
  return await controller.update(req, res);
});
router.delete("/api/:id", async function (req, res) {
  return await controller.delete(req, res);
});

module.exports = router