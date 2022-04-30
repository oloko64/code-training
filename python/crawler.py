import requests
from bs4 import BeautifulSoup as bs4
from time import time

start_link = 'https://www.google.com/'
url_filter = '.pdf'
levels_deep = 2


def timer(func):
    def inner(*args, **kwargs):
        start = time()
        result = func(*args, **kwargs)
        end = time()
        print()
        print(f'Time taken: {round(end - start, 2)} seconds')
        return result
    return inner


def get_links(link):
    req = requests.get(link)
    soup = bs4(req.content, 'html.parser')

    links = [link.get('href') for link in soup.findAll('a')]
    return [
        link for link in links if link is not None and link.startswith('http')]


def print_link(url_filter, link):
    if url_filter in link:
        print(link)


def crawler_loop(n, loop_link):
    if n == 0:
        return
    else:
        for link in get_links(loop_link):
            print_link(url_filter, link)
            crawler_loop(n - 1, link)


@timer
def crawler():
    crawler_loop(levels_deep, start_link)


crawler()
