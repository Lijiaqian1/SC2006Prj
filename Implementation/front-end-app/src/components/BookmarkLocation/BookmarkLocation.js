import React from 'react';
import {useState,useEffect} from 'react';
import BookMarkList from '../BookMarkList/BookMarkList';
import '../BookmarkLocation/BookmarkLocation.css';
import BookMarkEmpty from '../BookMarkEmpty/BookMarkEmpty';

const Bookmarklocation = () => {

    const [bookMarkobject,setbookMarkobject] = useState({});


    /*let bookMarkobject = {
        pickuplocation: "eunos crescent", 
        duration: 2
    };*/

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('bookmarkPlaces'));
        if(items){
            setbookMarkobject(items);
        }
    },[])

    let bookMarkdata = [bookMarkobject];
    let length = bookMarkdata.length;
    return (
        <div>
            <h1 className="bookmarkheader">Bookmark places</h1>
            {length===0? 
            <div className="nosavedheader mt-5">
                <h1>No saved places</h1>
                <h3 className="texth3 mt-3">Remember to save your places by clicking the save button! &#x1F603;</h3>

            </div>
                 : <BookMarkList bookMarkArray = {bookMarkdata}/>}
             : 

            

        </div>
    )
}

export default Bookmarklocation;