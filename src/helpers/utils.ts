const fs = require('fs')

export function isAPositiveWholeNumber(numString: string) {
    const regex = /^[1-9][0-9]*$/
    return numString.match(regex)
}

export const saveToDisk = (db: string, data: any) => {
    fs.writeFileSync(`./src/db/${db}.json`, JSON.stringify(data), 'utf-8')
  }
