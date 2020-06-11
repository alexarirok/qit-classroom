import express from "express"
import auth from "../../client/auth/auth-helper"
import courseCtrl from '../controllers/course.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()


router.route('/api/course/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isEducator, courseCtrl.create)



export default router