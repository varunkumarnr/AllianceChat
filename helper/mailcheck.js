// checking if the mail belongs to alliance university
// temporary

const mailChecker = (email) => {
  if (email) {
    arr = email.split(/[.@]+/);
    console.log(arr);
    for (i = 0; i < arr.length; i++) {
      console.log(arr[i]);
      if (arr[i] == "alliance") {
        return true;
      }
      return false;
    }
  } else {
    return false;
  }
};

console.log(mailChecker("kvarun.btech18@alliance.edu.in"));
