import asyncio
from os import makedirs
from os.path import exists
from time import strftime, localtime

import httpx

from decorators import execute_time
from passarinho import ProductUrls


def process_products(data) -> dict:
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
async def main():
    passarinho = ProductUrls()
    urls = passarinho.get_all_urls()

    async with httpx.AsyncClient() as client:
        tasks = (client.get(url, headers=passarinho.get_sm_token())
                 for url in urls)
        products = await asyncio.gather(*tasks)
        products = [process_products(product.json()) for product in products]

    out_dir = './output_data'
    if not exists(out_dir):
        print(f'Creating directory {out_dir}')
        makedirs(out_dir)

    file_name = strftime("%d-%m-%Y_%H:%M:%S", localtime())

    # with open(f'{out_dir}/produtos_passarinho_{file_name}.json', 'w') as f:
    #     json.dump(products, f, ensure_ascii=False, indent=2)

    with open(f'{out_dir}/produtos_passarinho_{file_name}.csv', 'w') as f:
        all_products = ''
        for category in products:
            for product in category:
                all_products += f'{product.replace(",", ".")},{category[product]["price"]},{category[product]["weight"].replace(",", ".")},{category[product]["quantity-available"]},{category[product]["discount"]},{category[product]["original-price"]}\n'

        f.write('Produto,Preço (R$),Peso,Quantidade Disponivel,Desconto (R$),Preço Original (R$)\n')
        f.write(all_products)


if __name__ == '__main__':
    asyncio.run(main())
