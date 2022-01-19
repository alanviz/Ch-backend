const fs = require('fs');

class Contenedor {

    constructor (nombreArchivo) {
        this.directorio = `./${nombreArchivo}.txt`
    }

    async save (obj) {
        try {
            if(fs.existsSync(this.directorio)){
                const fileRead = await fs.promises.readFile(this.directorio)
                const fileData = JSON.parse(fileRead);
                let ultimoId = fileData[fileData.length-1].id || 0
                const newData = [ ...fileData, { ...obj, id: ultimoId+1 }  ]
                await fs.promises.writeFile(this.directorio, JSON.stringify(newData, null, 2))
                return ultimoId+1
            } else {
                await fs.promises.writeFile(this.directorio, JSON.stringify([{ ...obj, id: 1 }], null, 2))
                return 1
            }
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async getById (id) {
        try {
            const fileRead = await fs.promises.readFile(this.directorio)
            const fileData = JSON.parse(fileRead);
            const item = fileData.find(elemento => elemento.id === id)
            if (item) return item
            return null
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async getAll() {
        try {
            const fileRead = await fs.promises.readFile(this.directorio)
            const fileData = JSON.parse(fileRead);
            return [ ...fileData ]
        } catch (err) {
            if(err.code === 'ENOENT') return 'Archivo no encontrado'
            console.log(err)
            return null
        }
    }

    async deleteById(id) {
        try {
            const fileRead = await fs.promises.readFile(this.directorio)
            const fileData = JSON.parse(fileRead);
            const newData = fileData.filter(elemento => elemento.id != id)
            await fs.promises.writeFile(this.directorio, JSON.stringify(newData, null, 2))
        } catch (err) {
            console.log(err)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.directorio, JSON.stringify([]))
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = Contenedor