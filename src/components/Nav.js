import React from 'react';
import { Link } from 'react-router-dom';

function Nav({setShowInfo, setShowYarnInfo, setShowStitchInfo}) {
    function handleClick(){ 
        setShowInfo(false)
        setShowYarnInfo(false)
        setShowStitchInfo(false)
    }

    return (
        <div>
            <Link to='/hooks'>Hooks </Link><Link to='/hooks/new/' onClick={handleClick}>+ </Link>
            <Link to='/yarns'>Yarns </Link><Link to='/yarns/new/' onClick={handleClick}>+ </Link>
            <Link to='/stitches'>Stitches </Link><Link to='/stitch/new/' onClick={handleClick}>+ </Link>
            <Link to='/gauges'>Gauges </Link>
            <Link to='/patterns'>Patterns</Link>
        </div>
    );
}

export default Nav;