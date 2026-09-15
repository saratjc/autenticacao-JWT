const express = require('express'); //cria rotas
const crypto = require('crypto'); //criptografia padrao do node
const bcrypt = require('bcryptjs'); //criptografia
const userRepository = require('./userRepository'); 

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Valida se todos os campos obrigatórios foram enviados
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Os campos name, email e password são obrigatórios.' });
    }

    // 2. Lê os usuários atuais e verifica se o e-mail já está cadastrado
    const users = await userRepository.readUsers();
    const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (emailExists) {
      return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
    }

    // 3. Faz o hash da senha usando bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Cria o novo objeto do usuário seguindo o seu padrão
    const newUser = {
      id: crypto.randomUUID(), // Gera o UUID v4 automaticamente
      name,
      email,
      password: hashedPassword,
      role: 'user' // Define o cargo padrão solicitado
    };

    // 5. Adiciona a lista e grava no arquivo JSON
    users.push(newUser);
    await userRepository.writeUsers(users);

    // 6. Remove a senha do objeto de retorno para segurança
    const { password: _, ...userResponse } = newUser;

    // 7. Retorna os dados com status 201 (Created)
    return res.status(201).json(userResponse);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

module.exports = router;
