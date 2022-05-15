from subprocess import run
from re import search
from time import time


# Video link of the challenge: https://www.youtube.com/watch?v=zp4BMR88260


def timeit(func):
    def wrap_func(*args, **kwargs):
        start = time()
        result = func(*args, **kwargs)
        end = time()
        print()
        print(f'Program took {round((end - start) * 1000, 3)}ms to run')
        return result
    return wrap_func


def check_for_file():
    try:
        with open('words.txt') as f:
            return
    except FileNotFoundError:
        print('File not found. Creating file...')
        print()
        run(['wget', url_global])
        run('clear')


def get_words():
    check_for_file()
    with open('words.txt') as f:
        return f.read().splitlines()


def longest_words_in_display():
    words = get_words()
    longest_word_len = 0
    for word in words:
        if len(word) <= longest_word_len:
            continue
        if not search(r'[gkmqvwxzio]', word):
            longest_word_len = len(word)

    longest_word_list = [
        word for word in words if len(word) == longest_word_len]

    return longest_word_list


@timeit
def display_longest_words():
    for word in longest_words_in_display():
        print(word)


if __name__ == '__main__':
    url_global = 'https://raw.githubusercontent.com/dwyl/english-words/master/words.txt'

    display_longest_words()
