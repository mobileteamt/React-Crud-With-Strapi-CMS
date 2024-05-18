import React, { useEffect, useState } from 'react'
import Auth from './Auth'
import { Table } from 'react-bootstrap'
import axios from 'axios';
import Loader from '../Loader';
import config from '../Config.json';
import Swal from 'sweetalert2'
var API_BASE_URL = config.API_BASE_URL;

export default function BlogList() {

    const [data, setData] = useState([]);
    // const [currentDate, setCurrentDate] = useState(GetDate());
    const [isLoading, setIsLoading] = useState(false);

    const filters = "filters[published]=yes";

    let blogs = () => {
        axios.get(`${API_BASE_URL}/api/blogs?populate=*`)
        .then(function (response) {
            // handle success
            // console.log(response.data);
            // console.log(response.data.blogImage);
            setData(response.data.data);
            setIsLoading(false);
        })
        .catch(function (error) {
            // handle error
            // console.log(error);
            setData([]);
            setIsLoading(false);
        })
        .finally(function () {
            // always executed
            setIsLoading(false);
        });
    }

    useEffect(() => {
        setIsLoading(true);
        blogs();
    }, [])

    const deleteBlog = (e, id) => {
        e.preventDefault();

        Swal.fire({
            text: "Are you really want to delete this blog?",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#878787",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`${API_BASE_URL}/api/blogs/`+id,{
                    method: 'DELETE',
                    headers: {'content-type':'application/json'},
                })
                .then(response => response.json())
                .then((res) => {
                   if(res){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Blog deleted successfully.",
                            icon: "success"
                        });
                        blogs();
                    }
                    else{
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong!",
                            icon: "error"
                        });
                    }    
                })
                .catch(error => console.error('Error:', error))
            }
        });
    }
    
    if(Auth()){
        return (
            <>
                {isLoading ? <Loader/> : null}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>BlogList</h4>
                    <a type="button" href="/admin/add-blog" className="btn btn-success">Add Blog</a>
                </div>
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Blog Name</th>
                            <th>Published</th>
                            <th>Created On</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length ? (
                            data.map((item, index) => {
                                let blog = item.attributes;
                                // let imageURL = blog.image.data.attributes.formats.thumbnail.url;
                                // console.log(blog);
                                var imageURL = null;
                                if(blog.image.data && blog.image.data !== null){
                                    imageURL = blog.image.data.attributes.formats.thumbnail.url;
                                }
                                
                                return (
                                    <tr key={index}>
                                        <td>
                                            <div className="img-wrap">
                                                {imageURL !== null ? <img className="img-thumb" src={API_BASE_URL+imageURL}/> : <img className="img-thumb" src="/assets/img/no-image.jpg"/> }
                                            </div>
                                        </td>
                                        <td>{blog.name}</td>
                                        <td>{blog.published}</td>
                                        <td>{blog.created_on}</td>
                                        <td>
                                            <a href={`/admin/edit-blog/${item.id}`} className="text-decoration-none text-success pr-5">Edit</a>
                                            <a className="text-decoration-none text-danger link-default" onClick={(e) => deleteBlog(e, item.id)}>Delete</a>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (<tr><td colSpan={5}>No data found</td></tr>)}
                    </tbody>
                </Table>
            </>
        )
    }
}
