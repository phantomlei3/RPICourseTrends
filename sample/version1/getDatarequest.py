import urllib
from urllib import request
from html.parser import HTMLParser
from bs4 import BeautifulSoup
import lxml
from datetime import  datetime

class Course(object):

    def __init__(self, data):


        self.CRN = data[0]
        self.SubjCrse = data[1]
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
        return self.SubjCrse + "/" + self.Instructor[0]

    def getActual(self):
        return self.Act

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

class MyHTMLParser(HTMLParser):
    def handle_starttag(self, tag, attrs):
        print("Encountered a start tag:", tag)

    def handle_endtag(self, tag):
        print("Encountered an end tag :", tag)

    def handle_data(self, data):
        print("Encountered some data  :", data)

if __name__ == '__main__':
    localFile, headers = urllib.request.urlretrieve('https://sis.rpi.edu/reg/zs201809.htm')
    html = open(localFile)
    soup = BeautifulSoup(html, 'html.parser')

    data = []
    courses = dict()
    count = 0

    currentDepartment = ""
    oldDepartment = ""
    tempDepartment = ""
    f = open('/Users/gengruijie/Desktop/data123123.txt', 'a')
    f.write(str(datetime.now())+"\n")
    f.close()

    for element in soup.find_all("td"):
        print(element.get_text())
        text = element.get_text().strip()
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

        if currentDepartment != oldDepartment and oldDepartment != "":
            f = open('/Users/gengruijie/Desktop/data123123.txt', 'a')
            print("write file")
            for key in sorted(courses):
                f.write("{}:{}, ".format(key, courses[key].getActual()))
            f.close()
            courses.clear()
        currentDepartment = tempDepartment

        if count == 14:
            if data[0] == "":
                count = 0
                data.clear()
                continue
            course = Course(data)
            # key is course number and professor
            if course.getKey() in courses:
                courses[course.getKey()] = courses[course.getKey()] + course
            else:
                courses[course.getKey()] = course

            print(courses)

            data.clear()
            count = 0

    f = open('/Users/gengruijie/Desktop/data.txt', 'a')
    print("write file")
    # f.write(str(datetime.now()) + "  ")
    for key in sorted(courses):
        f.write("{}:{}, ".format(key, courses[key].getActual()))
    f.write("\n")
    f.close()
    courses.clear()
    data.clear()
    count = 0

    print(datetime.now(), " Finish!!")

