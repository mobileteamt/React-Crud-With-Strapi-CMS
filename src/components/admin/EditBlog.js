import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import GetDate from '../GetDate';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader';
import { BtnLoader } from '../BtnLoader';
import config from '../Config.json';
var API_BASE_URL = config.API_BASE_URL;

export default function EditBlog() {

    const { id } = useParams();
    const [blogId, setBlogId] = useState("");
    const [blogName, setBlogName] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogPublished, setBlogPublished] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [blogImg, setBlogImg] = useState(null);
    const [blogImgId, setBlogImgId] = useState(null);
    const [isImage, setIsImage] = useState(false);
   
    const [jwt, setJwt] = useState({
        token: ''
    });

    const fetchBlog = () => {
        fetch(API_BASE_URL+'/api/blogs/'+id+'?populate=*',{
            method : 'GET'
        })
        .then(response => response.json())
        .then((res) => {
            if(res.data){
                // console.log(res.data);
                setBlogId(res.data.id);
                let blogData = res.data.attributes;
                setBlogName(blogData.name);
                setBlogDescription(blogData.description);
                setBlogPublished(blogData.published);

                var imageURL = null;
                var imageId = null;
                if(blogData.image.data && blogData.image.data !== null){
                    imageURL = blogData.image.data.attributes.formats.thumbnail.url;
                    imageId = blogData.image.data.id;
                    setIsImage(true);
                }
                setBlogImg(imageURL);
                setBlogImgId(imageId);

                setIsLoading(false);
            }
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });
    }

    useEffect(() => {
        setIsLoading(true);
        fetchBlog();
    }, [])

    useEffect(()=>{
        try {
            let token = localStorage.getItem('token');
            if(token){
                //logged in
                setJwt({
                    ...jwt,
                    token:token
                })
            }
        } catch (error) {
            setJwt({
                ...jwt,
                token:""
            })
        }
       
    },[]);

    const handlePublishChange = (e) => {
        setBlogPublished(e.target.value);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const blogid = event.target.getAttribute('data-blog-id');
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", function () {
            document.querySelector('.blog-image-wrap_'+blogid+" .blog-image").innerHTML = '<img class="img-thumb" src="' + this.result + '" />';
        });   
        setImage(file);
        setIsImage(true);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(blogName == ''){
            toast.error("Blog name is required");
            return false;
        }
        if(blogDescription == ''){
            toast.error("Blog description is required");
            return false;
        }

        BtnLoader(event, 'show');

        var blogImgData = null;

        try {
            let formData = new FormData();
            formData.append('files',image);

            if(image !== null && jwt.token != ""){
                let upload_response = await axios({
                    method: 'POST',
                    url:API_BASE_URL+'/api/upload',
                    headers: { 
                        'accept' : 'application/json',
                        'content-type': 'multipart/form-data',
                        "Authorization":`Bearer ${jwt.token}`
                    },
                    data: formData,
                    onUploadProgress:(progress)=>{ 
                        console.log("FileUpload ", progress);
                    }
                });
                if(upload_response.status === 200){
                    // console.log('file upload response ',upload_response);
                    // console.log(upload_response.data[0].url);
                    blogImgData = upload_response.data[0];
                }
            }
        } catch (error) {
            blogImgData = null;
            BtnLoader(event, 'hide');
        }

        try{
            if(blogImgData == null && blogImgId !== null){
                if(isImage){
                    blogImgData = blogImgId;
                }
                else{
                    blogImgData = null;
                }
            }
            
            let payload = {
                name : blogName,
                description : blogDescription,
                updated_on : GetDate(),
                published : blogPublished,
                image: blogImgData
            }
            // console.log(payload);
            // return false;

            axios({
                method: 'PUT',
                url: API_BASE_URL+'/api/blogs/'+id,
                data: {"data": payload}  
            })
            .then(function (response) {
                // console.log(response.data);
                if(response.data){
                    // toast.success("Blog updated successfully");
                    BtnLoader(event, 'hide');
                    window.location.href = "/admin/blog-list";
                }
                else{
                    toast.error("Blog updation failed");
                    BtnLoader(event, 'hide');
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error.message);
                BtnLoader(event, 'hide');
            });

        }catch(error){
            console.log(error);
            BtnLoader(event, 'hide');
        }
    }

    const removeBlogImg = (e) => {
        var img_id = e.target.getAttribute('data-img-id');
        var imgThumbClass = 'img-thumb_'+img_id;
        if( document.querySelector('.img-thumb').classList.contains(imgThumbClass) ){
            document.querySelector('.'+imgThumbClass).style.display = 'none';
        }
        else{
            document.querySelector('.blog-image-wrap_'+blogId+" .blog-image .img-thumb").style.display = 'none';
            document.querySelector('#blogImage').value = '';
        }
        
        setIsImage(false);
        setImage(null);
    }

    const revertBlogImg = (e) => {
        var img_id = e.target.getAttribute('data-img-id');
        var imgThumbClass = 'img-thumb_'+img_id;
        if( document.querySelector('.img-thumb').classList.contains(imgThumbClass) ){
            document.querySelector('.'+imgThumbClass).style.display = 'block';
        }
        else{
            if(blogImg!==null){
                var elmt = '<img class="img-thumb img-thumb_'+blogImgId+'" src="' + config.API_BASE_URL+blogImg + '" />';
                document.querySelector('.blog-image-wrap_'+blogId+" .blog-image").innerHTML = elmt;
                document.querySelector('#blogImage').value = '';
                setImage(null);
            }
        }
        setIsImage(true);
    }

    return (
        <>
            {isLoading ? <Loader/> : null}
            {blogId ? (
                <>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="blogName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Blog Name" value={blogName} onChange={(e)=>setBlogName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="blogDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={5} placeholder="Blog Description" value={blogDescription} onChange={(e)=>setBlogDescription(e.target.value)}/>
                        </Form.Group>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Label className="label-margin">Published</Form.Label>
                            <Form.Check
                                inline
                                label="Yes"
                                name="published"
                                type="radio"
                                id={`inline-radio-1`}
                                value="yes"
                                checked={blogPublished === 'yes'}
                                onChange={(e) => handlePublishChange(e)}
                            />
                            <Form.Check
                                inline
                                label="No"
                                name="published"
                                type="radio"
                                id={`inline-radio-2`}
                                value="no"
                                checked={blogPublished === 'no'}
                                onChange={(e) => handlePublishChange(e)}
                            />
                        </div>
                        <div className={`mb-3 blog-image-wrap_${blogId}`}>
                            <div className="blog-image">
                                {blogImg !== null ? <img className={`img-thumb img-thumb_${blogImgId}`} src={API_BASE_URL+blogImg}/> : '' }
                            </div>

                            {blogImg !== null && 
                            <div className="blog-img-actions py-2">
                                <span className="badge text-bg-danger" data-img-id={blogImgId} onClick={(e)=>removeBlogImg(e)}>Remove</span>
                                {blogImgId && <span className="badge text-bg-success" data-img-id={blogImgId} onClick={(e)=>revertBlogImg(e)}>Reset</span>}
                            </div>}

                            {image && blogImgId == null && <div className="blog-img-actions py-2"><span className="badge text-bg-danger" onClick={(e)=>removeBlogImg(e)}>Remove</span></div>}
                        </div>
                        <Form.Group controlId="blogImage" className="mb-3">
                            <Form.Label>Blog Image</Form.Label>
                            <Form.Control type="file" name="file" accept="image/*" onChange={handleImageChange} data-blog-id={blogId}/>
                        </Form.Group>
                        <Button className="btn btn-success btn-margin" type="submit">
                            <span className="spinner-border spinner-border-sm btn-spin" aria-hidden="true"></span>
                            <span role="status" className="btn-spin-status" data-status="Submit">Submit</span>
                        </Button>
                        <a type="button" href="/admin/blog-list" className="btn btn-secondary">Back</a>
                    </Form>
                </>
            ) : (<div>No data found</div>)}
            <ToastContainer position="top-center"/>
        </>
    )
}
