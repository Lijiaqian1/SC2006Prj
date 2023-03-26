import React from 'react';
import BookMarkList from '../BookMarkList/BookMarkList';
import '../BookmarkLocation/BookmarkLocation.css';
import BookMarkEmpty from '../BookMarkEmpty/BookMarkEmpty';

const Bookmarklocation = () => {

    let bookMarkobject = {
        pickuplocation: "eunos crescent", 
        duration: 2
    };

    let bookMarkdata = [bookMarkobject];
    let length = bookMarkdata.length;
    return (
        <div>
            <h1 className="bookmarkheader">Bookmark places</h1>
            <BookMarkList bookMarkArray = {bookMarkdata}/> : 

            

        </div>
    )
}

export default Bookmarklocation;