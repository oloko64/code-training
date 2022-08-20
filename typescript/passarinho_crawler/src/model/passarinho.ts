type Header = Record<string, string>

class Passarinho {
  header: Header

  constructor () {
    // #####################################
    // Add the header below
    // #####################################
    this.header = { 'sm-token': '' }

    if (this.header['sm-token'] === '') {
      throw new Error('Missing validation "sm-token" in header.')
    }
  }

  private baseUrl (department: string): string {
    return `https://www.sitemercado.com.br/api/b2c/product/department/${department}?store_id=1139`
  }

  getHeader (): Header {
    return this.header
  }

  getAllUrls (): string[] {
    return [
      'https://www.sitemercado.com.br/api/v1/b2c/1139/product/offers',
      this.baseUrl('carnes-aves-e-peixes'),
      this.baseUrl('alimentos-basicos'),
      this.baseUrl('frios-e-laticinios'),
      this.baseUrl('limpeza'),
      this.baseUrl('feira'),
      this.baseUrl('bebidas'),
      this.baseUrl('padaria'),
      this.baseUrl('doces-e-sobremesas'),
      this.baseUrl('utensilios-para-o-lar'),
      this.baseUrl('bebidas-alcoolicas'),
      this.baseUrl('higiene-e-cuidados-pessoais'),
      this.baseUrl('biscoitos-e-salgadinhos'),
      this.baseUrl('molhos-condimentos-e-conservas'),
      this.baseUrl('leites-e-iogurtes'),
      this.baseUrl('matinais'),
      this.baseUrl('congelados'),
      this.baseUrl('pet-shop'),
      this.baseUrl('etnicos')
    ]
  }
}

export { Passarinho }
