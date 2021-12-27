import React from 'react';

const Boss = (props) => {
  const stats=props.stats
    return (
        <div className={'boss'}>
            {stats.hp}
            cосс
        </div>
    );
};

export default Boss;