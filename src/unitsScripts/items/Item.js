import React from 'react';
import map from "../../Components/Footer/Map";

const Item = (props) => {

    const items = props.stats

    const objectMap = (obj, fn) =>
        Object.fromEntries(
            Object.entries(obj).map(
                ([k, v], i) => [k, fn(v, k, i)]
            )
        )
        const mapfn=()=>{
            console.log('s')}
    console.log(objectMap(items,mapfn))
    function showStats() {
        for (let item in items) {
            for (let stat in items[item]) {
                console.log(stat)
                console.log(Object.fromEntries(item))
                  //  return <li>{stat + ':' + items[item][stat]}</li>
            }


        }
    }

    return (
        <div>
            <ul></ul>
        </div>
    );
};

export default Item;