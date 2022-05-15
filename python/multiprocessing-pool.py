from multiprocessing import Pool
from time import time


def timeit(func):
    def wrapper(*args, **kwargs):
        start = time()
        result = func(*args, **kwargs)
        end = time()
        print('{} took {} seconds'.format(func.__name__, end - start))
        return result
    return wrapper


def sum_square(n):
    s = 0
    for i in range(n):
        s += i * i
    return s


@timeit
def sum_square_mp(n):
    p = Pool()
    result = p.map(sum_square, n)

    p.close()
    p.join()
    return result


@timeit
def sum_square_no_mp(n):
    result = [sum_square(i) for i in n]
    return result


if __name__ == '__main__':
    numbers = [i for i in range(10000)]
    print(len(sum_square_mp(numbers)))
    print(len(sum_square_no_mp(numbers)))
