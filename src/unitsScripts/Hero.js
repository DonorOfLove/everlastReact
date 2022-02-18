import React from 'react';
import Items from "./items/Items";

const Hero = ({hero, addToCamp, remove}) => {

    function enterEvent(event) {
        event.currentTarget.lastChild.style.display = 'block'
    }

    function leaveEvent(event) {
        event.currentTarget.lastChild.style.display = 'none'
    }

    function getAdditionalStats(hero, stat) {
        let adittionalStat = 0
        for (let item of hero.items) {
            for (let key in item) {
                if (item[key].hasOwnProperty(stat)) {
                    adittionalStat += item[key][stat]
                }
            }
        }
        return adittionalStat
    }

    return (
        <div className={['hero' + ' ' + hero.role]}
             onMouseEnter={enterEvent}
             onMouseLeave={leaveEvent}
             onClick={addToCamp || remove}>
            <p>{hero.name + '\n' + hero.lvl} </p>
            <div className='stats' id='stats'>
                <ul className='stats__ul'>
                    <li>hp:{hero.hp}+<span className='additionalStats'>{getAdditionalStats(hero, 'hp')}</span></li>
                    <li>dmg:{hero.damage}+<span className='additionalStats'>{getAdditionalStats(hero, 'damage')}</span>
                    </li>
                    <li>def:{hero.defence}+<span
                        className='additionalStats'>{getAdditionalStats(hero, 'defence')}</span></li>
                    <li>atkSpd:{hero.atkSpeed}+<span
                        className='additionalStats'>{getAdditionalStats(hero, 'atkSpeed')}</span></li>
                </ul>
                <Items hero={hero}/>
            </div>
        </div>
    );
};

export default Hero;