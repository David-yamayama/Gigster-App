function checkBody(body, keys) {
  let isValid = true;

  for (const field of keys) {
    if (!body[field] || body[field] === "") {
      console.log("FIELD MANQUANTS ===> ", field);
      isValid = false;
    }
  }

  return isValid;
}

module.exports = { checkBody };
