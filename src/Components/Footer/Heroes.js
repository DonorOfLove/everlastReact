import React from 'react';
import Hero from "../../unitsScripts/Hero";

const Heroes = (props) => {
    let user = props.state.user
    let setUser = props.state.setUser
    let heroes = props.state.heroes
    let setHeroes = props.state.setHeroes


    const addToCamp = (id, hero) => {
        if (heroes.length === 3) {
            setUser({...user,modalVision:true,modalText:'Ugg,it\'\s a bit crowded in here'})
        } else {
            setHeroes(heroes.concat(hero))
            const newHeroes = user.heroesPull.filter((hero) => hero.id !== id);
            setUser({...user,heroesPull:newHeroes})
            }
    }

    const remove = (id, hero) => {
        const newUserHeroes=user.heroesPull.concat(hero)
        setUser( {...user,heroesPull:newUserHeroes})
        const newHeroes = heroes.filter((hero) => hero.id !== id);
        setHeroes(newHeroes);
    }


    return (
        <div>
            <div className='heroes'>
                <span>Camp:</span>
                {heroes.map((hero, index) => {
                    return (<Hero hero={hero}
                                  key={hero.id}
                                  index={index}
                                  remove={() => remove(hero.id, hero)   }/>)
                })}
            </div>
            <div className='heroes'>
                <span>Pull:</span>
                {user.heroesPull.map((hero, index) => {
                    return (<Hero hero={hero}
                                  key={hero.id}
                                  index={index}
                                  addToCamp={() => addToCamp(hero.id, hero)}/>)
                })}
            </div>
        </div>)
};

export default Heroes;