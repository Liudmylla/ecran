
import { PersonIcon } from '@primer/octicons-react';
import React from 'react';

const HeaderColEquipe = (data) => {
    return (
        <div><PersonIcon size={16} /> {data.column.caption}</div>
    )
}

export default HeaderColEquipe