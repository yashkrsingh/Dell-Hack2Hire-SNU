import sys, json
import pickle
import pandas as pd
import numpy as np
from collections import Counter


def getMostCommon(l, howMany):
    countMap = Counter(l).most_common(howMany)
    return [s[0] for s in countMap]


def getPredictions(price, ram, storage):
    laptop_data = pickle.load(open("model/finalresults_data.pkl", "rb"))

    model = pickle.load(open("model/kmeans.pkl", "rb"))

    item_class = model.predict(np.array([[-1, -1, ram, -1, -1, -1, price]])).tolist().pop()
    
    result_data = laptop_data.loc[laptop_data['Class'] == item_class]
    result_data = result_data.loc[laptop_data['Company'] == "Dell"]

    #return 3 results
    return result_data['Id'][0:3].tolist()


def getResult(**kwargs):
    # TODO get result for each element and get 3 most frequent result
    # probably add all the lists and the create a count map
    if 'orders' in kwargs.keys() and 'history' in kwargs.keys():
        orderPredictions = []
        for order in json.loads(kwargs['orders']['orders']):
            # print(order)
            pred = getPredictions(int(order['itemOrder']['price']), int(order
                                                                        ['itemOrder']['Ram'][:-2]), 1)
            orderPredictions += pred
        finalItemsThroughOrder = getMostCommon(orderPredictions, 3)

        historyPredictions = []
        for k, v in json.loads(kwargs['history']).items():
            pred = getPredictions(v['Price'], v['RAM'], v['Storage'])
            historyPredictions += pred
        finalItemsThroughHistory = getMostCommon(historyPredictions, 3)
        send = {"isSuccess": True, "recOrders": finalItemsThroughOrder,
                "isRecOrders": True, "recHistory": finalItemsThroughHistory, "isRecHistory": True}

    elif 'orders' in kwargs.keys():
        orderPredictions = []
        for order in kwargs['orders']['orders']:
            pred = getPredictions(int(order['itemOrder']['price']), int(order
                                                                        ['itemOrder']['Ram'][:-2]), 1)
            orderPredictions += pred
        finalItemsThroughOrder = getMostCommon(orderPredictions, 3)

        send = {"isSuccess": True, "recOrders": finalItemsThroughOrder,
                "isRecOrders": True, "isRecHistory": False}
    elif 'history' in kwargs.keys():
        historyPredictions = []
        for k, v in kwargs['history'].items():
            pred = getPredictions(v['Price'], v['RAM'], v['Storage'])
            historyPredictions += pred
        finalItemsThroughHistory = getMostCommon(historyPredictions, 3)
        send = {"isSuccess": True, "recHistory": finalItemsThroughHistory,
                "isRecOrders": False, "isRecHistory": True}
    else:
        send = {"isSuccess": False}

    return send
