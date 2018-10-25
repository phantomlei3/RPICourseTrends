import json
from sample import Database
import numpy as np
from sample import processData

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

def get_info(table_name):
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





if __name__ == '__main__':
    myDB = "RPICourseTrends"
    db = Database.CourseDb("Ruijie", "gengruijie123", "142.93.59.116", myDB)

    # ========================show tables in database=========================
    # data = np.array(db.show_tables(myDB) )
    # data = data[:]
    # print(data)
    # ========================================================================

    table_name = "courseInfo"
    course_info = get_info(table_name)
    # course_info = json.dumps(course_info)
    with open('identity_v2.json', 'w') as outfile:
        json.dump(course_info, outfile)




    #
    # with open('data.json', 'w') as outfile:
    #     json.dump(data, outfile)
    #
