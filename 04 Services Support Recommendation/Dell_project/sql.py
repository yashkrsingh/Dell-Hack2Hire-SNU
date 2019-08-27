# sql.py - Create a SQLite3 table and populate it with data


import sqlite3

# create a new database if the database doesn't already exist
with sqlite3.connect('sample.db') as connection:

    # get a cursor object used to execute SQL commands
    c = connection.cursor()#allows to interact with the user

    # create the table
    c.execute('DROP TABLE dell')
    c.execute('CREATE TABLE dell(user_name TEXT,type_of_product TEXT, purchase_interval INTEGER, purchase_data DATE, warranty_expiry INTEGER, faulty_software TEXT, faulty_hardware TEXT, last_backup INTEGER, antivirus_purchase TEXT, services_used TEXT, number_of_tickets_raised INTEGER, update_period INTEGER, last_update TEXT, wired_wireless TEXT)')

    # insert dummy data into the table
    c.execute('INSERT INTO dell VALUES("admin","Mouse",4,"17/07/2015",0,"-1","Battery",-1,"-1","paid",7,-1,"-1","Wireless")')
    c.execute('INSERT INTO dell VALUES("admin1","PC",3,"06/10/2016",0,"Not Faulty","Broken",2,"2","paid",9,0,"06/08/2019","-1")')
    #c.execute('INSERT INTO dell VALUES("admin1","Headphones",1,	03/11/2018,3,-1,"Not Faulty",-1,"-1","free",4,-1,"-1","Wire")')
   # c.execute('INSERT INTO dell VALUES("admin","HDisk",1,	03/11/2018,6,"Not Faulty",-1,"-1","free",4,-1,"-1","Wireless")')
    
#c.execute('INSERT INTO dell VALUES("Well", "I\'m well.")')
    #c.execute('INSERT INTO dell VALUES("Excellent", "I\'m excellent.")')
    
