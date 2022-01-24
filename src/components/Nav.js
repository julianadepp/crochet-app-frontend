import React from 'react';
import { Link } from 'react-router-dom';

function Nav({setShowInfo, setShowYarnInfo}) {
    function handleClick(){ 
        setShowInfo(false)
        setShowYarnInfo(false)
    }

    return (
        <div>
            <Link to='/hooks'>Hooks </Link><Link to='/hooks/new/' onClick={handleClick}>+ </Link>
            <Link to='/yarns'>Yarns </Link><Link to='/yarns/new/' onClick={handleClick}>+ </Link>
            <Link to='/stitches'>Stitches </Link>
            <Link to='/gauges'>Gauges </Link>
            <Link to='/patterns'>Patterns</Link>
        </div>
    );
}

export default Nav;