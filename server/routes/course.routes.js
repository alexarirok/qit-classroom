import express from 'express'
import courseCtrl from '../controllers/course.controller'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/courses/by/:userId').post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isEducator, courseCtrl.create)
router.route('/api/courses/by/:userId').get(authCtrl.requireSignin, authCtrl.hasAuthorization, courseCtrl.listByInstructor)
router.route('/api/courses/:courseId').put(authCtrl.requireSignin, courseCtrl.isInstructor, courseCtrl.update)
router.route('/api/course/:courseId').get(courseCtrl.read)
router.route('/api/courses/:courseId').delete(authCtrl.requireSignin, courseCtrl.isInstructor, courseCtrl.remove)
router.route('/api/courses/:courseId').get(courseCtrl.photo, courseCtrl.defaultPhoto)
router.route('/api/courses/defaultPhoto').get(courseCtrl.defaultPhoto)
router.route('/api/courses/:courseId/lesson/new').put(authCtrl.requireSignin, courseCtrl.isInstructor, courseCtrl.newLesson)
router.route('/api/courses/published').get(courseCtrl.listPublished)
router.param('userId', userCtrl.userByID)
router.param('courseId', courseCtrl.courseByID)

export default router