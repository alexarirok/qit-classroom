import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import class1Img from './../assets/images/class1.jpeg'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a':{
      color: '#5472C0'
    } 
  }
}))

export default function Home(){
  const classes = useStyles()
    return (
        <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            Home Page
          </Typography>
          <CardMedia className={classes.media} image={class1Img} title="classroom"/>
          <Typography variant="body2" component="p" className={classes.credit} color="textSecondary">Photo by <a href="https://unsplash.com/@boudewijn_huysmans" target="_blank" rel="noopener noreferrer">Uknown</a> on Pexels</Typography>
          <CardContent>
            <Typography variant="body1" component="p">
              Welcome to the qit classroom home page.
            </Typography>
          </CardContent>
        </Card>
    )
}

