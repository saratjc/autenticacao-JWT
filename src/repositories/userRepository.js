import fs from 'fs/promises';
import path from 'path';

//define o caminho do arquivo json
const FILE = path.join(__dirname, '../data/users.json');

//função pra ler os usuários do arquivo
async function readUsers() {
    try {
        const data = await fs.readFile(FILE, 'utf-8');
        return JSON.parse(data);
    }   catch {
        return [];
    }
}

//função pra gravar os usuários no arquivo
async function writeUsers(users) {
    await fs.mkdir(path.dirname(FILE), { recursive: true});
    await fs.writeFile(FILE, JSON.stringify(users, null, 2));
}