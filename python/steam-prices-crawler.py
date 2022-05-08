from selenium import webdriver
from selenium.webdriver.common.by import By
from time import sleep
from bs4 import BeautifulSoup as bs4


class Game ():
    def __init__(self, name='', price='', link='', review='', date='', discount=''):
        self.name = name
        self.price = price
        self.link = link
        self.review = review
        self.date = date
        self.discount = discount


browser = webdriver.Firefox()
games = []
g = Game()
pages_to_search = 5
max_games = 500
money_type = 'R$'

browser.get('https://store.steampowered.com/')
browser.find_element(
    By.XPATH, '/html/body/div[1]/div[7]/div[5]/div[1]/div[1]/div/div[1]/div[8]/a[1]').click()
for i in range(0, pages_to_search):
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    sleep(0.6)

offers = browser.find_elements(By.CLASS_NAME, 'search_results')[
    0].get_attribute('innerHTML')
browser.close()
soup = bs4(offers, 'html.parser')

print(f'Parsing data from {max_games} games...')


def get_price(class_name) -> str:
    value = soup.find_all(class_=class_name)[
        i].getText().replace('\n', '').strip() or 'None'
    if money_type in value:
        value = value.split(money_type)
        del value[0]
        for index, _ in enumerate(range(len(value))):
            value[index] = f'{money_type}{value[index]}'
        if len(value) == 2:
            return f'{value[0]} --> {value[1]}'
        return value[0]
    else:
        return value


for i in range(max_games):
    try:
        g.name = soup.find_all(class_='title')[i].getText()
        g.review = soup.find_all(class_='search_review_summary')[i].getText()
        g.date = soup.find_all(class_='search_released')[i].getText()
        g.price = get_price('search_price')
        g.discount = get_price('search_discount')

        games.append(
            {
                "name": g.name,
                "price": g.price,
                "discount": g.discount,
                "release_date": g.date or 'Not Declared'
            }
        )
    except Exception as e:
        print(e)
        break


for game in games:
    print(game)
print()
print(f'Listed {len(games)} games')
