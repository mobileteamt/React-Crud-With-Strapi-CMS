import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import moment from 'moment';
import config from './Config.json'
var API_BASE_URL = config.API_BASE_URL;

export default function Blog() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const filters = "filters[published]=yes"; //&filters[name]=Latest
    const filtersEncode = encodeURI(filters);
    const apiURL = API_BASE_URL+"/api/blogs?"+filtersEncode+"&populate=*";
    
    let blogs = () => {
        axios.get(apiURL)
        .then(function (response) {
            // console.log(response.data);
            setData(response.data.data);
            setIsLoading(false);
        })
        .catch(function (error) {
            setData([]);
            setIsLoading(false);
        })
        .finally(function () {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        setIsLoading(true);
        blogs();
    }, [])

    return (
        <>
            {isLoading ? <Loader/> : null}
            <h3 className="pb-3">Blog</h3>
            <div className="g-4">

                <div className="row row-cols-1 row-cols-sm-1 row-cols-lg-3 g-4">
                    
                    {data && data.length > 0 ?
                        data.map((item, index) => {
                            let blog = item.attributes;
                            // console.log(blog);
                            var imageURL = null;
                            if(blog.image.data && blog.image.data !== null){
                                imageURL = blog.image.data.attributes.url;
                            }
                            let formattedDate = moment(blog.publishedAt).format('MMMM Do YYYY');
                            return (
                                <div className="col" key={index}>
                                    <div className="card h-100">
                                        <div className="blog-img-wrap">
                                            {imageURL !== null ? <img className="img-thumb" src={API_BASE_URL+imageURL}/> : <img className="img-thumb" src="/assets/img/no-image.jpg"/> }
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title mb-2"><a className="text-decoration-none text-dark" href={`/blog/post/${item.id}`}>{blog.name}</a></h5>
                                            <div className="card-text mb-3"><strong>Published At: </strong>{formattedDate}</div>
                                            <div className="card-text"><a type="button" href={`/blog/post/${item.id}`} className="btn btn-success btn-sm" target="_blank">View More</a></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                     : <div>No Blog found.</div>}
                </div>
            </div>
        </>
    )
}
