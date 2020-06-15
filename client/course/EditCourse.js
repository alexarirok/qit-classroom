import React, { useEffect } from "react";
import { read, update } from "../user/api-user";
import { CardHeader, TextField, Link } from "@material-ui/core";
import jwt from "express-jwt";

useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({courseId: match.params.courseId}, signal).then((data) => {
        if (data.error) {
            setValues({...values, error: data.error})
        }else {
            setCourse(data)
        }
    })
    return function cleanup() {
        abortController.abort()
    }
}, [match.params.courseId])

const handleChange = name => event => {
    const value = name === 'image'
    ? event.target.files[0]
    : event.target.value
    setCourse({ ...course, [name]: value })
}

const clickSubmit = () => {
    let courseData = new FormData()
    course.name && courseData.append('name', course.name)
    course.description && courseData.append('description', course.description)
    course.image && courseData('image', course.image)
    course.category && courseData.append('category', course.category)
    courseData.append('lessons', JSON.stringify(course.lessons))
    update({
        courseId: match.params.courseId
    }, {
        t: jwt.token
    }, courseData).then((data) => {
        if (data && data.error) {
            console.log(data.error)
            setValues({...values, error: data.error})
        } else {
            setValues({...values, redirect: true})
        }
    })
}

const handleLessonChange = (name, index) => event => {
    const lessons = course.lessons
    lessons[index][name] = event.target.value
    setCourse({...course, lessons: lessons })
}

const moveUp = index => event => {
    const lessons = course.lessons
    const moveUp = lessons[index]
    lessons[index] = lessons[index-1]
    lessons[index-1] = moveUp
    setCourse({...course, lessons: lessons})
}

const deleteLesson = index => event => {
    const lessons = course.lessons
    lessons.splice(index, 1)
    setCourse({...course, lessons:lessons})
}

return (
    <div className={classes.root}>
          <Card className={classes.card}>
            <CardHeader
              title={<TextField
                margin="dense"
                label="Title"
                type="text"
                fullWidth
                value={course.name} onChange={handleChange('name')}
              />}
              subheader={<div>
                    <Link to={"/user/"+course.instructor._id} className={classes.sub}>By {course.instructor.name}</Link>
                    {<TextField
                margin="dense"
                label="Category"
                type="text"
                fullWidth
                value={course.category} onChange={handleChange('category')}
              />}
                  </div>
                }
              action={
         auth.isAuthenticated().user && auth.isAuthenticated().user._id == course.instructor._id &&
            (<span className={classes.action}><Button variant="contained" color="secondary" onClick={clickSubmit}>Save</Button>
                </span>)
        }
            />
            <div className={classes.flex}>
              <CardMedia
                className={classes.media}
                image={imageUrl}
                title={course.name}
              />
              <div className={classes.details}>
              <TextField
                margin="dense"
                multiline
                rows="5"
                label="Description"
                type="text"
                className={classes.textfield}
                value={course.description} onChange={handleChange('description')}
              /><br/><br/>
              <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
             <label htmlFor="icon-button-file">
                <Button variant="outlined" color="secondary" component="span">
                Change Photo
                <FileUpload/>
                </Button>
            </label> <span className={classes.filename}>{course.image ? course.image.name : ''}</span><br/>
              </div>
            

      </div>
            <Divider/>
            <div>
            <CardHeader
              title={<Typography variant="h6" className={classes.subheading}>Lessons - Edit and Rearrange</Typography>
            }
              subheader={<Typography variant="body1" className={classes.subheading}>{course.lessons && course.lessons.length} lessons</Typography>}
            />
            <List>
            {course.lessons && course.lessons.map((lesson, index) => {
                return(<span key={index}>
                <ListItem className={classes.list}>
                <ListItemAvatar>
                    <>
                    <Avatar>
                    {index+1}
                    </Avatar>
                 { index != 0 &&     
                  <IconButton aria-label="up" color="primary" onClick={moveUp(index)} className={classes.upArrow}>
                    <ArrowUp />
                  </IconButton>
                 }
                </>
                </ListItemAvatar>
                <ListItemText
                    primary={<><TextField
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={lesson.title} onChange={handleLessonChange('title', index)}
                      /><br/>
                      <TextField
                      margin="dense"
                      multiline
                      rows="5"
                      label="Content"
                      type="text"
                      fullWidth
                      value={lesson.content} onChange={handleLessonChange('content', index)}
                    /><br/>
                    <TextField
                        margin="dense"
                        label="Resource link"
                        type="text"
                        fullWidth
                        value={lesson.resource_url} onChange={handleLessonChange('resource_url', index)}
                    /><br/></>}/>
                    {!course.published && <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="up" color="primary" onClick={deleteLesson(index)}>
                        <DeleteIcon />
                    </IconButton>
                    </ListItemSecondaryAction>}
                </ListItem>
                <Divider style={{backgroundColor:'rgb(106, 106, 106)'}} component="li" />
                </span>)
            }
            )}
            </List>
            </div>
          </Card>
    </div>)