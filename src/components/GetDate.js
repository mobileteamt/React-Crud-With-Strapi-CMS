import React from 'react'

export default function GetDate() {

    // Get current date and time
    let currentDate = new Date();

    // Extract individual components
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    let day = currentDate.getDate();

    // Format the date and time
    let formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

    return formattedDate;
}
