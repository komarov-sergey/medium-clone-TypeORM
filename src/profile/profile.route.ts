import Router from 'koa-router'

import auth from '../middleware/auth'

import * as controller from './profile.controller'

export default new Router()
  .get('/:username', controller.getProfile)
  .post('/:username/follow', controller.followUser)
  .delete('/:username/follow', auth, controller.unfollowUser)
