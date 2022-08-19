
import json
from time import strftime, localtime
from multiprocessing import Pool
from passarinho import ProductUrls
from decorators import execute_time
from os.path import exists
from os import makedirs


def process_products(data) -> dict:
    data = data()
    products = {}
    if isinstance(data, dict):
        data = data['products']
    for offer in data:
        products[offer['excerpt']] = {
            "price": f"{offer['prices'][0]['price']:.2f}",
            "weight": f"{offer['weight']}",
            "quantity-available": f"{offer['quantityStock']}",
            "discount": f"{offer['discount']['value']:.2f}" if offer.get('discount') else "-",
            "original-price": f"{offer['price_old']:.2f}" if offer.get('discount') else "-"
        }
    return products


@execute_time
def main():
    passarinho = ProductUrls()

    items = [
        passarinho.get_offers,
        passarinho.get_cleaning,
        passarinho.get_basic_foods,
        passarinho.get_fruits,
        passarinho.get_meat,
        passarinho.get_drinks,
        passarinho.get_alcohol,
        passarinho.get_personal_care,
        passarinho.get_snacks,
        passarinho.get_dairy,
        passarinho.get_sauces,
        passarinho.get_yogurt,
        passarinho.get_candy,
        passarinho.get_bakery,
        passarinho.get_morning_food,
        passarinho.get_frozen_food,
        passarinho.get_pet_items,
        passarinho.get_house_items,
        passarinho.get_international_items
    ]

    with Pool() as pool:
        response = pool.map(process_products, items)

    all_products = {
        "offers": response[0],
        "cleaning": response[1],
        "basic_foods": response[2],
        "fruits": response[3],
        "meats": response[4],
        "drinks": response[5],
        "alcohol": response[6],
        "personal_care": response[7],
        "snacks": response[8],
        "dairy": response[9],
        "sauces": response[10],
        "yogurt": response[11],
        "candy": response[12],
        "bakery": response[13],
        "morning_food": response[14],
        "frozen_food": response[15],
        "pet_items": response[16],
        "house_items": response[17],
        "international_items": response[18]
    }

    out_dir = './output_data'
    if not exists(out_dir):
        print(f'Creating directory {out_dir}')
        makedirs(out_dir)

    file_name = strftime("%d-%m-%Y_%H:%M:%S", localtime())

    with open(f'{out_dir}/produtos_passarinho_{file_name}.json', 'w') as f:
        json.dump(all_products, f, ensure_ascii=False, indent=2)

    with open(f'{out_dir}/produtos_passarinho_{file_name}.csv', 'w') as f:
        f.write(
            'Produto,Preço (R$),Peso,Quantidade Disponivel,Desconto (R$),Preço Original (R$)\n')
        for category in list(all_products.keys()):
            for product in all_products[category].keys():
                f.write(
                    f'{product.replace(",", ".")},{all_products[category][product]["price"]},{all_products[category][product]["weight"].replace(",", ".")},{all_products[category][product]["quantity-available"]},{all_products[category][product]["discount"]},{all_products[category][product]["original-price"]}\n')


if __name__ == '__main__':
    main()
