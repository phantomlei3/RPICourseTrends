import re

def search(s, lstdept, lstCode, lstCourseName, lstProf, maxNum):
    '''
        pre: 
            sets of: dept, course code, name, professors
            user input s, which should only contain uppercase letters, digits and '-'
        post:
            a list of tuple (val, type), val references the needed course(es), type = {'code', 'name', 'prof'}

        @param s: user input
        # @param db: all data, a list of strings
        @param lstCode, lstCourseName, lstProf
        @param maxNum: maximum number of results printed
        @effect: prints results according to difference to input, most different is at the end
    '''
    REcourseCode = "[A-Z]{4}-[0-9]{0,4}"
    REdeptCode = "[A-Z]{1,4}"

    if re.match(REcourseCode, s):
        # course code
        if s in lstCode:
            return [(s, 'code')]
        else:
            ret = []
            for code in lstCode:
                if len(ret) >= maxNum:
                    break
                if re.search(s, code):
                    ret.append( (code, 'code') )
            return ret

    elif re.match(REdeptCode, s):
        if s in lstdept:
            return [(s, 'dept')]
        else:
            ret = []
            for d in lstdept:
                if len(ret) >= maxNum:
                    break
                if re.search(s, d):
                    ret.append( (d, 'dept') )
            return ret
            
    else:
        # course name or professor name
        if s in lstCourseName:
            return [(s, 'name')]
        if s in lstProf:
            return [(s, 'prof')]

        # partial search, results will be half course name & half profesor
        ret = []
        for course in lstCourseName:
            if len(ret) >= maxNum:
                break
            if re.search(s, course):
                ret.append( (course, 'name') )

        for prof in lstProf:
            if len(ret) >= 2*maxNum:
                break
            if re.search(s, prof):
                ret.append( (prof, 'prof') )
                    
        return ret
        


if __name__ == "__main__":
    # testing code
    s = input("search sth: ")
    dept = set([    "ARTS",
    "COGS",
    "COMM",
    "ECON",
    "GSAS",
    "IHSS",
    "LANG",
    "LITR",
    "PHIL",
    "PSYC",
    "STSH",
    "STSS",
    "WRIT",
    "BMED",
    "CHME",
    "CIVL",
    "ECSE",
    "ENGR",
    "ENVE",
    "EPOW",
    "ESCI",
    "ISYE",
    "MANE",
    "MTLE",
    "ASTR",
    "BCBP",
    "BIOL",
    "CHEM",
    "CSCI",
    "ERTH",
    "IENV",
    "ISCI",
    "ITWS",
    "MATH",
    "MATP",
    "PHYS",
    "ARCH",
    "MGMT",
    "ADMN",
    "LGHT",
    "USAF",
    "USAR",
    "USNA"
])
    codes = set(['CSCI-1010', 'CSCI-1100', 'CSCI-1200', 'CSCI-2100', 'CSCI-2300', 'CSCI-2500', 'CSCI-2600', 'CSCI-4210', 'CSCI-4230'])
    courses = set(['INTROTOCOMPUTERPROGRAMMING', 'COMPUTERSCIENCE1', 'DATASTRUCTURES', 'FOUNDATIONSOFCOMPUTERSCIENCE', 'INTROTOALGORITHMS', 'COMPUTERORGANIZATIONS', 'PRINCIPLESOFSOFTWARE', 'OPERATINGSYSTEMS', 'DATABASESYSTEMS'])
    professors = set(['MUSTASCH', 'TURNER', 'BUSTER', 'MALIK', 'ZAKI', 'BUSTER', 'GOLDSCHMIDT', 'JOHNSON'])
    print( search(s, dept, codes, courses, professors, 5) )

