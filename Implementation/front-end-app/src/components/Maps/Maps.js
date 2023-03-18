import React from 'react';
import {useState, useMemo, useCallBack, useRef} from "react";
import {
    GoogleMap, 
    Marker, 
} from "@react-google-maps/api";

function Maps(){
    return(
        <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.22544735676!2d103.70416394440879!3d1.313996123932699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11238a8b9375%3A0x887869cf52abf5c4!2sSingapore!5e0!3m2!1sen!2ssg!4v1679121109487!5m2!1sen!2ssg" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    );
}