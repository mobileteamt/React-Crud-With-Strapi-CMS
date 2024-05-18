
import { useEffect } from 'react';
import config from './Config.json';
import axios from 'axios';

export function upload(token = null, image_data = null) {

    var uploadResponse = null;

    if(image_data !== null && token !== null){
        async function postData(url = "", data) {
        
            var uploadResult = await axios({
                method: 'POST',
                url:'http://localhost:1337/api/upload',
                headers: { 
                    'accept' : 'application/json',
                    'content-type': 'multipart/form-data',
                    "Authorization":`Bearer ${token}`
                },
                data: data,
                onUploadProgress:(progress)=>{ 
                    // console.log("FileUpload ", progress);
                }
            });
            // console.log(uploadResult);
            return uploadResult;
        }
        
        let formData = new FormData();
        formData.append('files',image_data);

        postData(`${config.baseURL}/api/upload`, formData).then((response) => {
            
            if(response.data && response.data !== undefined){
                console.log(response.data[0]);
                uploadResponse = response.data[0];
            }
        });

    }
    // console.log('uploadResponse: '+uploadResponse);
    return uploadResponse;
}