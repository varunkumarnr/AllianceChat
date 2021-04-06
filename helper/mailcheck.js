// checking if the mail belongs to alliance university
// temporary

module.exports = mailChecker = (email) => {
  var i;
  if (email) {
    arr = email.split(/[.@]+/);
    for (i = 0; i < arr.length; i++) {
      if (arr[i] == "alliance") {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
};

// console.log(mailChecker("kvarun.btech18@alliance.edu.in"));
