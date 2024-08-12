import React from 'react'
import Navbar from '../Components/Navbar'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {server_address, addParamInUrl, getParamFromUrl, deleteParamFromUrl} from '../diverse.js';
import axios from 'axios';
import Alert from '../Components/Alert.js';

const AddTask = (props) => {

  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [arWithIMG, setArWithIMG] = useState([]);

  

  function uploadImage(e){
    if(!e?.target?.files[0]?.type?.includes('image'))return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const urlIMG = URL.createObjectURL(file);
    setFile({url: urlIMG, data: file});

  }

  function acceptFile(){
    if(!file)return;
    setArWithIMG((prev)=>{
      return [{image: file.url, data: file.data}, ...prev.slice(0, 3)];
    });
    setFile();
  }

  function addTask(){
    if(!title.length || !link.length || !description.length || !arWithIMG.length){
      props.setArAlert((prev)=>[...prev, {type: 'warning', mes: 'Complete all the fields'}])
      return ;
    }

    let formDataMultipleImages = new FormData();
    arWithIMG.forEach((ob)=>{
      formDataMultipleImages.append("image", ob.data);
    })


    axios.post(`${server_address}/store_data`, formDataMultipleImages, {
      params:{id : uuidv4().slice(0, 10), 
        title, description, link
      },
      headers : {
        "Content-Type": "multipart/form-data",
      }
    }).then((response)=>{
      if(response?.data?.type){
        props.setArAlert((prev)=>[...prev, {type: 'succes', mes: 'Succes'}])
        navigate('/');
      }else{
        props.setArAlert((prev)=>[...prev, {type: 'warning', mes: 'Unfortunately, the action was not completed'}])
      }
    }).catch((err)=>{
      props.setArAlert((prev)=>[...prev, {type: 'warning', mes: 'Unfortunately, the action was not completed'}])
      console.log(err);
    }) 
    
  }


  return (
    <div>

      <Alert setArAlert={props.setArAlert} arAlert={props.arAlert} />
      
      <Navbar/>

      <div>
        <div  style={{marginTop: '20px' }} className="max-w-md mx-auto">
          
          
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={title} onChange={(e)=>setTitle(e.target.value)}
                type="text" name="floating_title" id="floating_title" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="floating_title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input 
                value={link} onChange={(e)=>setLink(e.target.value)}
              type="text" name="floating_link" id="floating_link" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="floating_link" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Link</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <textarea 
              value={description}  onChange={(e)=>setDescription(e.target.value)}
              id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description"></textarea>    
            </div>
          </div>
        
          <input
            accept="image/*"
            onChange={uploadImage}
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file"
            />

          <img 
          style={{maxWidth: '500px', maxHeight: '300px', "marginLeft": "auto","marginRight": "auto"}}
          className="rounded-lg bg-gray-100"
          src={file?.url}
          />

          


          {file?.url && 
            <div className="p-4 md:p-5 text-center">
              <button 
                onClick={()=>acceptFile()}
                data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Save
              </button>
              <button 
                onClick={()=>setFile()}
                data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >Delete</button>
            </div>
          }
        


        
          <br  style={{height: '20px'}} />
          <button 
            onClick={addTask}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Add task</button>
        </div>


 
      </div>

      <div
        style={{margin: '10px'}}
        className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
        {arWithIMG.map((ob, index)=>{
          return <img key={index}
            src={ob.image}
            className="rounded-lg bg-gray-100"
          />
        })}
        
        
      </div>
    </div>
  )
}

export default AddTask;


