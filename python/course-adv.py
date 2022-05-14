# Generators
def fibo(num):
    a, b = 0, 1
    while a < num:
        yield a
        a, b = b, a+b

print('Generators')
fib = fibo(10)
while True:
    try:
        print(next(fib))
    except StopIteration:
        break


# Iterators

arr = [1, 2, 3, 4, 5, 6, 7]
it = iter(arr)

print('Iterators')
while True:
    try:
        print(next(it))
    except StopIteration:
        break
