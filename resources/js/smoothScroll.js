let sections = document.getElementsByTagName('section');

function offset(el) {
    return {
        top: el.offsetTop,
        left: el.offsetLeft
    }
}

let pos = document.documentElement.scrollTop;
let direction = 'down';

function findNearest(current, offsets) {
    if (current > pos) {
        direction = 'down';
        pos = current;
    } else {
        direction = 'up';
        pos = current;
    }

    let difference = null;
    let offset = null;

    offsets.forEach((currentOffset) => {
        let currentDifference = current - currentOffset;

        if (offset === null) {
            offset = currentOffset;
        }

        if (difference === null) {
            difference = currentDifference;
        }

        if (direction === 'down') {
            if (Math.abs(currentDifference) - 200 < difference) {
                difference = currentDifference;
                offset = currentOffset;
            }
        } else {
            if (Math.abs(currentDifference) + 200 < difference) {
                difference = currentDifference;
                offset = currentOffset;
            }
        }

    })

    return offset;
}

let elements = Array.from(sections).map(
    (element) => {
        return [offset(element).top, element]
    }
);

let map = new Map(elements);
const offsets = Array.from(map.keys());
let currentPosition = window.scrollY || document.documentElement.scrollTop;

window.addEventListener( 'scroll', function (event) {
    const top = window.scrollY || document.documentElement.scrollTop;
    let nearest = findNearest(top, offsets);

    const element = map.get(nearest);

    if (nearest !== currentPosition ) {
        document.documentElement.scrollTo({
            top: offset(element).top,
            behavior: 'smooth'
        });

        currentPosition = nearest;

        event.preventDefault();
        event.stopPropagation();

        return true;
    }
}, {passive:false} );
