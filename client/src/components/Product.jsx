import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom'


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 250,
    },
});

const Product = ({ product }) => {
    const classes = useStyles();
    const turncateStr = (str) => {
        return str.length > 100 ? str.substring(0, 100) + "..." : str;

    }

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={product.image}
                title={product.name}
            />

            <CardContent>
                <Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'inherit'}} >
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.name}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                        {turncateStr(product.description)}
                    </Typography>
                    <Rating size="small" value={product.rating} readOnly precision={0.5} />

                    <Typography gutterBottom variant="body2" color="textSecondary" component="p" >
                        {product.numReviews} reviews
                    </Typography>
                    <Typography variant="h5" component="p">
                        ${product.price}
                    </Typography>
                </Link>
            </CardContent>
        </Card>
    );
}

export default Product