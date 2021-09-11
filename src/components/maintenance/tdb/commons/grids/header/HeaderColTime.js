import { ClockIcon } from '@primer/octicons-react';
import React from 'react';

const HeaderColTime = (data) => {
    return (
        <div><ClockIcon size={16} /> {data.column.caption}</div>
    )
}

export default HeaderColTime