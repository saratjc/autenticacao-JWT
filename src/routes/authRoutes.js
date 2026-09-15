const express = require('express') //cria rotas
const bcrypt = require('bcryptjs') //criptografia de senha
const jwt = require('jsonwebtoken') //criptografia de token
const crypto = require('crypto') //token aleatório

const express = require('express')

const userRepository = require('../repositories/userRepository')

//agrupar as rotas de autenticação
const router = express.Router()

