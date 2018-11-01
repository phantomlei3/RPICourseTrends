

var departmentList = {
    "ARTS":"Arts",
    "COGS":"Cognitive Science",
    "COMM":"Communication",
    "ECON":"Economics",
    "GSAS":"Games and Simulations Arts and Sciences",
    "IHSS":"Interdisciplinary H&SS",
    "LANG":"Languages",
    "LITR":"Literature",
    "PHIL":"Philosophy",
    "PSYC":"Psychology",
    "STSH":"Science and Technology Studies - Humanities",
    "STSS":"Science and Technology Studies - Social Sciences",
    "WRIT":"Writing",
    "BMED":"Biomedical Engineering",
    "CHME":"Chemical Engineering",
    "CIVL":"Civil Engineering",
    "ECSE":"Electrical and Computer Systems Engineering",
    "ENGR":"Core Engineering",
    "ENVE":"Environmental and Energy Engineering",
    "EPOW":"Electric Power Engineering",
    "ESCI":"Engineering Science",
    "ISYE":"Industrial and Systems Engineering",
    "MANE":"Mechanical, Aerospace, and Nuclear Engineering",
    "MTLE":"Materials Science and Engineering",
    "ASTR":"Astronomy",
    "BCBP":"Biochemistry and Biophysics",
    "BIOL":"Biology",
    "CHEM":"Chemistry",
    "CSCI":"Computer Science",
    "ERTH":"Earth and Environmental Science",
    "IENV":"Interdisciplinary Environmental",
    "ISCI":"Interdisciplinary Science",
    "ITWS":"Information Technology and Web Science",
    "MATH":"Mathematics",
    "MATP":"Math Programming, Probability, and Statistics",
    "PHYS":"Physics",
    "ARCH":"Architecture",
    "MGMT":"Management",
    "ADMN":"Administrative Courses",
    "LGHT":"Lighting",
    "USAF":"Aerospace Studies (Air Force ROTC)",
    "USAR":"Military Science (Army ROTC)",
    "USNA":"Naval Science (Navy ROTC)"
};

var standardCourseName = function (courseName)
{
    return courseName.replace(/\w\S*/g, function(word)
    {
        return word.charAt(0).toUpperCase()+word.substr(1).toLowerCase();
    });

}
