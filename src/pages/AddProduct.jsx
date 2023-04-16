import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { createProducts } from './../reducers/product';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const saveProduct = async(e) => {
    e.preventDefault();
    if (!name || !price){
      swal({
      title: "Form must be filled!",
      // text: "You clicked the button!",
      icon: "warning",
      button: "Ok",
      });
    }else {
    await dispatch(createProducts({name, price}));
    await swal({
      title: "Product Added Success!",
      // text: "You clicked the button!",
      icon: "success",
      button: "OK",
      });
    navigate("/")
    }
      
  }

  return (
    
    <div className='center'>
      <div className="Container">
            <label className="label">Add Product</label>
        <div className="columns mt-5 is-centered">
            <div className="column is-full">
                <form onSubmit={saveProduct}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className='input' 
                                placeholder='Name' 
                                value={name} 
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Price</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className='input' 
                                placeholder='Price'
                                value={price} 
                                onChange={(e)=>setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type='submit' className='button is-success is-normal is-hovered'>Save</button>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct