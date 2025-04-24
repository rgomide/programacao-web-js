const arrayToJson = (users) => {
  return users.map((user) => {
    return toJson(user)
  })
}

const toJson = (user) => {
  let email = ''

  let utilizarAsterisco = true
  
  for (let i = 0; i < user.email.length; i++) {
    if (utilizarAsterisco) {
      email += '*'
      if (user.email[i] == '@') {
        utilizarAsterisco = false
      }
    } else {
      email += user.email[i]
    }
  }

  const userView = {
    id: user.id,
    username: user.username,
    email: email
  }

  return userView
}

module.exports = {
  arrayToJson
}