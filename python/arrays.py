import os
import time

urls = ['https://google.com/get_filehsdghgjhxfjxftdgthzdghzdhgSRgrhzdfghzdghzdghzdhzdfhz.mp4/?rnd=252525423423423/',
        'https://google.com/remote_control.php?file=gdhxdghxghxfghxzghxzghxfghxfghxfghxfghxfghzhzdh']


def splitUrls(urls):
    allUrls = [splitted.split('?') for splitted in urls]
    allUrls = [item for subList in allUrls for item in subList]
    return fileLinks(allUrls)


def fileLinks(urls):
    fileUrls = []
    fileUrls = [url for url in urls if '.mp4' in url]
    return fileUrls


for index, url in enumerate(splitUrls(urls)):
    print(f'url {index}: {url}')
    # os.system(f'wget -O teste-{index + 1}.mp4 {url}')

# Decorators are functions that take a function and return a function


def timeit(func):
    def timed(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f'Program took {(end - start) * 1000}s to run')
        return result
    return timed


@timeit
def print_welcome():
    print('Welcome to datagy!')


print_welcome()

# Returns:
# Program took 0.0s to run


def one(func):
    def inner(*args, **kwargs):
        print('1')
        return func(*args, **kwargs)
    return inner


def two(func):
    def inner(*args, **kwargs):
        print('2')
        return func(*args, **kwargs)
    return inner


@timeit
@one
@two
def speak(text):
    print(text)


speak('Hello')

# Returns:
# 1
# 2
# Hello
