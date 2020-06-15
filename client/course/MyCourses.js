import React, { useState, useEffect } from "react"
import auth from "../auth/auth-helper"
import { Link } from "react-router-dom"
import { ListItem, ListItemAvatar, Avatar, Divider } from "@material-ui/core"

export default function MyCourses() {
    const [courses, setCourses] = useState([])
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortControlleer = new AbortController()
        const signal = abortControlleer.signal
        listByInstructor({
            userId: jwt.user._id
        }, {t: jwt.token}, signal).then((data) => {
            if (data.error) {
                setRedirectToSignin(true)
            }else {
                setCourses(data)
            }
        })
        return function cleanup () {
            abortControlleer.abort()
        }
    }, [])
    if (redirectToSignin) {
        return <Redirect to='/signin'/>
    }

    { courses.map((course, i) => {
        return <Link to={"/teach/course/"+course._id} key={i}>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar src={'/api/courses/photo/'+course._id+"?" + new Date().getTime()} />
                </ListItemAvatar>
                <ListItemText primary={course.name} secondary={course.description}/>
            </ListItem>
            <Divider/>
        </Link>
    })}
}