import React from 'react';

const Hero = ({hero, addToCamp, remove, events}) => {

    function enterEvent(event) {event.currentTarget.lastChild.style.display = 'block'}

    function leaveEvent(event) {event.currentTarget.lastChild.style.display = 'none'}


    function getAdditionalHp(hero) {
    }
    return (
        <div className={['hero' + ' ' + hero.role]}
             onMouseEnter={enterEvent || events}
             onMouseLeave={leaveEvent || events}
             onClick={addToCamp || remove}>
            <p>{hero.name + '\n' + hero.lvl} </p>

            <div className='stats' id='stats'>
                <ul className='stats__ul'>
                    <li>hp:{hero.hp}+<span className='additionalStats'>{getAdditionalHp(hero)}</span></li>
                    <li>dmg:{hero.damage}</li>
                    <li>def:{hero.defence}</li>
                    <li>atkSpd:{hero.atkSpeed}</li>
                </ul>
            </div>
        </div>
    );
};

export default Hero;