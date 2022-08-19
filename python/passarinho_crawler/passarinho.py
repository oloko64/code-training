import requests
import json


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

    def __url(self, department):
        return f'https://www.sitemercado.com.br/api/b2c/product/department/{department}?store_id=1139'

    def __process_response(self, response, is_json=False):
        if is_json:
            return json.dumps(json.loads(response.text), indent=2)
        return json.loads(response.text)

    def get_offers(self, *, is_json=False):
        response = requests.get(
            'https://www.sitemercado.com.br/api/v1/b2c/1139/product/offers', headers=self.token)
        return self.__process_response(response, is_json)

    def get_meat(self, *, is_json=False):
        response = requests.get(self.__url(
            'carnes-aves-e-peixes'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_basic_foods(self, *, is_json=False):
        response = requests.get(self.__url(
            'alimentos-basicos'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_dairy(self, *, is_json=False):
        response = requests.get(self.__url(
            'frios-e-laticinios'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_cleaning(self, *, is_json=False):
        response = requests.get(self.__url('limpeza'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_fruits(self, *, is_json=False):
        response = requests.get(self.__url('feira'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_drinks(self, *, is_json=False):
        response = requests.get(self.__url('bebidas'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_bakery(self, *, is_json=False):
        response = requests.get(self.__url('padaria'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_candy(self, *, is_json=False):
        response = requests.get(self.__url(
            'doces-e-sobremesas'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_house_items(self, *, is_json=False):
        response = requests.get(self.__url(
            'utensilios-para-o-lar'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_alcohol(self, *, is_json=False):
        response = requests.get(self.__url(
            'bebidas-alcoolicas'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_personal_care(self, *, is_json=False):
        response = requests.get(self.__url(
            'higiene-e-cuidados-pessoais'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_snacks(self, *, is_json=False):
        response = requests.get(self.__url(
            'biscoitos-e-salgadinhos'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_sauces(self, *, is_json=False):
        response = requests.get(self.__url(
            'molhos-condimentos-e-conservas'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_yogurt(self, *, is_json=False):
        response = requests.get(self.__url(
            'leites-e-iogurtes'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_morning_food(self, *, is_json=False):
        response = requests.get(self.__url('matinais'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_frozen_food(self, *, is_json=False):
        response = requests.get(self.__url('congelados'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_pet_items(self, *, is_json=False):
        response = requests.get(self.__url('pet-shop'), headers=self.token)
        return self.__process_response(response, is_json)

    def get_international_items(self, *, is_json=False):
        response = requests.get(self.__url('etnicos'), headers=self.token)
        return self.__process_response(response, is_json)
