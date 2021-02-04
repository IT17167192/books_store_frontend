import React, {useEffect, useState} from "react";
import {isAuthenticate} from "../../Authentication";
import {addBook, getAllCategories} from "../../Service/admin/admin_service";
import swal from "sweetalert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from '@material-ui/core/TextField';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookReader} from "@fortawesome/free-solid-svg-icons/faBookReader";
import CircularProgress from "@material-ui/core/CircularProgress";

const AddBook = (props) => {
    const {user, token} = isAuthenticate();

    const [errorMessage, setErrorMessage] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [productValues, setProductValues] = useState({
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
    }, []);

    const handleOnChange = (name) => (event) => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        setProductValues({...productValues, [name]: value});
    };

    const onCategoryChangeHandler = (value) => {
        const categoryId = value._id;
        setProductValues({...productValues, "category": categoryId});
        setSelectedCategory(value);
    };

    const clickOnSubmit = (event) => {
        event.preventDefault();
        setProductValues({...productValues, error: false, loading: true});
        if(productValues.image){
            if(name === "" || rating === "" || description === "" || price === "" || category === "" || authorName === ""){
                setProductValues({...productValues, error: true, loading: false});
                setErrorMessage("Please fill all the required Fields!")
            }else{

                //creating form data
                let formData = new FormData();
                formData.append('name', name);
                formData.append('image', productValues.image);
                formData.append('description', description);
                formData.append('authorName', authorName);
                formData.append('category', category);
                formData.append('addedBy', addedBy);
                formData.append('price', price);
                formData.append('rating', rating);

                addBook(token, formData)
                    .then(response => {
                        console.log(response);
                        if (response.error) {
                            setProductValues({...productValues, error: true, loading: false});
                            if(Array.isArray(response.message)){
                                console.log(response);
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

                            swal("Successful!", "Book Created Successfully!", "success");
                        }
                    });
            }
        }else{
            setErrorMessage("Please upload a image!");
            setProductValues({...productValues, error: true, loading: false});
        }

    };

    const showError = () => (
        <div className="alert alert-danger text-center mt-3" style={{display: error ? '' : 'none'}}>
            {errorMessage}
        </div>
    );

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-md-12 text-center mb-3 mt-5" style={{fontSize: '20px', color: '#8C8887'}}>
                    <FontAwesomeIcon size={"1x"} icon={faBookReader}/> {' '} Add Book
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

            <div className="row">
                <div className="col-12">
                    <button className="btn btn-lg btn-primary btn-block mt-5" onClick={clickOnSubmit} disabled={loading}>
                        { loading ? <CircularProgress size={20}/> : 'Add Book' }
                    </button>
                </div>
            </div>
            {showError()}
        </div>
    );
};

export default AddBook;
