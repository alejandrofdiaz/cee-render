import { isNumber } from 'lodash';

function Suma(v1: number, v2: number) {
    if (isNumber(v1) && isNumber(v2)) {
        return v1 + v2;
    }
    else {
        return 0
    }
}

export default Suma;
