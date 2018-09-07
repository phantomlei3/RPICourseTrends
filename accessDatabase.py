import mysql.connector
from mysql.connector import errorcode

conn = mysql.connector.connect(
    user="Ruijie",
    password="gengruijie123",
    host="142.93.59.116",
    database="mysql"
)

query = "show databses;"
query = "SELECT level, score from main where name = \"" + username + "\""
# print(query)
# cur = connection.cursor(buffered=True)
cursor = MySQLCursor(connection)
cursor.execute(query)
data1 = cursor.fetchall()