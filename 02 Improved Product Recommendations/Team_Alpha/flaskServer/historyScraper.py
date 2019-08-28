import browserhistory as bh
from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd

def getBrowserHistory():
    dict_obj = bh.get_browserhistory()
    dict_obj.keys()
    l=dict_obj['chrome'][:10:]
    res=[]
    for l1 in l:
        res.append(l1[0])
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(executable_path='./chromedriver',chrome_options=chrome_options)

    products=[] 
    prices=[] 
    rams=[]
    roms=[]
    for w1 in res:
        if len(products)>3:
            break
        if 'flipkart' not in w1:
            continue
        driver.get(w1)

        content = driver.page_source
        soup = BeautifulSoup(content)
        for a in soup.findAll('a',href=True, attrs={'class':'_31qSD5'}):
            name=a.find('div', attrs={'class':'_3wU53n'})
            price=a.find('div', attrs={'class':'_1vC4OE _2rQ-NK'})
            #rating=a.find('div', attrs={'class':'hGSR34 _2beYZw'})
            pr=price.text
            if pr[4:].isdigit() and pr[1:3].isdigit():
                p=int(pr[4:])
                p+=int(pr[1:3])*1000
                p=p//80
            else:
                break
            a1=name.text
            i=-1
            j=-1
            jl=''
            if 'GB' in a1:        
                i=a1.index('GB')
            if 'HDD' in a1:
                j=a1.index('HDD')
                jl='HDD'
                if 'TB' in a1:
                    j=a1.index('TB')
                    jl='TB'
            if 'SSD' in a1:
                j=a1.index('SSD')
                jl='SSD'
            if i!=-1 and j!=-1:
                ram=a1[i-3:i-1]
                if(ram[0]=='('):
                    ram=int(ram[1::])
                else:
                    ram=int(ram)
                if jl=='TB':
                    rams.append(ram)
                    roms.append(a1[j-2:j+6])
                    products.append(name.text)		
                    prices.append(p)
                elif jl=='HDD':
                    rams.append(ram)
                    roms.append(a1[j-7:j+3])
                    products.append(name.text)		
                    prices.append(p)
                elif jl=='SSD':
                    rams.append(ram)
                    roms.append(a1[j-7:j+3])
                    products.append(name.text)		
                    prices.append(p)
        if len(prices)==0:
            #for h1 in soup.findAll('h1',attrs={'class':'_9E25nV'}):
            name=soup.find('span', attrs={'class':'_35KyD6'})
            price=soup.find('div', attrs={'class':'_1vC4OE _3qQ9m1'})
            a1=name.text
            pr=price.text
            print(pr,name.text)
            if pr[4:].isdigit() and pr[1:3].isdigit():
                p=int(pr[4:])
                p+=int(pr[1:3])*1000
                p=p//80
            else:
                break
            i=-1
            j=-1
            jl=''
            if 'GB' in a1:        
                i=a1.index('GB')
            if 'HDD' in a1:
                j=a1.index('HDD')
                jl='HDD'
                if 'TB' in a1:
                    j=a1.index('TB')
                    jl='TB'
            if 'SSD' in a1:
                j=a1.index('SSD')
                jl='SSD'
            if i!=-1 and j!=-1:
                ram=a1[i-3:i-1]
                if(ram[0]=='('):
                    ram=int(ram[1::])
                else:
                    ram=int(ram)
                if jl=='TB':
                    rams.append(ram)
                    roms.append(a1[j-2:j+6])
                    products.append(name.text)		
                    prices.append(p)
                elif jl=='HDD':
                    rams.append(ram)
                    roms.append(a1[j-7:j+3])
                    products.append(name.text)		
                    prices.append(p)
                elif jl=='SSD':
                    rams.append(ram)
                    roms.append(a1[j-7:j+3])
                    products.append(name.text)		
                    prices.append(p)
    df = pd.DataFrame({'Product Name':products,'Price':prices,'RAM':rams,'Storage':roms}) 
    result = df.to_json(orient='index')
    return result
