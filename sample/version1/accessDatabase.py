from sample import processData
import mysql.connector
from mysql.connector import errorcode
import string
from sample import Database


def create_course_table():
    key2 = string.ascii_lowercase
    count = 0
    key1 = 0

    professor = processData.get_professor()
    global_key_list = []
    course_key_list = []
    num_count = 0
    letter_index = 0
    for depart, courses in sorted(professor.items()):
        global_key_list.append(["id", "MEDIUMINT NOT NULL AUTO_INCREMENT"])
        global_key_list.append(["time", "DATETIME"])
        global_key_list.append(["comments", "varchar(11)"])
        for course, number in sorted(courses.items()):
            course_key = string.ascii_lowercase[letter_index] + str(num_count)
            letter_index += 1
            if letter_index == 26:
                num_count += 1
                letter_index = 0
            keyInfo = (depart + course).replace(" ", "").replace("/", "_").replace("'", "").replace("-", "_")
            global_key_list.append([keyInfo, "int(4)"])
            prof = course[4:]
            course_key_list.append([keyInfo, course_key, prof, depart])

        # leave some empty slot for some late added course.
        for index in range(8):
            colName = "empty{}".format(str(index))
            global_key_list.append([colName, "int(4)"])

        db.create_tables(depart, global_key_list, "id")
        global_key_list.clear()


def storeData(db, file):
    f = open(file)
    lines = f.readlines()
    for index in range(0, len(lines), 2):

        time = lines[index]
        if time == "":
            break
        courseData = lines[index + 1].split(", ")
        index += 1
        print(time)

        tables = db.show_tables(DB_NAME)
        dataIndex = 0
        for element in tables:
            table = element[0]
            columns = db.describe_table(table)
            colList = []
            for col in columns:
                if col[0] == "id":
                    continue
                colList.append(col[0])
            # i = 0

            # first two is time and comments
            dbIndex = 2
            storeList = [["time", time.split(".")[0]]]
            temp = courseData[dataIndex][0:4]
            while (table == courseData[dataIndex].strip()[0:4]):
                temp = courseData[dataIndex][0:4]
                dataStr = courseData[dataIndex].replace("/", "").split(":")[0]
                if dataStr in colList[dbIndex]:
                    num = courseData[dataIndex].split(":")[-1]
                    storeList.append([colList[dbIndex], num])
                    dbIndex += 1
                    dataIndex += 1

                elif dataStr > colList[dbIndex]:
                    dbIndex += 1

                elif dataStr < colList[dbIndex]:
                    dataIndex += 1
                temp = courseData[dataIndex].strip()[0:4]
            # print(storeList)
            db.insert_data(table, storeList)


if __name__ == '__main__':
    DB_NAME = "RPICourseTrends"
    dataFile = "dataFinal.txt"
    db = Database.CourseDb("Ruijie", "gengruijie123", "142.93.59.116", DB_NAME)

    # store data from data file into the database
    # storeData(db, file):

    # test case to load data from database.
    queryTable = "CSCI"
    output = db.queryData(queryTable)
    print(output)

    # temp = [
    #     ["keyInfo", "varchar(35)"],
    #     ["globalKey", "varchar(11)" ],
    #     [""]
    # ]
    # create_tables("CourseInfo", )

    # while count < len(professor):
    #     for index in range(len(key2)):
    #         # for key,value in sorted(professor.items()):
    #         # currently, the longest name of course name is 30
    #         # course_name = value
    #         command_course += """  {} VARCHAR(3) NOT NULL,""".format(str(key2[index])+str(key1))
    #         count += 1
    #         if count >= len(professor):
    #             break
    #     key1 += 1
    # print(len(professor))
