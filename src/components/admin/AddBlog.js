import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import token from './GetToken';
import GetDate from '../GetDate';
import axios from 'axios';
import config from '../Config.json';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader';
var API_BASE_URL = config.API_BASE_URL;

export default function AddBlog() {

    const [blogName, setBlogName] = useState("");
    const [blogDescription, setBlogDescription] = useState("");
    const [blogPublished, setBlogPublished] = useState("yes");
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [isImage, setIsImage] = useState(false);
    var jwt = token();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", function () {
            document.querySelector('.blog-image-wrap .blog-image').innerHTML = '<img class="img-thumb" src="' + this.result + '" />';
        });   
        setImage(file);
    }

    const handlePublishChange = (e) => {
        setBlogPublished(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(blogName == ''){
            toast.error("Blog name is required");
            return false;
        }
        if(blogDescription == ''){
            toast.error("Blog description is required");
            return false;
        }

        var blogImgData = null;
        setIsLoading(true);
        try
        {
            if(image !== null && jwt != "")
            {
                let formData = new FormData();
                formData.append('files',image);
                
                let upload_response = await axios({
                    method: 'POST',
                    url:`${API_BASE_URL}/api/upload`,
                    headers: { 
                        'accept' : 'application/json',
                        'content-type': 'multipart/form-data',
                        "Authorization":`Bearer ${jwt}`
                    },
                    data: formData,
                    onUploadProgress:(progress)=>{ 
                        console.log("FileUpload ", progress);
                    }
                });
                if(upload_response.status === 200){
                    // console.log('file upload response ',upload_response);
                    blogImgData = upload_response.data[0];
                    setIsLoading(false);
                }
            }
        } catch (error) {
            blogImgData = null;
            setIsLoading(false);
        }

        if(isImage == null){
            blogImgData = null;
        }

        
        let payload = {
            name : blogName,
            description : blogDescription,
            created_on : GetDate(),
            published : blogPublished,
            image: blogImgData
        }

        try{
            axios({
                method: 'POST',
                url: `${API_BASE_URL}/api/blogs`,
                data: {"data": payload}  
            })
            .then(function (response) {
                console.log(response.data);
                if(response.data){
                    // toast.success("Blog added successfully");
                    window.location.href = "/admin/blog-list";
                }
                else{
                    setIsLoading(false);
                    toast.error("Blog creation failed");
                    return false;
                }
            })
            .catch(function (error) {
                // handle error
                setIsLoading(false);
                console.log(error);
                toast.error(error.message);
                return false;
            });

        }catch(error){
            setIsLoading(false);
            console.log(error);
        }
    }

    const removeBlogImg = (e) => {
        document.querySelector('.blog-image-wrap .img-thumb').style.display = 'none';
        document.querySelector('#blogImage').value = '';
        setIsImage(false);
    }

    return (
        <>
            {isLoading ? <Loader/> : null}
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
                        onChange={(e) => handlePublishChange(e)}
                    />
                </div>
                <div className="mb-3 blog-image-wrap">
                    <div className="blog-image"></div>
                    {image !== null && 
                    <div className="blog-img-actions py-2">
                        <span className="badge text-bg-danger" onClick={(e)=>removeBlogImg(e)}>Remove</span>
                    </div>}
                </div>
                <Form.Group controlId="blogImage" className="mb-3">
                    <Form.Label>Blog Image</Form.Label>
                    <Form.Control type="file" name="file" accept="image/*" onChange={(e)=>handleImageChange(e)}/>
                </Form.Group>
                <Button className="btn btn-success btn-margin" type="submit">Submit</Button>
                <a type="button" href="/admin/blog-list" className="btn btn-secondary">Back</a>
            </Form>
            <ToastContainer position="top-center"/>
        </>
    )
}
