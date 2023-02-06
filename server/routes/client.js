const Joi = require('joi');
const knl = require('../knl');

knl.post('client', async(req, resp) => {
    const schema = Joi.object({
        name : Joi.string().min(1).max(100).required(),
        cnpj : Joi.string().min(1).max(14).required(),
        socialReason : Joi.string().min(1).max(100).required(),
        address: Joi.array().items(Joi.object({
            rua : Joi.string().min(3).max(100),
            bairro : Joi.string().min(2).max(30),
            cidade : Joi.string().min(3).max(60),
            estado : Joi.string().min(2).max(20),
            cep : Joi.string().min(9).max(9),
            num : Joi.number().min(1),
            complemento : Joi.string().min(3).max(100),
            pontoRef : Joi.string().min(3).max(100),
        }))
    })
    knl.validate(req.body, schema);

    const result = await knl.sequelize().models.Clients.findAll({
        where:{
            name: req.body.name,
            cnpj: req.body.cnpj,
            socialReason : req.body.socialReason
        }
    });

    knl.createException('0006', '', !knl.objects.isEmptyArray(result));

    const client = knl.sequelize().models.Clients.build({
        name : req.body.name,
        cnpj : req.body.cnpj,
        socialReason : req.body.socialReason,
        status : 1
    });
    await client.save();
    console.log(client.id);

    for (const address of req.body.address){
        const result2 = knl.sequelize().models.Address.build({
            rua : address.rua,
            bairro : address.bairro,
            cidade : address.cidade,
            estado : address.estado,
            cep : address.cep,
            num : address.num,
            complemento : address.complemento,
            pontoDeRef: address.pontoDeRef,
            fkClient : client.id,
            status:1
        })
        await result2.save(); 
    }
    resp.end();
});

knl.get('client', async(req, resp) => {
    const result = await knl.sequelize().models.Client.findAll({
        where : {
            status: 1
        }
    });
    resp.json(result);
    resp.end();
});

knl.get('client/:id', async(req, resp) => {
    const result = await knl.sequelize().models.Client.findAll({
        where : {
            id : req.params.id
        }
    });
    resp.json(result);
    resp.end();
});

knl.put('client/', async(req, resp) => {
    const result = await knl.sequelize().models.Client.update({
        where : {
            id: req.body.id
        }
    });
    resp.send(result);
    resp.end();
})

knl.patch('client/:id', async(req, resp) => {
    const result = await knl.sequelize().models.Client.update({
        status : 0
    },{
        where : {
            id: req.params.id,
        },
    });
    resp.json(result)
    resp.end();
})