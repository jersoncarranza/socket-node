"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const socket_1 = require("../sockets/socket");
const grafica_1 = require("../classes/grafica");
const graficabarra_1 = require("../classes/graficabarra");
const router = express_1.Router();
const grafica = new grafica_1.GraficaData();
const graficabarra = new graficabarra_1.GraficaDataBarra();
/*************GRAFICA DE BARRA*** */
router.get('/graficabarra', (req, res) => {
    res.json(graficabarra.getGraficaDataBarra());
});
router.post('/graficabarra', (req, res) => {
    var pregunta = req.body.pregunta;
    var valor = Number(req.body.valor);
    graficabarra.incrementarValor(pregunta, valor);
    const server = server_1.default.instance;
    server.io.emit('cambio-graficabarra', graficabarra.getGraficaDataBarra());
    res.json(graficabarra.getGraficaDataBarra());
});
/************GRAFICA********** */
router.get('/grafica', (req, res) => {
    res.json(grafica.getDataGrafica());
});
router.post('/grafica', (req, res) => {
    var mes = req.body.mes;
    var unidades = Number(req.body.unidades);
    grafica.incrementarValor(mes, unidades);
    const server = server_1.default.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica());
    res.json(grafica.getDataGrafica());
});
/************MENSAJES********** */
router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!!'
    });
});
router.post('/mensajes', (req, res) => {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    const payload = { cuerpo, de };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
router.post('/mensajes/:id', (req, res) => {
    var cuerpo = req.body.cuerpo;
    var de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        mensaje: 'post',
        cuerpo,
        de,
        id
    });
});
//Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    server.io.clients((err, clientes) => {
        if (err) {
            res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            clientes
        });
    });
});
// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: socket_1.usuariosConectados.getLista()
    });
});
exports.default = router;
