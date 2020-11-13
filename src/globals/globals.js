
var globalsVariable = {
  languages: [],
  loggedIn: false,
  roles: [{ id: 1, name: "OWNER" }, { id: 2, name: "ADMIN" }],
  commonRegex: {
    number: /^[0-9]*$/,
    email: '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    phoneNumberWithPlus: /^\+?[0-9]+$/,
    onlyEnglishChars: /^[A-Za-z][A-Za-z0-9]*$/,
    phoneNumberStartWith05: '^((05))[0-9]{8}$',
    mobileNumberAtChallengeQuestions: '^(05)[0-9]{8}|(9665)[0-9]{8}|[0-9]{10}$',
    min2Chars: '^[a-zA-Z, |0-9]{2,}$',
    isRequired: '(^$)|(\s+$)'
  }
};


export const setLang = lang => {
  globalsVariable["currentLang"] = lang;
};

export const getlang = () => {
  return globalsVariable["currentLang"];
};

export const setVariable = (key, value) => {
  globalsVariable[key] = value;
};

export const getVariable = key => {
  return globalsVariable[key];
};


export const setLoggedIn = _loggedIn => {
  localStorage.setItem('loggedIn', _loggedIn.toString());
  globalsVariable["loggedIn"] = _loggedIn;
};

export const getLoggedIn = async () => {
  let res = await localStorage.getItem('loggedIn');
  return res
};


export const displayToast = (errMsg, success = false) => {
  var errDiv = document.getElementById("errorDiv");
  errDiv.style.display = "block";
  if (success) {
    errDiv.style.backgroundColor = "#4d9a60";
    errDiv.style.color = "#155724";
  }
  document.getElementById("errorTxt").innerText = errMsg;
  setTimeout(() => {
    errDiv.style.display = "none";
  }, 3000);
};


