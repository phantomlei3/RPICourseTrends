import json
from sample import Database
import numpy as np
from sample import processData
import  datetime

# data = {}
# data['people'] = []
# data['people'].append({
#     'name': 'Scott',
#     'website': 'stackabuse.com',
#     'from': 'Nebraska'
# })
# data['people'].append({
#     'name': 'Larry',
#     'website': 'google.com',
#     'from': 'Michigan'
# })
# data['people'].append({
#     'name': 'Tim',
#     'website': 'apple.com',
#     'from': 'Alabama'
# })

def get_info(table_name, db):
    course_info = dict()
    courses = db.queryData(table_name)
    for course in courses:
        course_name = course[1]
        depart = course[2]
        course_number = course[3]
        professor = course[4]
        max_capacity = course[5]
        semester_time = course[6]

        if course_name in course_info:
            course_info[course_name]["Capacity"].append(max_capacity)
            course_info[course_name]["professor"].append(professor)

        else:
            temp = dict()
            temp["courseName"] = course_name
            temp["professor"] = [professor]
            temp["courseCode"] = course_number
            temp["Capacity"] = [max_capacity]
            temp["department"] = depart
            temp["time"] = semester_time
            course_info[course_name] = temp
    return course_info


def get_currect_number(table_name, db):
    curr_num_in_crs = dict()
    courses = db.queryData(table_name)
    col_name = db.describe_table(table_name)
    old_time = ""
    first_date = ""
    for course in courses:
        for index in range(len(col_name)):
            num = course[index]
            course_name = col_name[index][0]
            if col_name[index][0] == "time":
                new_time = course[index].year+ course[index].month + course[index].day
                if first_date == "":
                    first_date =  course[index]
                if old_time != new_time:
                    old_time = new_time
                else:
                    break
            elif col_name[index] == "comments" or col_name[index][0] == "id":
                continue

            elif  "empty" in col_name[index][0] :
                break
            else:
                if course_name[0:8] in curr_num_in_crs:
                    curr_num_in_crs[course_name[0:8]]["currect"].append(num)
                    # print(len(curr_num_in_crs[course_name[0:8]]["currect"]))

                else:
                    temp = dict()
                    temp["currect"] = [num]
                    temp["professor"] = course_name[8:]
                    temp["courseName"] = course_name[0:8]
                    temp["startDate"] = "{}-{}-{}".format(first_date.year, first_date.month,first_date.day)

                    curr_num_in_crs[course_name[0:8]] = temp

    return curr_num_in_crs
        # print(a)
        # a = datetime.datetime.now().date()







if __name__ == '__main__':
    myDB = "RPICourseTrends"
    db = Database.CourseDb("Ruijie", "xxxxxxxxx", "142.93.59.116", myDB)


    # ========================show tables in database=========================
    # data = np.array(db.show_tables(myDB) )
    # data = data[:]
    # print(data)
    # ========================================================================


    table_name = "courseInfo"
    # course_info = get_info(table_name,db)
    # course_info = json.dumps(course_info)
    # with open('identity_v2.json', 'w') as outfile:
    #     json.dump(course_info, outfile)


    # ======================== write current course number====================
    # table_name = "CSCI"

    all_courses = dict()
    tables = db.queryColsData("courseInfo", ["department"])
    tables = set(tables)
    print(tables)
    for table in tables:
        table_name = table[0]
        curr_num_in_crs = get_currect_number(table_name,db)

        all_courses[table_name] = curr_num_in_crs
    with open('currentNumber.json', 'w') as outfile:
        json.dump(all_courses, outfile)




    #
    # with open('data.json', 'w') as outfile:
    #     json.dump(data, outfile)
    #
