import dbErrorHandler from "../helpers/dbErrorHandler"
import Course from '../models/course.model'
import fs from 'fs'
import formidable from 'formidable'
import backgroundImage from './../../client/assets/images/background.jpeg'


const create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true 
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let course = new Course(fields)
        course.instructor=req.profile
        if(files.image) {
            course.image.data = fs.readFileSync(files.image.path)
            course.image.contentType = files.image.type 
        }
        try {
            let result = await course.save()
            res.json(result)
        }catch (err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
    })
}

const photo = (req, res, next) => {
    if(req.course.image.data){
        res.set("Content-Type", req.course.image.contenetType)
        return res.send(req.course.image.data)
    }
    next()
}
const defaultPhoto = (req, res) => {
    return res.sendFile(proces.cwd()+backgroundImage)
}

export default { create, photo, defaultPhoto }