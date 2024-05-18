import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment';
import config from './Config.json'
var API_BASE_URL = config.API_BASE_URL;

export default function BlogPost() {
    const {id} = useParams();
    const [blogName, setBlogName] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogPublished, setBlogPublished] = useState("");
    const [blogImg, setBlogImg] = useState(null);
    const [isBlog, setIsBlog] = useState(false);
    
    const fetchBlog = () => {
        fetch(API_BASE_URL+'/api/blogs/'+id+'?populate=*',{
            method : 'GET'
        })
        .then(response => response.json())
        .then((res) => {
            if(res.data){
                setIsBlog(true);
                let blogData = res.data.attributes;
                // console.log(blogData);
                setBlogName(blogData.name);
                setBlogDescription(blogData.description);

                const formattedDate = moment(blogData.publishedAt).format('MMMM Do YYYY, h:mm:ss a');
                // setBlogPublished(blogData.publishedAt);
                setBlogPublished(formattedDate);

                var imageURL = null;
                if(blogData.image.data && blogData.image.data !== null){
                    imageURL = blogData.image.data.attributes.url;
                }
                setBlogImg(imageURL);
            }
        })
        .catch((error) => {
            console.log(error);
            setIsBlog(false);
        });
    }

    useEffect(() => {
        fetchBlog();
    }, [])

    return (
        <>
            {isBlog ? (
                <div className="card mb-3">
                    <img src={`http://localhost:1337${blogImg}`} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{blogName}</h5>
                        <p className="card-text"><small className="text-body-secondary"><strong>Published:</strong> {blogPublished}</small></p>
                        <p className="card-text">{blogDescription}</p>         
                    </div>
                </div>
            ) : ('No blog post available.')}
        </>
    )
}
