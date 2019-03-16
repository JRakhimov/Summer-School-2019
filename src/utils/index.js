const axios = require('axios');

/**
 * @param {String} toHash - String to hash
 */
const genHash = toHash => {
  let keyString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str1 = '(!@$%%^&&^@)(*&^^&';
  let str2 = '*&^%#@$%%^$#)(**&*&';
  let str3 = ')(*&^%$%^&*((())=+';
  let str4 = '&*^^*&*&(*(!+)((&&^&^*%^*';
  let publickey = 'BCcd^%$%^&*(opqr%^$#)(*stuefgD^OPQRc^%$%^&*(opqrstudefgSTUV&^*EFGH@$%%ghij1234';
  let rand_no = Math.floor(Math.random() * 10);

  function KeyInEncode(string) {
    string = string.replace(/\x0d\x0a/g, '\x0a');
    var output = '';
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        output += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        output += String.fromCharCode((c >> 6) | 192);
        output += String.fromCharCode((c & 63) | 128);
      } else {
        output += String.fromCharCode((c >> 12) | 224);
        output += String.fromCharCode(((c >> 6) & 63) | 128);
        output += String.fromCharCode((c & 63) | 128);
      }
    }
    return output;
  }

  function SessionInhaE(input) {
    var output = '';
    var output2 = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    var keychain = '';
    var j = 0;
    while (j < 3) {
      rand_no = Math.floor(Math.random() * 10) + '';
      keychain = keychain + publickey.substring(rand_no, rand_no + j) + rand_no;
      j++;
    }
    keychain = keychain + '/';
    input = KeyInEncode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output =
        output +
        str1.substring(9, 11) +
        keyString.charAt(enc1) +
        str3.substring(16, 18) +
        keyString.charAt(enc2) +
        keyString.charAt(enc3) +
        keyString.charAt(enc4) +
        str2.substring(10, 12);
    }
    return keychain + str3.substring(16, 18) + output + str4.substring(11, 13);
  }

  return SessionInhaE(toHash);
};

const formDataGen = x => Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '');

const parseAuthData = data => {
  const res = {};

  data = data.slice(data.indexOf('[') + 2, data.indexOf(']') - 1).replace(/\s\s/g, ' ');

  const properties = data.split(', ');
  properties.forEach(property => {
    let [key, value] = property.split(':');
    value = value.replace(/\'/g, '');
    res[key] = value;
  });

  if (res.name) {
    res.name = formatName(res.name);
  }

  return res;
};

/**
 * @param {String} fullName - Fullname (JAVOKHIR RAKHIMOV) to format -> "Javokhir Rakhimov"
 */
const formatName = fullName => {
  let [lastName, firstName] = fullName.split(' ', 2);

  lastName = lastName.substr(0, 1) + lastName.substr(1).toLowerCase();
  firstName = firstName.substr(0, 1) + firstName.substr(1).toLowerCase();

  return `${lastName} ${firstName}`;
};

const authViaEClass = (userID, password) => {
  return axios({
    method: 'post',
    url: 'http://eclass.inha.uz/jsp/include/ajax.login.jsp',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formDataGen({
      p_userid: genHash(userID),
      p_passwd: genHash(password)
    })
  })
    .then(({ data }) => {
      const { userid: userID, name: fullName } = parseAuthData(data);
      if (userID && fullName) return { status: true, userID, fullName };
      else return { status: false };
    })
    .catch(err => err);
};

module.exports = {
  genHash,
  formDataGen,
  parseAuthData,
  formatName,
  authViaEClass
};
