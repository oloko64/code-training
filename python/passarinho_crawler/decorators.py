from time import time


def execute_time(func):
    async def wrapper(*args, **kwargs):
        start = time()
        result = await func(*args, **kwargs)
        end = time()
        print(f'Crawler took {(end - start):.4f} seconds')
        return result
    return wrapper
