const knex = require('../db');

module.exports = {
  async insertUser(req, res, next) {
    try {
      const { username, profession, email } = req.body;

      const emailExist = await knex('users').where('email', `${email}`).first();

      if (emailExist) {
        return res.status(400).send({ error: 'Email já existe' });
      }

      if (profession && username && email) {
        await knex('users').insert({
          email,
          profession,
          username,
        });

        return res.status(201).send('User registrado');
      }
      return res.status(400).send({ error: 'Tá faltando alguma coisa' });
    } catch (error) {
      return next(error);
    }
  },
  async autenticate(req, res, next) {
    try {
      const { username, profession, email } = req.body;

      const user = await knex('users').where('email', `${email}`).first();
      const currentProfession = await knex('users').where('email', `${email}`).where('profession', `${profession}`).first();
      const currentUsername = await knex('users').where('email', `${email}`).where('username', `${username}`).first();

      if (!user) {
        return res.status(400).send({ error: 'Não tem usuário com esse email' });
      }
      if (!currentProfession) {
        return res.status(400).send({ error: 'Essa não é sua profissão' });
      }
      if (!currentUsername) {
        return res.status(400).send({ error: 'Esse username não corresponde com seu email' });
      }

      return res.send({
        email,
        profession,
        username,
        status: 'Você está logado',
      });
    } catch (error) {
      return next(error);
    }
  },
};
