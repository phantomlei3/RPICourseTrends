import mysql.connector
from mysql.connector import errorcode
import string


class CourseDb(object):
    def __init__(self, my_user,my_password, my_host, my_database ):
        self.cnx = mysql.connector.connect(
            user=my_user,
            password=my_password,
            host=my_host,
            database=my_database
        )

        self.database = my_database
        self.cursor = self.cnx.cursor()
        self.table = None

        try:
            # try to connect to database
            self.cnx.database = my_database
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_BAD_DB_ERROR:
                self.create_database(my_database)
                self.cnx.database = my_database
            else:
                print(err)
                exit(1)

    def create_database(self, my_database):
        try:
            self.cursor.execute(
                "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(my_database))
        except mysql.connector.Error as err:
            print("Failed creating database: {}".format(err))
            exit(1)

    def create_table_other(self,table_name, command):
        try:
            print("Creating table {}: ".format(table_name), end='')
            self.cursor.execute(command)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print("already exists.")
            else:
                print(err.msg)
        else:
            print("OK")

    def show_database(self):
        query = "show databases;"
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def show_tables(self,database):
        self.cursor.execute("use {};".format(database))
        self.cursor.execute("show tables;")
        return self.cursor.fetchall()

    def drop_database(self,database):
        query = "DROP DATABASE {};".format(database)
        self.cursor.execute(query)

    def drop_table(self,table = None):
        if table == None:
            table = self.table
        try:
            query = "DROP TABLE {}".format(table)
            self.cursor.execute(query)
            print("Success to drop table {} from database {}".format(table, self.database))
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print("already exists.")
            else:
                print(err.msg)

    def create_tables(self, table_name, element, key):
        # table = "Courses2"
        query = "CREATE TABLE {} (".format(table_name)
        for item in element:
            query += " {} {} , ".format(item[0], item[1])
        query += "PRIMARY KEY ({}) )".format(key)
        try:
            print("Creating table {}: ".format(table_name), end='')
            self.cursor.execute(query)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_TABLE_EXISTS_ERROR:
                print("already exists.")
            else:
                print(err.msg)
        else:
            print("OK")
        self.cnx.commit()

    """
    [('time', 'datetime', 'NO', 'PRI', None, ''), ('comments', 'varchar(11)', 'YES', '', None, '')]
    [ (column1, type, Null, keyOrNot, None, "), (), () ]
    """

    def describe_table(self,table):
        query = "DESCRIBE {:s}; ".format(table)
        self.cursor.execute(query)
        # print(cursor.fetchall())
        # exit(1)
        return self.cursor.fetchall()

    # INSERT INTO tbl_name (col1,col2) VALUES(15,col1*2);

    def insert_data(self, data):
        if type(data[0]) == list or type(data[0]) == tuple:
            data[0][1] = "\'" + data[0][1] + "'"
            query = "INSERT INTO {} (".format(self.table)
            for item in data:
                query += "{} ,".format(item[0])
            query = query.strip(",") + ") VALUES("

            for item in data:
                value = item[1].replace("'", "")
                query += "{},".format(value)
            query = query.strip(",") + ");"
            # print(query)
            self.cursor.execute(query)
            self.cnx.commit()

        else:
            column = self.describe_table(self.table)
            insert_key = []
            for item in column:
                insert_key.append(item[0])

            # data[0][1] = "\'" + data[0][1] + "'"
            query = "INSERT INTO {} (".format(self.table)
            for item in insert_key:
                query += "{} ,".format(item)
            query = query.strip(",") + ") VALUES("

            for item in data:
                if type(item) == str:
                    item = item.replace("'", "")
                query += "'{}',".format(item)
            query = query.strip(",") + ");"
            # print(query)
        try:
            # print(query)
            self.cursor.execute(query)
            self.cnx.commit()
            print("OK")
        except mysql.connector.Error as err:
            print(err.msg)



    def queryData(self, queryTable):
        query = "select * from {}".format(queryTable)
        self.cursor.execute(query)
        return self.cursor.fetchall()


    def queryColsData(self, querTable, cols):
        if type(cols) != list:
            raise ("please input a list of cols")
            return
        query = "select {} from {}".format(', '.join(cols), querTable)
        self.cursor.execute(query)
        return self.cursor.fetchall()


    def setTable(self, table):
        self.table = table


if __name__ == '__main__':
    pass
