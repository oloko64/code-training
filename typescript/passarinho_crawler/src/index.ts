/* eslint-disable no-extra-boolean-cast */
import fetch from 'node-fetch'
import fs from 'node:fs'
import _ from 'lodash'
import { Passarinho } from './model/passarinho.js'

interface Product {
  name: string
  price: number
  weight: string
  quantityStock: number
  discount: number
  originalPrice: number
}

async function fetchUrl (url: string): Promise<unknown> {
  const response = await fetch(url, { headers: passarinho.getSmToken() })
  const json = await response.json()
  return json
}

async function fetchAllUrls (): Promise<unknown[]> {
  const urls = passarinho.getAllUrls()
  const promises = urls.map(fetchUrl)
  const results = await Promise.all(promises)
  return results
}

function processData (data: any): Product[] {
  let allProducts = []
  for (let department of data) {
    if (department?.products !== undefined) {
      department = department.products
    }
    allProducts.push(department.map((product: any) => {
      return {
        name: product.excerpt,
        price: product.prices[0].price.toFixed(2),
        weight: product.weight,
        quantityStock: product.quantityStock,
        discount: Boolean(product?.discount) ? product.discount.value.toFixed(2) : '-',
        originalPrice: Boolean(product?.discount) ? product.price_old.toFixed(2) : '-'
      }
    }))
    allProducts = _.flatten(allProducts)
  }
  return allProducts
}

function verifyFolderExists (folder: string): void {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder)
  }
}

function writeDataCsv (data: any): void {
  const date = new Date()
  const folder = './output_data_folder'
  verifyFolderExists(folder)
  const file = `${folder}/passarinho_products_${date.toLocaleString('pt-BR').replaceAll('/', '-')}.csv`
  let fileData = ''
  fs.openSync(file, 'w+')
  fs.writeFileSync(file, 'Produto,Preço (R$),Peso,Quantidade Disponivel,Desconto (R$),Preço Original (R$)\n')
  for (const product of data) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    fileData += `${product.name.replaceAll(',', '.')},${product.price},${product.weight.replaceAll(',', '.')},${product.quantityStock},${product.discount},${product.originalPrice}\n`
  }
  fs.appendFileSync(file, fileData)
}

const passarinho = new Passarinho()
const data = processData(await fetchAllUrls())
writeDataCsv(data)
