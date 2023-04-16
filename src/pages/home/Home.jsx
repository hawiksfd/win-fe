import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate, Link} from "react-router-dom";
import Navbar from '../../components/Navbar';
import './home.css';
import { privateApi } from './../../services/setupInterceptor';
import { getProducts, getProduct, deleteProduct } from '../../reducers/product.js';
import swal from 'sweetalert';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { uid } = useSelector((state) => state.auth);
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, uid])

  const formatRupiahId = (price) => {
    let priceRup = price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return priceRup;
  };

  const handleEdit = async (id) => {
    await dispatch(getProduct(id));
    navigate(`/edit-product/${id}`);
  }

  const handleDelete = async (id) => {
    swal({
      title: "Are you sure you want to delete the product??",
      // text: "Sekali delete, Data Anda tidak akan bisa kembali lagi!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      })
      .then(async (willDelete) => {
        if (willDelete) {
          await dispatch(deleteProduct(id));
          swal("The product is permanently deleted!", 
          {
            icon: "success",});
          await dispatch(getProducts());
      } 
      });
  }

  return (
    <div>
      <Navbar/>
      
      <div className="home"> 
        <>
          <div className="containerHome">
            <Link to={`/add-product`} className="button is-normal is-primary mt-2">Add Product</Link>
            <table className='table is-striped is-bordered is-fullwidth mt-2'>
              <thead>
                  <tr>
                      <th>NO</th>
                      <th>Name</th>
                      <th>Product</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {product.map((item, i) => (
                      <tr key={item._id}>
                          <td>{i + 1}</td>
                          <td>{item.name}</td>
                          <td>{formatRupiahId(item.price)}</td>
                          <td>
                            <Link to={`/edit-product/${item._id}`} className="button is-small is-info ml-2">Edit</Link>
                            <button onClick={()=> handleDelete(item._id)} className="button is-small is-danger ml-2">Delete</button>
                          </td>
                      </tr>
                  ))}
              </tbody>
           </table>
          </div>
        </>
      </div>
    </div>
  )
}

export default Home
