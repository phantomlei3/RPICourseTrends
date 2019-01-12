from sample import helper
import mysql.connector
from mysql.connector import errorcode
import string
from sample import Database
import sys
import json
from datetime import  datetime



def create_course_table(db,url, year):
    # test environment
    # content = open("temp_professor.json", "rb").read()
    # professor = json.loads(content.decode("utf-8"))
    # professor = json.loads(professor)

    # productive evvironment
    professor, _ = helper.get_professor(db, url)

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

        db.create_tables(depart+year, global_key_list, "id")
        global_key_list.clear()


def check_new_course(db,table , web_data, year ):
    '''
    :param db:
    :param depart:
    :param web_data:
    :param db_data:
    :param year:
    :return:
    Two situtaion:
        First: totally new course, we just need to use this new course to replace empty column

        second: A old course with a different professor.
    '''
    db_set = set()
    web_set = set()
    db_data = db.describe_table(table)
    depart = db_data[3][0][0:4]

    for course in db_data:
        if depart not in course[0]:
            continue
        db_set.add(course[0])

    for course, num in web_data.items():
        web_course = (depart + course).replace(" ", "").replace("/", "_").replace("'", "").replace("-", "_")
        web_set.add(web_course)

    new_course = web_set - db_set
    for course in new_course:
        db_data = db.describe_table(table)
        new_course_flag = True
        old_field = ""
        new_field = ""

        # this part will check it is an old course with different professor or a new course
        for item in db_set:
            if item[0:8] == course[0:8] and item not in web_set:
                new_course_flag = False
                old_field = item
                new_field = course

        if new_course_flag == False:
            query = "ALTER TABLE {} CHANGE {} {} INT(4)".format(table, old_field, new_field)
            db.execute(query)

        else:
            # start from first course which is the fourth position in database.
            for index in range(3,len(db_data)):
                if "empty" in db_data[index][0]:
                    table = depart + year
                    old_field = db_data[index][0]
                    new_field = course
                    query = "ALTER TABLE {} CHANGE {} {} INT(4)".format(table, old_field, new_field)
                    db.execute(query)
                    break
            if index == len(db_data)-1 :
                print("Warning: need more column!")


def insert_course_data(db,url, year):
    # ===================================================================================
    # test environment
    # ===================================================================================
    # content = open("temp_professor.json", "rb").read()
    # professor = json.loads(content.decode("utf-8"))
    # professor = json.loads(professor)

    # ===================================================================================
    # productive evvironment
    # ===================================================================================
    professor, _ = helper.get_professor(db, url)


    DB_NAME = db.get_name()
    tables = db.show_tables(DB_NAME)
    for table in tables:
        # to check whether the table is course table
        if not helper.check_table(table, year):
            continue
        db_data = db.describe_table(table)
        depart = db_data[3][0][0:4]
        web_data = professor[depart]
        insert_data = dict()
        check_new_course(db, table, web_data, year)
        time_data = "'" + str(datetime.now()).split(".")[0] + "'"
        values = [["time", time_data]]

        for cour_prof, number in web_data.items():
            depart_cour_prof = (depart + cour_prof).replace(" ", "").replace("/", "_").replace("'", "").replace("-", "_")
            values.append([depart_cour_prof, number])

        db.insert_data(values, table)


def get_url(db, year):

    if "semesterInfo" not in db.show_tables():
        # raise Exception("Please set semesterInfo first")
        db.create_tables("semesterInfo",   [("id", "MEDIUMINT NOT NULL AUTO_INCREMENT"),
                                          ("URL", "VARCHAR(100)"),
                                          ("startID","VARCHAR(10)"),
                                          ("endID", "VARCHAR(4)")],   "year")
        # url = input("Please input URL => ").strip()
        # db.insert_data([ ["year",year], ["URL", url]], "semesterInfo")
    query = ("SELECT URL FROM semesterInfo WHERE year='{}'".format(year))
    db.execute(query)
    result = db.fetchall()

    if len(result) == 0:
        url = input("Please input URL for {} => ".format(year)).strip()
        db.insert_data([ ["year",year], ["URL", url]], "semesterInfo")

    else:
        url = result[0][0]

    return url


def insert_course_info(db, year, url):
    # db.drop_table("courseInfo")
    if "courseInfo" not in db.show_tables(DB_NAME):
        db.create_tables("courseInfo",   [("id", "MEDIUMINT NOT NULL AUTO_INCREMENT"),
                                          ("key1", "varchar(40)"),
                                            ("courseName", "VARCHAR(70)"),
                                            ("department","VARCHAR(5)"),
                                            ("courseCode", "VARCHAR(5)"),
                                            ("professor", "VARCHAR(40)"),
                                            ("max", "VARCHAR(5)"),
                                            ("time", "VARCHAR(5)"),
                                            ("syllabus", "VARCHAR(100)"),
                                            ("comment1", "VARCHAR(100)")],   ["key1", "id"])

    # check whether the courseInfo table is created or not.
    courseNum = len(db.queryColsData("courseInfo", [("time", "'S19'")]))
    if courseNum == 0:
        _, courses = helper.get_professor(db, url)
        helper.storeCourseInfoTable(courses, db, "courseInfo", year)


def setup_db(db, year):
    # get currect semester URL:
    # if semester does not create, the function will create semester table.
    url = get_url(db, year)

    # create info table and insert all the course info into the table
    # if this step is done before, the function will skip this step automatic
    insert_course_info(db, year, url)

    # create course tables for each department
    create_course_table(db,url, year)





if __name__ == '__main__':
    # define parameter in this program
    DB_NAME = "RPICourseTrends2"
    year = "S19"
    db = Database.CourseDb("Ruijie","XXXXXXXX","142.93.59.116",DB_NAME)

    # ===================================================================================
    # drop all the tables in specific year
    # ===================================================================================
    helper.drop_tables(db, year)


    # ===================================================================================
    # ===========================   setup the database   ================================
    # ===================================================================================
    # input URL, create course_info table and insert course info, create department table
    # and insert course into department table
    setup_db(db, year)

    # ===================================================================================
    # ==================   insert course data number of student   =======================
    # ===================================================================================
    url = get_url(db, year)
    insert_course_data(db, url, year)





    # query = "ALTER TABLE ADMNS19 CHANGE ADMN1010Barthel1 ADMN1010Barthel INT(4)"
    # db.execute(query)
    # query = "ALTER TABLE ADMNS19 CHANGE new_field_name empty0 INT(4)"
    # db.execute(query)


