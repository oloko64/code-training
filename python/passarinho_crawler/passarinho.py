class ProductUrls:
    """
    To get the 'sm-token' token, you need to login in the site and get the token from the header. You just need this token to make requests to the API.
    It has some location information and the id of the store. So don't make it public.
    """

    def __init__(self):
        self.token = {
            'sm-token': ''}

        if self.token['sm-token'] == '':
            raise Exception('You need to set the token in the class')

    @staticmethod
    def __url(department):
        return f'https://www.sitemercado.com.br/api/b2c/product/department/{department}?store_id=1139'

    def get_sm_token(self):
        return self.token

    def get_all_urls(self):
        return [
            'https://www.sitemercado.com.br/api/v1/b2c/1139/product/offers',
            self.__url('carnes-aves-e-peixes'),
            self.__url('alimentos-basicos'),
            self.__url('frios-e-laticinios'),
            self.__url('limpeza'),
            self.__url('feira'),
            self.__url('bebidas'),
            self.__url('padaria'),
            self.__url('doces-e-sobremesas'),
            self.__url('utensilios-para-o-lar'),
            self.__url('bebidas-alcoolicas'),
            self.__url('higiene-e-cuidados-pessoais'),
            self.__url('biscoitos-e-salgadinhos'),
            self.__url('molhos-condimentos-e-conservas'),
            self.__url('leites-e-iogurtes'),
            self.__url('matinais'),
            self.__url('congelados'),
            self.__url('pet-shop'),
            self.__url('etnicos')
        ]
