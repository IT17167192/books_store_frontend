import React, {useEffect, useState} from "react";
import {isAuthenticate} from "../../Authentication";
import {
    getAllCategories,
    getAllBooks,
    deleteBookById,
    updateBook
} from "../../Service/admin/admin_service";
import {API, columns} from "../../config";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import swal from "sweetalert";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookOpen} from "@fortawesome/free-solid-svg-icons/faBookOpen";
import CircularProgress from "@material-ui/core/CircularProgress";
import {MDBDataTable} from "mdbreact";
import {Modal, ModalBody, ModalHeader} from "reactstrap";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";

const ManageBooks = (props) => {

    //table data generated
    const [tableData, setTableData] = useState([]);
    const [tableLoader, setTableLoader] = useState(false);

    //modal show trigger event listener
    const [show, setShow] = useState(false);

    const {user, token} = isAuthenticate();

    const [errorMessage, setErrorMessage] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);

    const [productValues, setProductValues] = useState({
        _id: '',
        name: '',
        description: '',
        authorName: '',
        price: '',
        rating: '',
        category: '',
        image: '',
        addedBy: user._id,
        loading: false,
        error: false
    });

    const {
        _id,
        name,
        description,
        authorName,
        rating,
        price,
        category,
        addedBy,
        loading,
        error
    } = productValues;

    useEffect(() => {
        getAllCategories(token)
            .then(response => {
                if(!response.error){
                    setCategories(response.message);
                }
            })
            .catch(err => console.log(err));
        fetchAllBooks();
    }, []);

    //to fetch all books
    const fetchAllBooks = () => {
        setTableLoader(true);
        getAllBooks()
            .then(response => {
                setTableLoader(false);
                if(!response.error){
                    let newData = [];
                    response.message.forEach(book => {
                        newData.push({
                            bookId: book._id,
                            bookName: book.name,
                            price: book.price,
                            image: <>
                                <img width="100"
                                     src={`${API}/book/image/${book._id}`}/>
                            </>,
                            action: <div>
                                <IconButton onClick={() => onClickEdit(book)}>
                                    <EditIcon fontSize="default" className="text-primary"/>
                                </IconButton>
                                <IconButton onClick={() => onClickDelete(book._id)}>
                                    <DeleteIcon fontSize="default" className="text-danger"/>
                                </IconButton>
                            </div>
                        })
                    });

                    let table_data = {
                        columns: columns.books_table_columns,
                        rows: newData
                    }

                    setTableData(table_data);
                }
            })
    };

    const onClickDelete = (bookId) => {
        swal({
            title: "Are you sure?",
            text: "You won't be able to reverse this transaction!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setTableLoader(true);
                    deleteBookById(token, bookId)
                        .then(response => {
                            if(!response.error){
                                swal("Successful!", "Book deleted Successfully!", "success");
                                fetchAllBooks();
                            }
                        })
                } else {
                    swal("You cancelled the transaction!");
                }
            });
    };

    const onClickEdit = (book) => {
        setProductValues({...productValues, _id: book._id, name: book.name, description: book.description, authorName: book.authorName, rating: book.rating, price: book.price, category: book.category._id, addedBy: user._id})
        handleOpen();
    };

    const handleOnChange = (name) => (event) => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        setProductValues({...productValues, [name]: value});
    };

    const onCategoryChangeHandler = (value) => {
        const categoryId = value._id;
        setProductValues({...productValues, "category": categoryId});
        setSelectedCategory(value);
    };

    const showError = () => (
        <div className="alert alert-danger text-center mt-3" style={{display: error ? '' : 'none'}}>
            {errorMessage}
        </div>
    );

    const handleOpen = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    };

    const clickOnSubmit = (event) => {
        event.preventDefault();
        setProductValues({...productValues, error: false, loading: true});

        if(name === "" || rating === "" || description === "" || price === "" || category === "" || authorName === ""){
            setProductValues({...productValues, error: true, loading: false});
            setErrorMessage("Please fill all the required Fields!")
        }else{

            //creating form data
            let formData = new FormData();
            formData.append('_id', _id);
            formData.append('name', name);

            //if image is altered only, add to the form data
            if(productValues.image)
                formData.append('image', productValues.image);

            formData.append('description', description);
            formData.append('authorName', authorName);
            formData.append('category', category);
            formData.append('addedBy', addedBy);
            formData.append('price', price);
            formData.append('rating', rating);

            updateBook(token, formData, _id)
                .then(response => {
                    if (response.error) {
                        setProductValues({...productValues, error: true, loading: false});
                        if(Array.isArray(response.message)){
                            // console.log(response);
                        }else{
                            setErrorMessage(response.message)
                        }
                    } else {
                        setProductValues({
                            ...productValues,
                            name: '',
                            description: '',
                            image: '',
                            price: '',
                            rating: '',
                            authorName: '',
                            category: '',
                            loading: false,
                            error: false
                        });
                        setSelectedCategory("");
                        fetchAllBooks();
                        swal("Successful!", "Book Updated Successfully!", "success");
                    }
                });
        }
    };

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-md-12 text-center mb-3 mt-5" style={{fontSize: '20px', color: '#8C8887'}}>
                    <FontAwesomeIcon size={"1x"} icon={faBookOpen}/> {' '} Manage Books
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 text-center">
                    {tableLoader && (<CircularProgress size={30} className="mt-3" />)}
                    {!tableLoader && (
                        <MDBDataTable className='shadow p-3 mb-5 bg-white rounded'
                                      bordered
                                      small
                                      hover
                                      data={tableData}
                                      responsive
                        >
                        </MDBDataTable>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Modal zIndex={9999} size="lg" isOpen={show} onHide={handleClose}>
                        <ModalHeader>
                            <div className="btn-toolbar mt-3 mb-2 mb-md-0 " style={{float: 'right'}}>
                                <div className="btn-group mr-2">
                                    <IconButton onClick={handleClose}>
                                        <CancelPresentationIcon fontSize="default" className="text-danger"/>
                                    </IconButton>
                                </div>
                            </div>

                        </ModalHeader>

                        <ModalBody>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-md-12 text-center mb-3 mt-1" style={{fontSize: '20px', color: '#8C8887'}}>
                                        <FontAwesomeIcon size={"1x"} icon={faEdit}/> {' '} Manage Book
                                    </div>
                                </div>
                                <div className="row mt-3 mb-3">
                                    <div className="col-md-12 col-lg-6 col-sm-12 col-xs-12">
                                        <Autocomplete
                                            onChange={(event, value) => onCategoryChangeHandler(value)}
                                            freeSolo
                                            value={selectedCategory}
                                            id="free-solo-2-demo"
                                            disableClearable
                                            disablePortal
                                            options={categories.map((option) => option)}
                                            getOptionLabel={options => options.name}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    id="category"
                                                    placeholder="Select Category"
                                                    label="Search Category"
                                                    margin="normal"
                                                    variant="outlined"
                                                    InputProps={{...params.InputProps, type: 'search'}}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-sm-12 col-xs-12 mt-4">
                                        <input
                                            type="file"
                                            onChange={handleOnChange('image')}
                                            className="custom-file-input"
                                            name="image"
                                            accept="image/*"
                                        />
                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                            Browse an image
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <hr />
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-md-12 col-lg-6 col-sm-12 col-xs-12">
                                        <label htmlFor="inputName" className="sr-only">Name</label>
                                        <input type="text" id="inputName" className="form-control" placeholder="Book's Name"
                                               value={name}
                                               onChange={handleOnChange('name')}/>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-sm-12 col-xs-12">
                                        <label htmlFor="inputDescription" className="sr-only">Description</label>
                                        <input type="text" id="inputDescription" className="form-control" placeholder="Book's Description"
                                               value={description}
                                               onChange={handleOnChange('description')}/>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12 col-lg-6 col-sm-12 col-xs-12">
                                        <label htmlFor="inputPrice" className="sr-only">Price</label>
                                        <input type="text" id="inputPrice" className="form-control" placeholder="Book's Price"
                                               value={price}
                                               onChange={handleOnChange('price')}/>
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-sm-12 col-xs-12">
                                        <label htmlFor="inputAuthorName" className="sr-only">Author's Name</label>
                                        <input type="text" id="inputAuthorName" className="form-control" placeholder="Book's Author"
                                               value={authorName}
                                               onChange={handleOnChange('authorName')}/>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12 col-lg-6 col-sm-12 col-xs-12">
                                        <label htmlFor="inputRating" className="sr-only">Book's Rating</label>
                                        <input type="text" id="inputPrice" className="form-control" placeholder="Book's Rate"
                                               value={rating}
                                               onChange={handleOnChange('rating')}/>
                                    </div>
                                </div>

                                <div className="row mb-5">
                                    <div className="col-12">
                                        <button className="btn btn-lg btn-primary btn-block mt-5" onClick={clickOnSubmit} disabled={loading}>
                                            { loading ? <CircularProgress size={20}/> : 'Update Book' }
                                        </button>
                                    </div>
                                </div>
                                {showError()}
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ManageBooks;
