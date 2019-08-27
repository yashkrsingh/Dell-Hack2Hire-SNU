# import the Flask class from the flask module
from flask import Flask, render_template, redirect, \
    url_for, request, session, flash, g,jsonify
from functools import wraps
import sqlite3
import json
import os
import pandas as pd
from sklearn.externals import joblib
from sklearn import preprocessing
import pickle
import numpy as np
from collections import OrderedDict
from sklearn.ensemble import RandomForestClassifier
from numpy import array

# create the application object
app = Flask(__name__)

# config
app.secret_key = 'my precious'
app.database = 'sample.db'
#def get_model():
#   global model
#  model = load_model('model.pkl')
# print("model loaded")


# login required decorator
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('You need to login first.')
            return redirect(url_for('login'))
    return wrap

# use decorators to link the function to a url
@app.route('/')
@login_required
def home():
    # return "Hello, World!"  # return a string
    g.db = connect_db()
    cur = g.db.execute('select * from dell where user_name="admin"')
    dell = [dict(user_name = row[0],type_of_product =row[1], purchase_interval=row[2], purchase_data = row[3], warranty_expiry = row[4], faulty_software=row[5], faulty_hardware =row[6], last_backup =row[7], antivirus_purchase =row[8], services_used =row[9], number_of_tickets_raised =row[10], update_period =row[11], last_update = row[12], wired_wireless=row[13] ) for row in cur.fetchall()]
    g.db.close()
    return render_template('index.html', dell=dell)  # render a template
     
@app.route('/predict',methods=['GET'])
@login_required
def predict():
    g.db = connect_db()
    cur = g.db.execute('select * from dell where user_name="admin"')
    dell = [OrderedDict(user_name = row[0],type_of_product =row[1], purchase_interval=row[2], purchase_data = row[3], warranty_expiry = row[4], faulty_software=row[5], faulty_hardware =row[6], last_backup =row[7], antivirus_purchase =row[8], services_used =row[9], number_of_tickets_raised =row[10], update_period =row[11], last_update = row[12], wired_wireless=row[13] ) for row in cur.fetchall()]
    g.db.close()
    test= pd.DataFrame(dell)
    test = test.drop(['user_name','purchase_data','last_update'], axis=1, inplace=False)
    
    test['faulty_software'] = test['faulty_software'].astype('category')
    test['faulty_hardware'] = test['faulty_hardware'].astype('category')
    test['type_of_product'] = test['type_of_product'].astype('category')
    test['antivirus_purchase'] = test['antivirus_purchase'].astype('int64')
    test['services_used'] = test['services_used'].astype('category')
    test['wired_wireless'] = test['wired_wireless'].astype('category')
    test['type_of_product'] = test['type_of_product'].astype('category') 

    LE = preprocessing.LabelEncoder()

    test['faulty_software'] = LE.fit_transform(test['faulty_software'])
    test['faulty_hardware'] = LE.fit_transform(test['faulty_hardware'])
    test['services_used'] = LE.fit_transform(test['services_used'])
    test['wired_wireless'] = LE.fit_transform(test['wired_wireless'])
    test['type_of_product'] = LE.fit_transform(test['type_of_product'])

    bins = [-0.9,0.9,2,10]
    labels = [1,2,3]
    test['purchase_binned'] = pd.cut(test['purchase_interval'],     bins=bins, labels=labels)

    bins = [-0.9,3,6,50]
    labels = [1,2,3]
    test['warranty_binned'] = pd.cut(test['warranty_expiry'], bins=bins, labels=labels)

    bins = [-1.9,-1,6,50]
    labels = [1,2,3]
    test['backup_binned'] = pd.cut(test['last_backup'], bins=bins, labels=labels)

    bins = [-1.9,-1,0.9,2,50]
    labels = [1,2,3,4]
    test['antivirus_binned'] = pd.cut(test['antivirus_purchase'], bins=bins, labels=labels)

    bins = [-0.9,6,50]
    labels = [1,2]
    test['tickets_binned'] = pd.cut(test['number_of_tickets_raised'], bins=bins, labels=labels)

    bins = [-1.9,-0.9,1.9,50]
    labels = [1,2,3]
    test['update_period_binned'] = pd.cut(test['update_period'], bins=bins, labels=labels)
    test = test.drop(['purchase_interval','warranty_expiry','last_backup','antivirus_purchase','number_of_tickets_raised','update_period'], axis=1,inplace = False)
    test=test.to_numpy() 
    test = test.reshape(1,-1)
    loaded_model = pickle.load(open('model.pkl','rb'))
    #loaded_model.fit(X,y)
      
    #test = preprocess()
    prediction = loaded_model.predict_proba(test)
    #prediction = prediction.reshape(1, -1)
    #prediction = -np.sort(-prediction)
    #prediction2 =prediction[::-1]
    prediction = np.argsort(-prediction)
     
    #prediction = np.list2array(prediction)
    #prediction2 = np.zeros(3)
    #prediction_1 = prediction1[8]
    #prediction_2 = prediction1[7]
    #prediction_3 = prediction1[6]
    #for i in range(9):
        #if(prediction[i] == prediction_1):
            #a = i
        #if(prediction[i]==prediction_2):
            #b=i
        #if(prediction[i]==prediction_3):
            #c=i
    #final = np.array([a,b,c])   
    #prediction = prediction(:-3)
    #prediction4 = np.asarray(prediction2)
    f_p= prediction[0,0]
    s_p= prediction[0,1]
    t_p= prediction[0,2]
    def numbers_to_strings(argument):
        switcher = {
            0: "Battery Issue Services",
            1: "Configuration Services",
            2: "Contact Dell Support",
            3: "Hardware Services",
            4: "Premium Support Services",
            5: "Premium Support Plus Services",
            6: "Security Services",
            7: "Software Update Services",
            8: "Warranty Services"
        }
        return switcher.get(argument,"Contact our Support team")
    f_p=numbers_to_strings(f_p)    
    s_p=numbers_to_strings(s_p)    
    t_p=numbers_to_strings(t_p)    
    prediction= np.array2string(prediction) 
    return render_template('predict.html',f_p = f_p,s_p=s_p,t_p=t_p)
    
#get_model()

@app.route('/welcome')
def welcome():
    return render_template('welcome.html')  # render a template


# route for handling the login page logic
@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if (request.form['username'] != 'admin') \
                or request.form['password'] != 'admin':
            error = 'Invalid Credentials. Please try again.'
        if(request.form['username'] != 'admin1') \
                or request.form['password'] != 'admin1':
            session['logged_in'] = True
            flash('You were logged in.')
            return redirect(url_for('home'))
        if(request.form['username'] != 'admin') \
                or request.form['password'] != 'admin':
            session['logged_in'] = True
            flash('You were logged in.')
            return redirect(url_for('home'))
    return render_template('login.html', error=error)


    
@app.route('/logout')
@login_required
def logout():
    session.pop('logged_in', None)
    flash('You were logged out.')
    return redirect(url_for('welcome'))

# connect to database
def connect_db():
    return sqlite3.connect(app.database)

#prediction function
# start the server with the 'run()' method
if __name__ == '__main__':
    app.run(debug=True)
