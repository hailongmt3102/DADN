# # Import library and create instance of REST client.
# from Adafruit_IO import Client, Feed
# aio = Client('V3Dracula1','aio_LmtH19lpdUHqdGvndz8I2JdKYHa9')

# for i in range(4,11):
#     for feed_name in ["-soil","-relay","-temp-humid"]:
#         aio.create_feed(Feed(f"{i}"+feed_name))
# # feeds = aio.feeds("bk-iot-soil")
# # print(aio.receive("bk-iot-soil"))
# # # Get list of feeds.
# # feeds = aio.feeds()
# {"id":"9","name":"SOIL","data":"2","unit":"%"}
# {"id":"9","name":"SOIL","data":"2","unit":"%"}
# {"id":"9","name":"SOIL","data":"2","unit":"%"}
# {"id":"7","name":"TEMP-HUMID","data":"25-30","unit":"C-%"}
# {"id":"7","name":"TEMP-HUMID","data":"27-54","unit":"C-%"}

from random import randint, random

['0ER89GDKJBDR5SH75KXKK885YH', '0ER89GA2J9JX89TFMK2KRKBWA6', '0ER871N3E39Q38Y5FDNGGSESCG']
['0ER89GDKJBDR5SH75KXKK885YH', '0ER89GA2J9JX89TFMK2KRKBWA6', '0ER871N3E39Q38Y5FDNGGSESCG']
print(randint(-1,1))
print(random()/8)
# # Print out the feed names:
# for f in feeds:
#     print('Feed: {0}'.format(f.name))


# # # # data = aio.receive('bk-iot-temp-humid')
# # # # print('Received value: {0}'.format(data))
# # class A:
# #     def test(self):
# #         self.test_value
# #         if self.test_value:
# #             print(self.test_value)
# #         else:
# #             self.test_value = 1

# # a = A()
# # a.test()


# p = [2,5,4,1,10]
# val = {}
# for i in range(1, 5):
#     val[f"{i}"] = {}



# def m(begin, end):
#     temp = val[f"{begin}"].get(f"{end}")
#     if temp:
#         return temp
#     if begin == end:
#         val[f"{begin}"][f"{end}"] = 0
#         return 0
#     str_set = [f"m({begin}, {j}) + m({j+1}, {end}) +p{begin-1}*p{j}*p{end}" for j in range(begin, end)]
#     val_set = [(m(begin, j) + m(j+1, end) +p[begin-1]*p[j]*p[end]) for j in range(begin, end)]
#     temp = min(
#         *val_set,10**1000
#     )
#     val[f"{begin}"][f"{end}"] = temp
#     print(f"m({begin},{end})=",str_set[val_set.index(temp)],"=",temp)
#     return temp
# m(1,4)
# # for i in range(1,5):
# #     for j in range(4,i-1,-1):
# #         print(f"m({i},{j})=",val[f"{i}"][f"{j}"])

