import React,{useEffect,useContext} from 'react';
import BattleHero from "../../unitsScripts/BattleHero";
import Enemy from "../../unitsScripts/Enemy";
import Context from "../../context";
import {logDOM} from "@testing-library/react";


const EverlastTower = (props) => {
    const context=useContext(Context)
    let enemies=context.classEn
    let heroes=context.classHeroes


        function atck(hero){
       setInterval(()=>{
               console.log(hero)
           enemies[0].getDamage(hero.damage)
               console.log( enemies[0].hp)}
       ,3000)


   }
    return (
        <div className={'BGWrap'}>
            <div className={'BG__heroes'}>
                {heroes.map((hero) => {
                    return (<BattleHero hero={hero}
                                        key={hero.key}
                                        animation={hero.animation}
                                        atck={atck(hero)}
                    />)
                })}

            </div>
            <div className={'BG__enemies'}>
                {enemies.map((enemy) => {
                    return (<Enemy enemy={enemy}
                                   key={enemy.key}
                    />)
                })}
            </div>
        </div>
    );
};

export default EverlastTower;