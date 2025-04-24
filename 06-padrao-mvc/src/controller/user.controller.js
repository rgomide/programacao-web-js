const router = require('express').Router()
const userModel = require('../model/user.model')
const userView = require('../view/user.view')

router.get('/users', async (request, response) => {
  const users = await userModel.findAll()
  const usersVO = userView.arrayToJson(users)

  response.json(usersVO)
})

module.exports = router
