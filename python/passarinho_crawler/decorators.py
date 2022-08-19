from time import time


def execute_time(func):
    def wrapper(*args, **kwargs):
        start = time()
        result = func(*args, **kwargs)
        end = time()
        print(f'Crawler took {(end - start):.4f} seconds')
        return result
    return wrapper
