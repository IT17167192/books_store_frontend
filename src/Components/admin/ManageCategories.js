import React, {useEffect, useState} from "react";
import {MDBDataTable} from "mdbreact";
import {getAllCategories, deleteCategoryById, addCategory, updateCategory} from "../../Service/admin/admin_service";
import {isAuthenticate} from "../../Authentication";
import {columns} from "../../config";
import swal from "sweetalert";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons/faList";
import CircularProgress from "@material-ui/core/CircularProgress";
import {faPlane} from "@fortawesome/free-solid-svg-icons/faPlane";
import {faRedoAlt} from "@fortawesome/free-solid-svg-icons/faRedoAlt";

const ManageCategories = (props) => {

    const {token} = isAuthenticate();

    //table data generated
    const [tableData, setTableData] = useState([]);

    const [category, setCategory] = useState({
        name: '',
        _id: '',
        error: false,
        loading: false
    });

    const {
        name,
        _id,
        error,
        loading
    } = category;

    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        fetchAllCategories();
    }, []);


    const fetchAllCategories = () => {
        setCategory({...category, name: '', _id: '', error: false, loading: true});
        getAllCategories(token)
            .then(response => {
                if(!response.error){
                    setCategory({...category, name: '', _id: '', error: false, loading: false});
                    let newData = [];
                    response.message.forEach(category => {
                        newData.push({
                            categoryId : category._id,
                            categoryName : category.name,
                            action :<div>
                                <IconButton onClick={() => onClickEdit(category._id, category.name)}>
                                    <EditIcon fontSize="default" className = "text-primary"/>
                                </IconButton>
                                <IconButton onClick={() => onClickDelete(category._id)}>
                                    <DeleteIcon fontSize="default"  className = "text-danger"/>
                                </IconButton>
                            </div>
                        })

                        let table_data = {
                            columns : columns.category_table_columns,
                            rows : newData
                        }

                        setTableData(table_data);
                    });
                }
            })
            .catch(err => console.error(err));
    }

    const onClickEdit = (catId, catName) => {
        setCategory({...category, name: catName, _id: catId})
    };

    const onClickDelete = (catId) => {
        swal({
            title: "Are you sure?",
            text: "You won't be able to reverse this transaction!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    setCategory({...category, name: '', _id: '', error: false, loading: true});
                    deleteCategoryById(token, catId)
                        .then(response => {
                            if(!response.error){
                                setCategory({...category, name: '', _id: '', error: false, loading: false});
                                swal("Successful!", "Category deleted Successfully!", "success");
                                fetchAllCategories();
                            }
                        })
                } else {
                    swal("You cancelled the transaction!");
                }
            });
    }

    const handleOnChange = (name) => (event) => {
        const value = event.target.value;
        setCategory({...category, [name]: value});
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setCategory({...category, error: false, loading: true});
        if(name == ''){
            setCategory({...category, error: true, loading: false});
            setErrorMessage("Please fill Category name!");
        }else {
            if(_id === ''){
                addCategory(token, {name: name})
                    .then(response => {
                        if(!response.error){
                            setCategory({...category, name: '', _id: '', error: false, loading: false});
                            swal("Successful!", "Category Successfully Created!", "success");
                            fetchAllCategories();
                        }
                    })
                    .catch(err => console.error(err));
            }else{
                updateCategory(token, {_id: _id, name: name}, _id)
                    .then(response => {
                        if(!response.error){
                            setCategory({...category, name: '', _id: '', error: false, loading: false});
                            swal("Successful!", "Category Successfully Updated!", "success");
                            fetchAllCategories();
                        }
                    })
                    .catch(err => console.error(err));
            }
        }
    };

    const showError = () => (
        <div className="alert alert-danger text-center mt-3" style={{display: error ? '' : 'none'}}>
            {errorMessage}
        </div>
    );

    const clearAll = (event) => {
        event.preventDefault();
        setCategory({...category, name: '', _id: ''});
    }

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-md-12 text-center mb-3 mt-5" style={{fontSize: '20px', color: '#8C8887'}}>
                    <FontAwesomeIcon size={"1x"} icon={faList}/> {' '} Manage Categories
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12">
                    <label htmlFor="inputName" className="sr-only">Category Name</label>
                    <input type="text" id="inputName" className="form-control" placeholder="Category Name"
                           value={name}
                           onChange={handleOnChange('name')}/>
                </div>
            </div>

            <div className="row mt-5 mb-5">
                <div className="col-auto">
                    <button className="btn btn-success" onClick={onSubmit} disabled={loading}>
                        <FontAwesomeIcon size={"1x"} icon={faPlane}/> {' '}{_id === '' ? 'Save': 'Update'}
                    </button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-warning" style={{color: '#ffffff'}} onClick={clearAll}><FontAwesomeIcon size={"1x"}
                                                                                                                       icon={faRedoAlt}/> {' '}Clear
                    </button>
                </div>
            </div>
            {showError()}
            <div className="row mt-5">
                <div className="col-12 text-center">
                    {loading && (<CircularProgress size={30} className="mt-3" />)}
                    {!loading && (
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
        </div>
    );
};

export default ManageCategories;
