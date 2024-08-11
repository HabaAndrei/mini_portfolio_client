import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { server_address } from '../diverse';



const Home = () => {


    const [arProducts, setArProducts] = useState([]);

    useEffect(()=>{
        try{
            axios.get(`${server_address}/get_data`).then((response)=>{
                if(response.data.type){
                    let arData = response.data.data;
                    setArProducts(arData);
                    console.log(arData);
                }else{
                    console.log('don pacate am primit o eroare', response.data.err)
                }
            })
        }catch(err){
            console.log(err);
        }
    }, []);



    
  return (
    <div>
        <Navbar/>



        <div className="bg-white">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
                {arProducts.map((ob, index)=>{
                    let {id, data} = ob;

                    return <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-md" >

                        <div>
                            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                                <div  className="border-t border-gray-200 pt-4">
                                    <dt className="font-medium text-gray-900">{data.title}</dt>
                                    <dd className="mt-2 text-sm text-gray-500">{data.description}</dd>
                                    <a href={`${data.link}`} className="mt-2 text-sm text-gray-500">Go to there page </a>
                                </div>
                            </dl>
                        </div>


                        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
                            {data.data.map((idIMG, index)=>{
                                return <img key={index}
                                    alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                                    src={`${server_address}/uploads/${idIMG}.jpg`}
                                    className="rounded-lg bg-gray-100"
                                />

                            })}
                        </div>
                    </div>
                })}
            </div>
        </div>

    </div>
  )
}

export default Home



// navigate dupa ce adaug un produs nou
// notificari / alerte
// caut siling nou pt produse
// documentatie 
// in nest js fac ceva cu certifcatul , il bag in env