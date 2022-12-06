import React, { useState, useEffect, useRef } from 'react';

import './App.css';

import Axios from 'axios';
import uniqid from 'uniqid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'



const App = () => {

    // Importantes
    const clickRef = React.useRef(null);
    const resetDescription = React.useRef(null);
    const resetStock = React.useRef(null);

    // sweet alert confirmation
    const MySwal = withReactContent(Swal);

    // Products
    const [products, setProducts] = useState([]);
    const [idproduct, setIdproduct] = useState(0);

    // Create products
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [contador, setContador] = useState(0);

    // Modal State
    const [openModal, setOpenModal] = useState("");
    const handleAddProduct = () => { setOpenModal("addproduct"); }
    const handleEdit = () => { setOpenModal("edit"); }
    const handleDelete = () => { setOpenModal("delete"); }

    // Resetear las varibles;
    const resetVariables = () => {
        resetDescription.current.value = "";
        resetStock.current.value = 0;
        setIdproduct(0);
    }

    // Crear producto
    const createProduct = async (params) => {
        console.log(params);
        await Axios
            .post('api/products/addproduct', params,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
            .then(function (response) {
                setContador(contador + 1);
                clickRef.current.click();
                MySwal.fire({
                    icon: 'success',
                    title: <p>{response.data}</p>,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    // Editar producto
    const editProduct = async (params) => {
        console.log(params);
        await Axios
            .post('api/products/editproduct', params,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
            .then(function (response) {
                setContador(contador + 1);
                clickRef.current.click();
                MySwal.fire({
                    icon: 'success',
                    title: <p>{response.data}</p>,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    // Borrar producto
    const deleteProduct = async (id) => {
        console.log(id);
        await Axios
            .post('api/products/deleteproduct', id,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                })
            .then(function (response) {
                setContador(contador + 1);
                clickRef.current.click();
                MySwal.fire({
                    icon: 'success',
                    title: <p>{response.data}</p>,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }

    // Obtener los productos
    const getProducts = async () => {
        Axios.get('api/products/getproducts')
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contador])

    return (
        <>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {openModal === "addproduct" ?
                            <>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add New Product</h5>
                                    <button
                                        onClick={() => {
                                            resetVariables();
                                        }}
                                        ref={clickRef} type="button" className="btn-close"
                                        data-bs-dismiss="modal" aria-label="Close">
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <input
                                                ref={resetDescription}
                                                defaultValue=""
                                                onChange={(e) => setDescription(e.target.value)}
                                                style={{ marginBottom: '10px' }} type="text"
                                                className="form-control" id="product"
                                                aria-describedby="product" placeholder="Product"
                                            />
                                            <input
                                                ref={resetStock}
                                                defaultValue="0"
                                                onChange={(e) => setStock(e.target.value)}
                                                type="number" className="form-control"
                                                id="stock" aria-describedby="stock"
                                                placeholder="Stock"
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        disabled={stock === 0 || description === "" ? true : false}
                                        onClick={() => {
                                            createProduct({ name: description, stock: stock, id: uniqid() });
                                        }}
                                        type="button" className="btn btn-primary">
                                        Save changes
                                    </button>
                                    <button
                                        onClick={() => {
                                            resetVariables();
                                        }}
                                        type="button" className="btn btn-secondary"
                                        data-bs-dismiss="modal">
                                        Close
                                    </button>
                                </div>
                            </>
                            :
                            openModal === "edit" ?
                                <>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Edit Product</h5>
                                        <button
                                            onClick={() => {
                                                resetVariables();
                                            }}
                                            ref={clickRef} type="button" className="btn-close"
                                            data-bs-dismiss="modal" aria-label="Close">
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <input
                                                    ref={resetDescription}
                                                    defaultValue=""
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    style={{ marginBottom: '10px' }} type="text"
                                                    className="form-control" id="product"
                                                    aria-describedby="product" placeholder="Product"
                                                />
                                                <input
                                                    ref={resetStock}
                                                    defaultValue="0"
                                                    onChange={(e) => setStock(e.target.value)}
                                                    type="text" className="form-control"
                                                    id="stock" aria-describedby="stock" placeholder="Stock"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            disabled={stock === 0 || description === "" ? true : false}
                                            onClick={() => {
                                                editProduct({ name: description, stock: stock, id: idproduct });
                                            }}
                                            type="button" className="btn btn-primary">
                                            Save changes
                                        </button>
                                        <button
                                            onClick={() => {
                                                resetVariables();
                                            }}
                                            type="button" className="btn btn-secondary"
                                            data-bs-dismiss="modal">
                                            Close
                                        </button>
                                    </div>
                                </>
                                :
                                openModal === "delete" ?
                                    <>
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Delete Product</h5>
                                            <button
                                                ref={clickRef} type="button" className="btn-close"
                                                data-bs-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure do you want to delete this product?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                onClick={() => {
                                                    deleteProduct({id:idproduct});
                                                }}
                                                type="button" className="btn btn-primary">
                                                Save changes
                                            </button>
                                            <button
                                                type="button" className="btn btn-secondary"
                                                data-bs-dismiss="modal">
                                                Close
                                            </button>
                                        </div>
                                    </>
                                    :
                                    null
                        }
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>MERN CRUD</h2>
                            </div>
                            <div className="col-sm-6">
                                <button
                                    onClick={() => {
                                        handleAddProduct();
                                    }}
                                    className="btn btn-success"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add New Product
                                </button>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Stock</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {products?.map?.((item, index) => (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.stock}</td>
                                    <td className="d-flex justify-content-center align-items-center">
                                        <button
                                            onClick={() => {
                                                setIdproduct(item.id);
                                                handleEdit();
                                            }}
                                            style={{ background: 'none', border: 'none' }}
                                            type="button" className="btn btn-primary"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <i style={{ color: 'orange' }} className="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIdproduct(item.id);
                                                handleDelete();
                                            }}
                                            style={{ background: 'none', border: 'none' }}
                                            type="button" className="btn btn-danger"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <i style={{ color: '#EB0F19' }} className="fa-sharp fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default App;