import auth from "../../client/auth/auth-helper";
import express from 'express'
import enrollmentCtrl from '../controllers/enrollment.controller'
import courseCtrl from '../controllers/course.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/enrollment/new/:courseId').get(authCtrl.requireSignin, enrollmentCtrl.findEnrollment, enrollmentCtrl.create)
router.param('courseId', courseCtrl.courseByID)

router.route('/api/enrollment/:enrollmentId').get(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.read)
router.param('enrollmentId', enrollmentCtrl.enrollmentID)

router.route('/api/enrollment/complete/:enrollmentId').put(authCtrl.requireSignin, enrollmentCtrl.isStudent, enrollmentCtrl.complete)

router.route('/api/enrollment/enrolled').get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)

router.route('/api/enrollment/stats/:courseId').get(enrollmentCtrl.enrollmentStats)

export default router 