import React, {useEffect, useState} from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { server_address } from '../diverse.js';
import axios from 'axios';

const ModalEdit = (props) => {

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');

    useEffect(()=>{
        if(props.openModal.type){
            setTitle(props.openModal?.ob?.data?.title);
            setLink(props.openModal?.ob?.data?.link);
            setDescription(props.openModal?.ob?.data?.description);
        }else{
            setDescription('');setLink('');setTitle('');
        }
    }, [props.openModal])

    function changeProduct(){
        let id = props.openModal.ob.id;

        axios.post(`${server_address}/changeProduct`, {title, link, description, id}).then((response)=>{

            if(response?.data?.type){
                props.setArAlert((prev)=>[...prev, {type: 'succes', mes: 'Succes'}]);
                props.changeProductFromState(title, link, description, id)
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
        <Dialog open={props.openModal.type} onClose={()=>props.setOpenModal({type: false})} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                
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
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={()=>props.setOpenModal({type: false})}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button
                                style={{cursor: 'pointer'}}
                                type="button"
                                data-autofocus
                                onClick={()=>changeProduct()}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                                Save
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    </div>
  )
}

export default ModalEdit