import express from "express"
import auth from "../../client/auth/auth-helper"
import courseCtrl from '../controllers/course.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import dbErrorHandler from "../helpers/dbErrorHandler"

const router = express.Router()

router.route('/api/course/by/:userId').post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isEducator, courseCtrl.create)
router.route('/api/course/by/:userId').get(authCtrl.requireSignin, authCtrl.hasAuthorization, courseCtrl.listByInstructor)
router.param('userId', userCtrl.userByID)

router.route('/api/course/:courseId').get(courseCtrl.read)
router.param('courseId', courseCtrl.courseByID)

router.route('/api/courses/:courseId/lesson/new').put(authCtrl.requireSignin, courseCtrl.isInstructor, courseCtrl.newLesson)
router.route('/api/courses/:courseId').put(authCtrl.requireSignin, courseCtrl.isInstructor, courseCtrl.update)
router.route('/api/courses/:courseId').delete(authCtrl.requireSignin, courseCtrl.isInstructor, courseCtrl.remove)
router.route('/api/courses/published').get(courseCtrl.listPublished)

export default router