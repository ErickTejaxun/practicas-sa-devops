import mysql.connector

from flask import Flask
app = Flask(__name__)

data = '-'



@app.route('/')
def hello():
    return 'Práctica número 9. SA 2021'

@app.route('/servidor1')
def servidor1():
    mydb = mysql.connector.connect(host='servidor-db',port='3306',user='root',password='root',database='sa_db',auth_plugin='mysql_native_password')    
    mycursor = mydb.cursor()
    mycursor.execute('SELECT * FROM usuario')
    myresult = mycursor.fetchall()
    data = ''
    for x in myresult:
        #print(x)
        data = data + '\n\n' + str(x)
        #print(mydb)
    return 'Contenido de la base de datos {} \n'.format(data)

@app.route('/servidor2')
def servidor2():
    mydb = mysql.connector.connect(host='servidor-db2',port='3306',user='root',password='root',database='sa_db',auth_plugin='mysql_native_password')    
    mycursor = mydb.cursor()
    mycursor.execute('SELECT * FROM departamento')
    myresult = mycursor.fetchall()
    data = ''
    for x in myresult:
        #print(x)
        data = data + '\n\n' + str(x)
        #print(mydb)
    return 'Contenido de la base de datos {} \n'.format(data) 