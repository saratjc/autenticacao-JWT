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
//fução p gravar usuários no arquivo
async function writeUsers(users) {
    //garante q o diretorio exista e se n, cria ele
    await fs.mkdir(path.dirname(FILE), { recursive: true })
    await fs.writeFile(FILE, JSON.stringify(users, null, 2))
}

module.exports = {
    readUsers,
    writeUsers
}