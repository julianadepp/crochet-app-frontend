import React from 'react';
import { Link } from 'react-router-dom';

function Nav({setShowInfo, setShowYarnInfo, setShowStitchInfo, setShowGaugeInfo }) {
    function handleClick(){ 
        setShowInfo(false)
        setShowYarnInfo(false)
        setShowStitchInfo(false)
        setShowGaugeInfo(false)
    }

    return (
        <div className='navDiv'>
            <Link to='/'>Home </Link>
            <Link to='/hooks'>Hooks </Link><Link to='/hooks/new/' onClick={handleClick}>+ </Link>
            <Link to='/yarns'>Yarns </Link><Link to='/yarns/new/' onClick={handleClick}>+ </Link>
            <Link to='/stitches'>Stitches </Link><Link to='/stitches/new/' onClick={handleClick}>+ </Link>
            <Link to='/gauges'>Gauges </Link><Link to='/gauges/new/' onClick={handleClick}>+ </Link>
            <Link to='/patterns'>Patterns</Link><Link to='/patterns/new/' onClick={handleClick}>+ </Link>
        </div>
    );
}

export default Nav;