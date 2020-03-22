import React from 'react';
import './GoogleApp.css';

export default function GoogleApp(props) {
  return (
    <div className="singleApp">
        <h2>{ props.App }</h2>
        <div className="rating">Rating: { props.Rating }</div>
        <div className="price">Price: { props.Price }</div>
        <div className="reviews">Number of Reviews: { props.Reviews }</div>
        <div className="size">Size: { props.Size }</div>
        <div className="totalInstalls">Total Installs: { props.Installs }</div>
        <div className="type">Type: { props.Type }</div>
        <div className="contentRating">Content Rating: { props["Content Rating"] }</div>
        <div className="genres">Genres: { props.Genres.replace(";", ", ") }</div>
        <div className="lastUpdated">Last Updated: { props["Last Updated"] }</div>
        <div className="currentVer">Current Version: { props["Current Ver"] }</div>
        <div className="androidVer">Android Version: { props["Android Ver"] }</div>
    </div>
  );
}