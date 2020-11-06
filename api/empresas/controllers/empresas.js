'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    my: async(ctx) => {
        //autenticacion del usuario
        const user = ctx.state.user


        let empresas = await strapi.services.empresas.find({
            user: user.id
        })
        ctx.send(empresas)
        return empresas

    },
    async create(ctx) {

        let entity;
        const user = ctx.state.user;

        if (ctx.is('multipart')) {
            const { dataemp, files } = parseMultipartData(ctx);
            dataemp.user = user.id 
            entity = await strapi.services.empresas.create(dataemp, { files })
        } else {
            //Formato json
            const dataemp = ctx.request.body

           dataemp.user = user.id; 
            entity = await strapi.services.empresas.create(dataemp);

        }

        //parcea la info luego la arma 
        return sanitizeEntity(entity, { model: strapi.models.empresas });
    },
};