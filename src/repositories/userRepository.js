const fs = require('fs/promises')
const path = require('path')

const FILE = path.join(__dirname, '../../data/users.json')

//função p ler usuários do arquivo
async function readUsers() {
    try {
        //lê o arquivo e converte em objeto
        const data = await fs.readFile(FILE, 'utf-8')
        return JSON.parse(data)
    } catch {
        return []
    }
}
//função p gravar usuários no arquivo
async function writeUsers(users) {
    //garante q o diretorio exista e se n, cria ele
    await fs.mkdir(path.dirname(FILE), { recursive: true })
    await fs.writeFile(FILE, JSON.stringify(users, null, 2))
}

//função p buscar usuário por email
async function findByEmail(email) {
    const users = await readUsers()

    //retorna o primeiro usuário que o email seja igual
    return users.find(user => user.email === email)
}

//função p buscar usuário por ID
async function findById(id) {
    const users = await readUsers()

    //retorna o primeiro usuário que o id seja igual
    return users.find(user => user.id === id)
}

//função p cadastrar usuário
async function createUser(user) {
    const users = await readUsers()

    //adiciona um novo user no array
    users.push(user)

    await writeUsers(users)

    //retorna o usuário cadastrado
    return user
}

module.exports = {
    readUsers,
    writeUsers,
    findByEmail,
    findById,
    createUser
}