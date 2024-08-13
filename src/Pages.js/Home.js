import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { server_address } from '../diverse';
import Alert from '../Components/Alert';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as Eye} from '../icons/eyes.svg';
import {ReactComponent as EyeSlash} from '../icons/eyes_slash.svg';
import {ReactComponent as Trash} from '../icons/trash.svg';
import {ReactComponent as Edit } from '../icons/edit.svg';
import ModalEdit from '../Components/ModalEdit.js';

const Home = (props) => {


    const [arProducts, setArProducts] = useState([]);
    const [openModal, setOpenModal] = useState({type: false})
    const navigate = useNavigate();

    useEffect(()=>{
        try{
            axios.get(`${server_address}/get_data`).then((response)=>{
                if(response.data.type){
                    let arData = response.data.data;
                    let arNou = arData.map((ob)=>{
                        return {...ob, description_hidden: false, images_hidden: false}
                    });
                    setArProducts(arNou);
                }else{
                    props.setArAlert((prev)=>[...prev, {type: 'warning', mes: 'Unfortunately we have an error when displaying the data'}])
                }
            })
        }catch(err){
            props.setArAlert((prev)=>[...prev, {type: 'warning', mes: 'Unfortunately we have an error when displaying the data'}])
        }
    }, []);


    function hideElement(val, id){
        if(val === 'image'){
            setArProducts((arPrev)=>{
                let arNou = arPrev.map((obiect)=>{
                    if(obiect.id === id ){
                        return {...obiect, images_hidden: !obiect.images_hidden}
                    }else{
                        return {...obiect};
                    }
                })
                return [...arNou];
            })
        }else if(val === 'description'){
            setArProducts((arPrev)=>{
                let arNou = arPrev.map((obiect)=>{
                    if(obiect.id === id ){
                        return {...obiect, description_hidden: !obiect.description_hidden}
                    }else{
                        return {...obiect};
                    }
                })
                return [...arNou];
            })
        }
    }

    function deleteProduct(id){
        axios.post(`${server_address}/deleteProduct`, {id}).then((data)=>{
            if(data.data.type){

                setArProducts((prev)=>{
                    let arNou = [];
                    prev.forEach((ob)=>{
                        if(ob.id === id){
                            return;
                        }else{
                            arNou.push(ob);
                        }
                    })
                    return [...arNou];

                })

                props.setArAlert((prev)=>[...prev, {type: 'succes', mes: 'Succes'}])
            }else{
                props.setArAlert((prev)=>[...prev, {type: 'warning', mes: 'Unfortunately, I could not delete the product'}])
            }
        }).catch((err)=>{
            props.setArAlert((prev)=>[...prev, {type: 'warning', mes: 'Unfortunately, I could not delete the product'}])
        })
    }


    function changeProductFromState(title, link, description, id){
        setArProducts((prev)=>{
            let arNou  = prev.map((ob)=>{
                if(ob.id === id){
                    return {...ob, data: {...ob.data, title, link, description} }
                }else{
                    return ob;
                }
            })
            return [...arNou];
        })
        setOpenModal({type: false});
    }

    
  return (
    <div>

        <ModalEdit changeProductFromState={changeProductFromState} setArAlert={props.setArAlert} openModal={openModal} setOpenModal={setOpenModal} />

        <Alert setArAlert={props.setArAlert} arAlert={props.arAlert} />

        <Navbar/>

        {arProducts.length ? 
        <div className="bg-white">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            {arProducts.map((ob, index) => {
                let { id, data } = ob;

                return (
                    <div
                        key={index}
                        className="divPtHover p-4 border border-gray-300 rounded-lg shadow-md relative group" 
                    >
                        <dt className="font-medium text-gray-900">{data.title}</dt>
                        <a href={`${data.link}`} className="mt-2 text-sm text-gray-500">Go to there page</a>

                        {ob.description_hidden ? 
                            <Eye
                                onClick={() => hideElement('description', id)}
                                className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity transition-visibility" 
                            /> :
                            <dd className="mt-2 text-sm text-gray-500 flex items-center">
                                {data.description}
                                <EyeSlash
                                    onClick={() => hideElement('description', id)}
                                    className="ml-2 cursor-pointer opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity transition-visibility" 
                                />
                            </dd>
                        }

                        {ob.images_hidden ? <div></div> :
                            <EyeSlash
                                onClick={() => hideElement('image', id)}
                                className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute top-0 right-0 transition-opacity transition-visibility" 
                            />
                        }

                        {ob.images_hidden ? 
                            <Eye
                                onClick={() => hideElement('image', id)}
                                className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute top-0 right-0 transition-opacity transition-visibility" 
                            /> : 
                            <div className={data.data.length > 2 ? "grid grid-cols-2 grid-rows-2" : 'grid grid-cols-2 grid-rows-1'}>
                                {data.data.map((idIMG, index) => (
                                    <img
                                        key={index}
                                        src={`${server_address}/uploads/${idIMG}.jpg`}
                                        className="rounded-lg bg-gray-100"
                                    />
                                ))}
                            </div>
                        }

                        <div className="flex justify-center space-x-4 " style={{'marginTop': '10px'}}>
                            <Trash onClick={() => deleteProduct(id)} />
                            <Edit onClick={()=>setOpenModal({type: true, ob})} />
                        </div>
                    </div>
                );
            })}

            </div>
        </div>
        : 
        <div  className='onCenter' >
            <button type="button" 
                onClick={()=>navigate('/addTask')}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Add a product
            </button>            
        </div>
        }

    </div>
  )
}

export default Home



// modificare
// documentatie 
// in nest js fac ceva cu certifcatul , il bag in env
// verific partea cu uploads ca si fisier ca se se creeze cand se  face git clone 