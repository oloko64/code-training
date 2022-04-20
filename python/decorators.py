import time


def timeit(func):
    def timed():
        start = time.time()
        func()
        end = time.time()
        print(f'Program took {(end - start) * 1000}s to run')
    return timed


@timeit
def print_welcome():
    print('Welcome to datagy!')
