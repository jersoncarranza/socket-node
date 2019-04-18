import {Router, Request, Response} from 'express';
const router = Router();


router.get('/mensajes', (req:Request, res: Response) =>{
    res.json({
        ok:true,
        mensaje: 'Todo esta bien!!'
    });
});


router.post('/mensajes', (req:Request, res: Response) =>{
    var cuerpo = req.body.cuerpo;
    var de     = req.body.de;
    res.json({
        ok:true,
        mensaje:'post',cuerpo,de
    });
});

router.post('/mensajes/:id', (req:Request, res: Response) =>{
    var cuerpo = req.body.cuerpo;
    var de     = req.body.de;
    var id     = req.params.id;
    res.json({
        ok:true,
        mensaje:'post',
        cuerpo,
        de,
        id
    });
});

export default router;