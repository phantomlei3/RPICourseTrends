from flask import Flask
from flask import render_template
from flask import jsonify, request
import json
from sqlalchemy import *
from sqlalchemy.orm import sessionmaker

app = Flask(__name__)

# mysql://root:971203@localhost:3306/coursedata

db = create_engine('mysql://Ruijie:12345678@142.93.59.116:3306/RPICourseTrends2', echo=False)
conn = db.connect()
metadata = MetaData(db)


#
# require department(Table Name) and course_PID(attribute name) in the database
# return everyday number of the student for this class for specific semester if found
# TODO: Exception handling: Cannot find table or course_PID
#

def get_course_data(course_PID):
    department = course_PID[0:4] + "S19"
    table = Table(department, metadata, autoload=True)
    course_data = dict()

    # use select command to find the designated table
    s = select([table])
    result = conn.execute(s)

    # find the result with the specific course_PID
    for row in result:
        course_data[str(row['time'].date())] = row[course_PID]

    # Transaction ends
    result.close()

    return json.dumps(course_data)


#
# process through the courseInfo Table to return a list of class options
#

def get_course_info(department):
    courseSession = sessionmaker(bind=db)
    session = courseSession()
    courseinfo = Table("courseInfo", metadata, autoload=True)

    # query: max >= 0
    query = session.query(courseinfo).filter((courseinfo.c.max != 0))
    # query: No Master course
    query = query.filter(~courseinfo.c.courseName.like("%MASTER%"))
    # query: No PHD course: DISSERTATION
    query = query.filter(~courseinfo.c.courseName.like("%DISSERTATION%"))
    # TODO: Group course with the same name 4000level with 6000 level

    # query testing
    query = query.filter(courseinfo.c.department.like("%"+department.upper()+"%"))

    # JSON Structure:
    # courseID: {
    # courseName:
    # sessions: [(professorName, max), (professorName, max)]
    # }

    # row[3]: department
    # row[4]: course code
    # row[3]+row[4]: courseID
    # row[2]: courseName
    # row[5]: professor name
    # row[6]: max

    courseinfo_data = dict()

    # create the JSON Structure
    for row in query:
        courseID = row[3] + row[4]
        # add up new courses
        if courseID not in courseinfo_data:
            courseinfo_data[courseID] = dict()
            courseinfo_data[courseID]["courseName"] = row[2]
            courseinfo_data[courseID]["department"] = row[3]
            courseinfo_data[courseID]["courseCode"] = row[4]
            courseinfo_data[courseID]["sessions"] = list()

        # add up new professor session with existed courses
        course_session = dict()
        course_session["professor"] = row[5]
        course_session["max"] = row[6]
        courseinfo_data[courseID]["sessions"].append(course_session)

    # Transaction ends
    session.close()

    return json.dumps(courseinfo_data)


#
# Use post request for search function
#
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/coursePage')
def coursePage():
    apartment = request.args.get('search')
    courseInfo = get_course_info(apartment)
    return render_template('coursePage.html', courseInfo=courseInfo)

@app.route('/chartPage')
def chartPage():
    coursePID = request.args.get("coursePID")
    courseName = request.args.get("courseName")
    courseData = get_course_data(coursePID)


    return render_template('chartPage.html', courseData=courseData, courseName = courseName)



if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True)