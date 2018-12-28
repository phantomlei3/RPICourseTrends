import urllib
from urllib import request
from html.parser import HTMLParser
from bs4 import BeautifulSoup
from datetime import  datetime
import numpy as np
from sample import Database
import mysql

class Course(object):

    def __init__(self, data):
        self.CRN = data[0]
        self.SubjCrse = data[1]
        self.Subject = self.SubjCrse[0:4]
        self.Crse = self.SubjCrse[4:]
        self.Title = data[2]
        self.Type = data[3]
        self.Cred = data[4]
        self.GrTp = data[5]
        self.Days = data[6]
        self.StartTime = data[7]
        self.EndTime = data[8]
        self.Instructor = data[9]
        self.Location = data[10]
        self.Cap = int(data[11])
        self.Act = int(data[12])
        self.Rem = int(data[13])


    # Convert to json object
    # jobObject: dictionary
    def toJson(self):
        jobObject = dict()
        jobObject["Course"] = self.Crse
        jobObject["Title"] = self.Title
        jobObject["Section Actual"] = self.Act
        jobObject["Section Remaining"] = self.Rem
        jobObject["Instructor"] = self.Instructor
        return(jobObject)

    # for get the key of course which is course number and professor
    # return: string of course number and professor
    def getKey(self):
        return self.SubjCrse + "/" + self.Instructor

    def getSubject(self):
        return self.Subject

    def getActual(self):
        return self.Act

    def getProf(self):
        return self.Instructor


    def getCourse(self):
        return self.Crse

    def getSubjCrse(self):
        return self.SubjCrse

    # return the information of course include key, course_name, professor_name
    # deparment, crouse code, max capacity, semester time.
    def getInfo(self, year):
        result = [
            self.SubjCrse+year+self.Instructor,
            self.Title,
            self.Subject,
            self.Crse,
            self.Instructor,
            self.Cap,
            year,
            "",
            ""
        ]
        return result

    def __str__(self):
        return "actual:{}".format(self.Act)

    def __repr__(self):
        # return "actual:{}".format(self.Act)
        return "{}".format(self.Act)


    def __add__(self, other):
        self.Cap += other.Cap
        self.Rem += other.Rem
        self.Act += other.Act
        data = [self.CRN, self.SubjCrse, self.Title, self.Type, self.Cred, self.GrTp, self.Days,
                self.StartTime, self.EndTime, self.Instructor, self.Location, self.Cap, self.Act, self.Rem,
               ]
        return Course(data)


    # for debug
    def getDescription(self):
        print(self.jobDescription)

# class MyHTMLParser(HTMLParser):
#     def handle_starttag(self, tag, attrs):
#         print("Encountered a start tag:", tag)
#
#     def handle_endtag(self, tag):
#         print("Encountered an end tag :", tag)
#
#     def handle_data(self, data):
#         print("Encountered some data  :", data)


def processHtml(rawElement):
    data = []
    print(rawElement)
    for index in range(len(rawElement)):
        text = rawElement[index].get_text().strip()
        # data.append(text)
        if index == 0 and text != " " and text != "":
            temp = text.split(" ")
            data.append(temp[0])
            data.append(temp[1].split("-")[0] + temp[1].split("-")[1])
            oldDepartment = temp[1].split("-")[0]
            tempDepartment = oldDepartment
        else:
            data.append(text)

        # handle the Note row in website
        if index == 3 and "NOTE:" in data[1]:
            return None

    if data[0] == "" and data[8] == "staff":
        return None
    return Course(data)


def createCourseInfoTable():
    myDB = "RPICourseTrends"
    db = Database.CourseDb("Ruijie", "gengruijie123", "142.93.59.116", myDB)
    table_name = "courseInfo"
    element = [
        ["id", "varchar(35)"],
        ["courseName", "varchar(35)"],
        ["department", "varchar(5)"],
        ["courseCode", "varchar(10)"],
        ["professor", "varchar(35)"],
        ["max", "int"],
        ["time", "varchar(5)"],
        ["comment1", "varchar(30)"]
    ]
    key = "id"
    db.create_tables( table_name, element, key)


def storeCourseInfoTable(courses, db,table,year):
    storeValue = []
    for key, value in sorted(courses.items()):
        storeValue.append(key[:14])
        storeValue = value.getInfo(year)
        db.insert_data(storeValue, table)



def get_professor(db, url, createIdentity=False):
    localFile, headers = urllib.request.urlretrieve(url)
    html = open(localFile)
    soup = BeautifulSoup(html, 'lxml')
    # print(soup.get_text)
    # f = open("test1.txt","w")
    # for element in soup.find_all("td"):
    #     # text = element.get_text().strip()
    #     print(element)
    #     f.write(element.get_text())
    # f.close()

    data = []
    courses = dict()
    professor = dict()
    department = dict()
    courseInOneDepartment = dict()
    count = 0
    keyCount = 0
    # elements = soup.find_all("td")
    # elements = np.array(elements).reshape((int(len(elements)/14),14))
    # for index in range(len(elements)):
    #     course = processHtml(elements[index])
    #     if course == None:
    #         continue
    #     if course.getProf() == "staff":
    #         index += 1
    #         course2 = processHtml(elements[index])
    #     # print(element)

    temp_course = []
    incompleteData = []
    for element in soup.find_all("td"):
        text = element.get_text().strip()
        # print(element)
        if count == 0 and text != " " and text != "":
            temp = text.split(" ")
            data.append(temp[0])
            data.append(temp[1].split("-")[0] + temp[1].split("-")[1])
            oldDepartment = temp[1].split("-")[0]
            tempDepartment = oldDepartment
        else:
            data.append(text)
        count += 1

        if count == 3 and "NOTE:" in data[1]:
            count = 0
            data.clear()
            continue

        if count == 14:
            if data[9] == "Pacheco":
                pass
                print()
            if data[0] == "" and (data[8] == "Staff" or incompleteData == []):
                count = 0
                data.clear()
                continue
            elif data[0] != "" and data[9] == "Staff":
                count = 0
                incompleteData = data[:]
                data.clear()
                continue
            if incompleteData != [] and data[8] != "Staff" and data[0] == "":
                if incompleteData[9] == data[8]:
                    incompleteData = []
                    count = 0
                    data.clear()
                    continue
                incompleteData[9] = data[8]
                data = incompleteData[:]
                incompleteData = []
            course = Course(data)
            subject = course.getSubject()
            courseAndProf = course.getCourse() + course.getProf()
            if subject in department:
                if courseAndProf in department[subject]:
                    totalNumber =  department[subject][courseAndProf] + course.getActual()
                    department[subject][courseAndProf] = totalNumber
                else:
                    department[subject][courseAndProf] = course.getActual()
            else:
                department[subject] = dict()
                department[subject][courseAndProf] = course.getActual()

            professor[course.getKey()] = keyCount
            keyCount += 1
            # key is course number and professor
            if course.getKey() in courses:
                courses[course.getKey()] = courses[course.getKey()] + course
            else:
                courses[course.getKey()] = course

            data.clear()
            count = 0
    professor = []
    if createIdentity == True:
        db.drop_table()
        createCourseInfoTable()
        storeCourseInfoTable(courses, db)
    for key, value in sorted(courses.items()):
        professor.append(key)
        # print(key)
    # courses.clear()
    data.clear()
    count = 0

    return department, courses


if __name__ == '__main__':
    myDB = "RPICourseTrends2"
    db = Database.CourseDb("Ruijie", "12345678", "142.93.59.116", myDB)

    # table_name = "courseInfo"
    # db.setTable(table_name)
    # # db.drop_table(table_name)
    # get_professor(db, True)


