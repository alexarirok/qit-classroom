import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import auth from './../auth/auth-helper'
import Enroll from './../enrollment/Enroll'
import { GridList, GridListTile, makeStyles, GridListTileBar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    title: {
      padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    },
    media: {
      minHeight: 400
    },
    gridList: {
      width: '100%',
      minHeight: 200,
      padding: '16px 0 0px'
    },
    tile: {
      textAlign: 'center',
      border: '1px solid #cecece',
      backgroundColor:'#04040c'
    },
    image: {
      height: '100%'
    },
    tileBar: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      textAlign: 'left'
    },
    tileTitle: {
      fontSize:'1.1em',
      marginBottom:'5px',
      color:'#fffde7',
      display:'block'
    },
    action:{
      margin: '0 10px'
    }
  }))
  
export default function Courses(props) {
    const classes = useStyles()
    const findCommon = (course) => {
        return !props.common.find((enrolled) => {return enrolled.course._id == course._id})
    }
    return (
        <GridList cellHeight={240} cols={2} className={classes.gridList}>
            {props.courses.map((course, i) => {
                return (
                  findCommon(course) && 
                    <GridListTile className={classes.tile} key={i} style={{padding:0}}>
                        <Link to={"/course/"+course._id}>
                        <img classname={classes.image} src={'/api/courses/photo/'+course._id} alt={course.name} />
                    </Link>
                    <GridListTileBar className={classes.tileBar} 
                      title={<Link to={"/course/"+course._id} className={classes.tileTitle}>
                        {course.name} 
                    </Link>}
                    subtitle={<span>{course.category}</span>}
                    actionIcon={
                      <div classname={classes.action}>
                        {auth.isAuthenticated() ? <Enroll courseId={course._id}/> : <Link to="/signin">Sign in to Enroll</Link>} 
                    </div> 
                  } />
                </GridListTile>)
            })}
        </GridList>
    )
}

Courses.propTypes = {
    courses: PropTypes.array.isRequired
}