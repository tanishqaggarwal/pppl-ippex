//Vector utilities for modules.

Array.prototype.add = function( b ) {
    var a = this,
        c = [];
    if( Object.prototype.toString.call( b ) === '[object Array]' ) {
        if( a.length !== b.length ) {
            throw "Array lengths do not match.";
        } else {
            for( var i = 0; i < a.length; i++ ) {
                c[ i ] = a[ i ] + b[ i ];
            }
        }
    } else if( typeof b === 'number' ) {
        for( var i = 0; i < a.length; i++ ) {
            c[ i ] = a[ i ] + b;
        }
    }
    return c;
};

Array.prototype.subtract = function( b ) {
    var a = this,
        c = [];
    if( Object.prototype.toString.call( b ) === '[object Array]' ) {
        if( a.length !== b.length ) {
            throw "Array lengths do not match.";
        } else {
            for( var i = 0; i < a.length; i++ ) {
                c[ i ] = a[ i ] - b[ i ];
            }
        }
    } else if( typeof b === 'number' ) {
        for( var i = 0; i < a.length; i++ ) {
            c[ i ] = a[ i ] - b;
        }
    }
    return c;
};

Array.prototype.magnitude = function() {
    var a = this;
    sum = 0;
    for(var i = 0; i < a.length; i++) {
        sum += a[i] * a[i];
    }
    return sum;
};

//Scalar product
Array.prototype.sproduct = function( b ) {
    var a = this,
        c = [];
    if( typeof b === 'number' ) {
        for( var i = 0; i < a.length; i++ ) {
            c[ i ] = a[ i ] * b;
        }
    }
    return c;
};

//Dot product
Array.prototype.dproduct = function( b ) {
    var a = this,
        c = [];
    if( Object.prototype.toString.call( b ) === '[object Array]' ) {
        if( a.length !== b.length ) {
            throw "Array lengths do not match.";
        } else {
            for( var i = 0; i < a.length; i++ ) {
                c[ i ] = a[ i ] * b[ i ];
            }
        }
    }
    return c;
};

//Cross product
Array.prototype.cproduct = function( b ) {
    var a = this,
        c = [];
    if( Object.prototype.toString.call( b ) === '[object Array]' ) {
        if( a.length !== b.length && (a.length != 3 || a.length != 2) ) {
            throw "Array lengths are not proper.";
        } 
        else if (a.length == 3) {
            c[0] = a[1]*b[2] - a[2]*b[1];
            c[1] = a[2]*b[0] - a[0]*b[2];
            c[2] = a[0]*b[1] - a[1]*b[0];
        }
        else {
            return a[0] * b[1] - a[1] * b[0];
        }
    }
    return c;
};

Array.prototype.greaterMag = function( b ) {
    var a = this,
        c = [];
    if( Object.prototype.toString.call( b ) === '[object Array]' ) {
        if( a.length !== b.length) {
            throw "Array lengths are not proper.";
        } else {
            sum_a = 0;
            sum_b = 0;
            for(var i = 0; i < a.length; i++) {
                sum_a += a[i] * a[i];
                sum_b += b[i] * b[i];
            }
            return sum_a >= sum_b;
        }
    }
    return c;
};
