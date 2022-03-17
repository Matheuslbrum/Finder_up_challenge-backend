const knex = require('../db');

module.exports = {
  async consultMaterials(req, res, next) {
    try {
      const { name: nameQuery, user: userQuery } = req.query;

      if (!nameQuery && !userQuery) {
        return res.status(400).send({ error: 'Você não pesquisou nada, idiota' });
      }

      if (nameQuery) {
        const materials = await knex('raw_materials').whereILike('name', `%${nameQuery}%`);

        const materialsExist = await knex('raw_materials').whereILike('name', `%${nameQuery}%`).first();

        if (!materialsExist) {
          return res.status(400).send({ error: 'Não têm objeto com esse nome' });
        }

        const materialsArray = Object.keys(materials)
          .map((key) => materials[key]);

        return res.json(materialsArray);
      }
      if (userQuery) {
        const updatedMaterials = await knex('raw_materials_expense').whereILike('user_updater', `%${userQuery}%`);

        const updatedMaterialsExist = await knex('raw_materials_expense').whereILike('user_updater', `%${userQuery}%`).first();

        if (!updatedMaterialsExist) {
          return res.status(400).send({ error: 'Não têm usuário com esse nome' });
        }

        const updatedMaterialArray = Object.keys(updatedMaterials)
          .map((key) => updatedMaterials[key]);

        return res.json(updatedMaterialArray);
      }
    } catch (error) {
      return next(error);
    }
  },
  async insertMaterial(req, res, next) {
    try {
      const { name, quantity, user } = req.body;

      if (name && quantity && user) {
        await knex('raw_materials').insert({
          name,
          quantity,
          user,
        });

        return res.status(201).send();
      }
      return res.status(400).send({ error: 'Tá faltando alguma coisa' });
    } catch (error) {
      return next(error);
    }
  },
  async removeMaterial(req, res, next) {
    try {
      const { id } = req.params;

      const { quantity, user } = req.body;

      console.log(id, quantity, user);

      const quantityValue = await knex('raw_materials').select('quantity').where({ id });
      const [{ current_withdrawn: currentWithdrawn }] = await knex('raw_materials').select('current_withdrawn').where({ id });

      if (quantityValue === 0) {
        return res.status(204).send({ error: 'Não tem mais desse material no estoque' });
      }

      if (quantity < 0) {
        return res.status(204).send({ error: 'Você não pode adicionar item' });
      }

      await knex('raw_materials')
        .where('id', id)
        .where('quantity', '>', '0')
        .update({
          quantity: knex.raw(`?? - ${quantity}`, ['quantity']),
          updater: user,
          current_withdrawn: quantity,
          somed_withdrawn: quantity + currentWithdrawn,
        });

      await knex('raw_materials')
        .where('id', id)
        .where('quantity', '<', '0')
        .update({ quantity: 0 });

      return res.status(201).send();
    } catch (error) {
      return next(error);
    }
  },
};
