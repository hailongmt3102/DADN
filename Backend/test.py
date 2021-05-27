from functools import reduce
a = [1,2,3]
print(reduce(
    lambda lst, item: lst + [item+1],
    a,
    []
))