import React, {useEffect, useState} from "react";
import {getAllBooks} from "../../Service/website/home_service";
import {Link} from "react-router-dom";
import {API} from "../../config";
import CircularProgress from '@material-ui/core/CircularProgress';


const Store = (props) => {

    const [popularBooks, setPopularBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllBooks()
            .then(response => {
                setLoading(false);
                if(!response.error){
                    setPopularBooks(response.message)
                }
            })
            .catch(err => console.log(err));
    }, [])

    const showRating = (rating) => {
        if(rating > 0){
            let startArray = [];

            for (let i = 0; i < Math.floor(rating); i++)
                startArray.push(<li key={i} className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>);

            if(rating > Math.floor(rating)){
                startArray.push(<li key={0.5} className="list-inline-item m-0"><i className="fa fa-star-half text-success"></i></li>)
            }

            return (
                <ul className="list-inline small">
                    {startArray}
                </ul>
            );
        }else{
            return (
                <ul className="list-inline small">
                    <li key={1} className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
                    <li key={2} className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
                    <li key={3} className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
                    <li key={4} className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
                    <li key={5} className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
                </ul>
            );
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 mb-3 mt-5" style={{fontSize: '30px', color: '#8C8887'}}>
                    All Books
                </div>
            </div>
            <div className="row mt-5">
                {
                    loading ? (
                        <div className="col-12 mt-5 text-center">
                            <CircularProgress />
                        </div>
                    ) : (
                        popularBooks.map(book => (
                            <div key={book._id} className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                                <div className="card rounded mb-5 shadow-lg border-0">
                                    <div className="card-body p-4">
                                        <Link style={{textDecoration: 'none'}} to={`/book/${book._id}`}>
                                            <img
                                                src={`${API}/book/image/${book._id}`}
                                                alt=""
                                                className="img-fluid d-block mx-auto mb-3"
                                            />

                                        </Link>
                                        <h5>
                                            <Link style={{textDecoration: 'none'}} to={`/book/${book._id}`} className="text-dark">{book.name}</Link>
                                        </h5>
                                        <div
                                            className="price">
                                            {`Rs ${book.price}`}
                                        </div>
                                        <span className="small text-muted font-italic">{book.description}</span><br/>
                                        <span className="small text-muted font-italic">By {book.authorName}</span>
                                        {showRating(book.rating)}
                                    </div>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default Store;
