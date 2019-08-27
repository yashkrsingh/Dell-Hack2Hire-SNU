import numpy as np
import pandas as pd
import os
import pickle
import json
from sklearn.externals import joblib
from sklearn import preprocessing
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import make_pipeline
import warnings
warnings.filterwarnings("ignore")

data = pd.read_csv('data_dell.csv')

data['Service Recommended'] = data['Service Recommended'].replace({"PSP ":"PSP"})
data['Wired/Wireless'] = data['Wired/Wireless'].replace({"Wired ":"Wired", "wireless":"Wireless"})
data['Type of Product'] = data['Type of Product'].replace({"H Disk":"HDisk", "Hdisk":"HDisk", "Headphones":"Headphone"})
data['Antivirus Purchase (yrs)'] = data['Antivirus Purchase (yrs)'].replace({"NO":"0"})

data1 = data.drop(['Puchase Date','Last Update'], axis=1, inplace=True)

data['Faulty software'] = data['Faulty software'].astype('category')
data['Faulty hardware'] = data['Faulty hardware'].astype('category')
data['Type of Product'] = data['Type of Product'].astype('category')
data['Antivirus Purchase (yrs)'] = data['Antivirus Purchase (yrs)'].astype('int64')
data['Services Used'] = data['Services Used'].astype('category')
data['Wired/Wireless'] = data['Wired/Wireless'].astype('category')
data['Service Recommended'] = data['Service Recommended'].astype('category')
data['Type of Product'] = data['Type of Product'].astype('category') 

LE = preprocessing.LabelEncoder()

data['Faulty software'] = LE.fit_transform(data['Faulty software'])
data['Faulty hardware'] = LE.fit_transform(data['Faulty hardware'])
data['Services Used'] = LE.fit_transform(data['Services Used'])
data['Wired/Wireless'] = LE.fit_transform(data['Wired/Wireless'])
data['Service Recommended'] = LE.fit_transform(data['Service Recommended'])
data['Type of Product'] = LE.fit_transform(data['Type of Product'])

bins = [-0.9,0.9,2,10]
labels = [1,2,3]
data['Purchase_binned'] = pd.cut(data['Purchase Interval'], bins=bins, labels=labels)

bins = [-0.9,3,6,50]
labels = [1,2,3]
data['Warranty_binned'] = pd.cut(data['Warranty Expiry (months)'], bins=bins, labels=labels)

bins = [-1.9,-1,6,50]
labels = [1,2,3]
data['Backup_binned'] = pd.cut(data['Last BackUp'], bins=bins, labels=labels)

bins = [-1.9,-1,0.9,2,50]
labels = [1,2,3,4]
data['Antivirus_binned'] = pd.cut(data['Antivirus Purchase (yrs)'], bins=bins, labels=labels)

bins = [-0.9,6,50]
labels = [1,2]
data['Tickets_binned'] = pd.cut(data['Number of Tickets raised'], bins=bins, labels=labels)

bins = [-1.9,-0.9,1.9,50]
labels = [1,2,3]
data['Update_period_binned'] = pd.cut(data['Update Period'], bins=bins, labels=labels)
data2 = data.drop(['Purchase Interval','Warranty Expiry (months)','Last BackUp','Antivirus Purchase (yrs)','Number of Tickets raised','Update Period'], axis=1, inplace=True) 
    

from sklearn.model_selection import train_test_split          #Splitting the data

dataset = data
y = dataset['Service Recommended']
del dataset['Service Recommended']
X = dataset

X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state = 123)

from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(n_estimators=100, max_depth=2, random_state=0)
new=clf.fit(X,y)
pickle.dump(new,open('model.pkl', 'wb'))  
#loaded_model = pickle.load(open('model.pkl','rb'))
                                                                                    
                                                
#clf = RandomForestClassifier(n_estimators=100, max_depth=2, random_state=0)
#model = clf.fit(X_train,y_train)
#proba = clf.predict(X_test)
#print(proba)
#proba.sort(reverse = True)
#print(proba[:3])


pickle.dump(clf,open('model.pkl','wb'))
#loaded_model = pickle.load(open('model.pkl','rb'))
#loaded_model.predict(X_test)

#print(proba)












