"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });
});
router.post('/mensajes', (req, res) => {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    res.json({
        ok: true,
        mensaje: 'post', cuerpo, de
    });
});
router.post('/mensajes/:id', (req, res) => {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    var id = req.params.id;
    res.json({
        ok: true,
        mensaje: 'post',
        cuerpo,
        de,
        id
    });
});
exports.default = router;
