import mysql.connector
from search import search

db = mysql.connector.connect(
  host="142.93.59.116",
  user="Ruijie",
  passwd="12345678",
  database="RPICourseTrends2"
)



'''
1 - (profName) -> all courses taught by this prof. 
    format: 
    # JSON Structure:
    # courseID: {
    # courseName:
    # sessions: [(professorName, max), (professorName, max)]
    # }
    
TODO: helper functions for search(), rcurn a python set of needed info


'''
def GetCourseData():
    depts = set()
    codes = set()
    names = set()
    profs = set()
    
    cursor = db.cursor()
    cursor.execute("SELECT department FROM courseInfo;")
    rc = cursor.fetchall()
    for x in rc:
        depts.add(x[0])
    
    cursor.execute("SELECT department, courseCode FROM courseInfo;")
    rc = cursor.fetchall()
    for x in rc:
        codes.add(x[0] + '-' + x[1])
    
    cursor.execute("SELECT courseName FROM courseInfo;")
    rc = cursor.fetchall()
    for x in rc:
        names.add(x[0])
    
    cursor.execute("SELECT professor FROM courseInfo;")
    rc = cursor.fetchall()
    for x in rc:
        profs.add(x[0])
    
    return (depts, codes, names, profs)
    
bulkInfo = GetCourseData()

'''

presentation:
    - overview: Lei...
    - alex: **search** how this ambiguous search works (~1min) + demo ( <= 2min)

'''

if __name__ == "__main__":
    testStr = input("input sth, pretend this is the search bar ==> ")
    print( search(testStr.rstrip(), bulkInfo[0],bulkInfo[1],bulkInfo[2],bulkInfo[3], 5) )