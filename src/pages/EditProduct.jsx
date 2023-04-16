import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import { getProduct, editProduct } from './../reducers/product';
import swal from 'sweetalert';

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const { prdId } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);
  

  const UpdateProduct = async(e) => {
    e.preventDefault();
    await dispatch(editProduct({id, name, price}));
    await swal({
      title: "Product Updated Success!",
      // text: "You clicked the button!",
      icon: "success",
      button: "OK",
      });
    navigate("/")
  }

  return (
    <div className='center'>
      <div className="Container">
          <label className="label">Edit Product</label>
        <div className="columns mt-5 is-centered">
          <div className="column is-full">
              <form onSubmit={UpdateProduct}>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                      <input 
                        type="text" 
                        className='input is-primary' 
                        placeholder='Name' 
                        defaultValue={prdId.name}
                        onChange={(e)=>setName(e.target.value)}
                      />
                    </div>
                </div>
                <div className="field">
                  <label className="label">Price</label>
                  <div className="control">
                    <input 
                      type="text" 
                      className='input is-primary' 
                      placeholder='Price'
                      defaultValue={prdId.price}
                      onChange={(e)=>setPrice(e.target.value)}
                    />
                  </div>
                </div>
                  <button type='submit' className='button is-success'>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct