export default function (heroes,action) {
    switch (action.type){
        case 'getDmg':
            return [
                ...heroes
            ]
        default: return heroes

    }
}