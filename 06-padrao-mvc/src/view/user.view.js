const arrayToJson = (users) => {
  return users.map((user) => {
    return toJson(user)
  })
}

const maskWithAsterisks = (value, charsToIgnore, positionsToIgnore) => {
  let asterisks = ''

  for (let i = 0; i < value.length; i++) {
    if (charsToIgnore?.includes(value[i]) || positionsToIgnore?.includes(i)) {
      asterisks += value[i]
    } else {
      asterisks += '*'
    }
  }

  return asterisks
}

const toJson = (user) => {
  const email = maskWithAsterisks(
    user.email,
    ['@', '.'],
    [0, user.email?.length - 1]
  )

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