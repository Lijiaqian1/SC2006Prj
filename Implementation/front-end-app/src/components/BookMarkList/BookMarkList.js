import React from 'react';
import BookMarkComponent from '../BookMarkComponent/BookMarkComponent';

const BookMarkList = (props) => {
    return (
        <div>
        {
            props.bookMarkArray.map(bookMarkdata => {
                return <BookMarkComponent bookMarkdata = {bookMarkdata} /> 
            })
        }
    </div>
    )
}

export default BookMarkList