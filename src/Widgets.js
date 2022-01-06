import React from 'react';
import './Widgets.css'
import InfoIcon from '@mui/icons-material/Info';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'

function Widgets() {

    const newsArticle = (heading, subtitle) => (
        <div className='widgets__article'>
            <div className='widgets__articleLeft'>
                <FiberManualRecordIcon />
            </div>
            <div className='widgets__articleRight'>
                <h4>{heading}</h4>
                <p>{subtitle}</p>
            </div>
        </div>
    )

    return (
        <div className='widgets'>
            <div className='widgets__header'>
                <h2>LinkedIn News</h2>
                <InfoIcon />
            </div>
            {newsArticle("ReactJS is fun, you gotta try it out", 'Top news - 9000 readers')}
            {newsArticle("CoronaVirus: UK updates", 'Top news - 608 readers')}
            {newsArticle("Tesla hits new highs", 'Cars & auto - 380 readers')}
            {newsArticle("Bitcoin breaks $60k", 'Crypto - 3020 readers')}
            {newsArticle("Is Redux the fastest?", 'Code - 123 readers')}
            {newsArticle("KFC online has resumed back", 'Food - 1003 readers')}
        </div>
    )
}

export default Widgets
