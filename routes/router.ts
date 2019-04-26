import {Router, Request, Response} from 'express';
import Server from '../classes/server';

import { usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../classes/grafica';
import {GraficaDataBarra} from '../classes/graficabarra'
const router = Router();
const grafica = new GraficaData();
const graficabarra = new GraficaDataBarra();



/*************GRAFICA DE BARRA*** */

router.get('/graficabarra', (req:Request, res: Response) =>{
    res.json(graficabarra.getGraficaDataBarra());
});


router.post('/graficabarra', (req:Request, res: Response) =>{
    var pregunta            = req.body.pregunta;
    var valor       = Number( req.body.valor);
    graficabarra.incrementarValor(pregunta, valor);

    const server = Server.instance;
    server.io.emit('cambio-graficabarra', graficabarra.getGraficaDataBarra())

    res.json(graficabarra.getGraficaDataBarra());

});
/************GRAFICA********** */
router.get('/grafica', (req:Request, res: Response) =>{
    res.json(grafica.getDataGrafica());
});


router.post('/grafica', (req:Request, res: Response) =>{
    var mes            = req.body.mes;
    var unidades       = Number( req.body.unidades);
    grafica.incrementarValor(mes, unidades);

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica())

    res.json(grafica.getDataGrafica());

});

/************MENSAJES********** */
router.get('/mensajes', (req:Request, res: Response) =>{
    res.json({
        ok:true,
        mensaje: 'Todo esta bien!!'
    });
});


router.post('/mensajes', (req:Request, res: Response) =>{
    var cuerpo = req.body.cuerpo;
    var de     = req.body.de;
    const payload = {cuerpo,de};


    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok:true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req:Request, res: Response) =>{
    var cuerpo = req.body.cuerpo;
    var de     = req.body.de;
    const id   = req.params.id;

    const payload ={
        de,
        cuerpo
    }
    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado',payload);
    res.json({
        ok:true,
        mensaje:'post',
        cuerpo,
        de,
        id
    });
});
//Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios',(req:Request, res:Response)=>{
    const server = Server.instance;
    server.io.clients((err:any, clientes: string[])=>{
        if (err){
            res.json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            clientes
        })
    })
});
// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res:Response) =>{
    res.json({
        ok:true,
        clientes: usuariosConectados.getLista()
    })
});

export default router;