import mysql.connector
mydb = mysql.connector.connect(host='localhost', user='root', passwd='Messenger_0f.God88', database='sakila')
cursor = mydb.cursor()

cursor.execute("Select * from actor where actor_id = 100")
print(cursor.fetchone())
