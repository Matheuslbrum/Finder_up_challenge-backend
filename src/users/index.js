const knex = require('../db');

module.exports = {
  async consultMaterials(req, res, next) {
    try {
      const { name: nameQuery, user: userQuery } = req.query;

      if (!nameQuery && !userQuery) {
        return res.status(400).json({ error: 'Você não pesquisou nada, idiota' });
      }

      if (nameQuery) {
        const materials = await knex('raw_materials').whereILike('name', `%${nameQuery}%`);

        const materialsExist = await knex('raw_materials').whereILike('name', `%${nameQuery}%`).first();

        if (!materialsExist) {
          return res.status(400).json({ error: 'Não têm objeto com esse nome' });
        }

        return res.json({ materials });
      }
      if (userQuery) {
        const updatedMaterials = await knex('raw_materials_expense').whereILike('user', `%${userQuery}%`);

        const updatedMaterialsExist = await knex('raw_materials_expense').whereILike('user', `%${userQuery}%`).first();

        if (!updatedMaterialsExist) {
          return res.status(400).json({ error: 'Não têm usuário com esse nome' });
        }

        return res.json({ updatedMaterials });
      }
    } catch (error) {
      return next(error);
    }
  },
  async insert(req, res, next) {
    try {
      const { name, quantity, user } = req.body;

      await knex('raw_materials').insert({
        name,
        quantity,
        user,
      });

      return res.status(201).send();
    } catch (error) {
      return next(error);
    }
  },
  async remove(req, res, next) {
    try {
      const { id } = req.params;

      const { quantity, user } = req.body;

      const quantityValue = await knex('raw_materials').select('quantity').where({ id });

      if (quantityValue === 0) {
        return res.status(204).json({ error: 'Não tem mais desse material no estoque' });
      }

      await knex('raw_materials')
        .where('id', id)
        .where('quantity', '>', '0')
        .update({ quantity: knex.raw(`?? - ${quantity}`, ['quantity']) });

      return res.status(201).send();
    } catch (error) {
      return next(error);
    }
  },
};
