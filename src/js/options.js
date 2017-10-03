const options = {
    name: '',
    background: {
        type: 'mono',
        image: 'images/image1.jpg',
        gradient: 'linear-gradient(45deg, #0d0 0, #cdc 100%)',
        color: '#5d5'
    },
    theme: {
        color: '#fff'
    },
    links: {
        show: true
    },
    mostVisited: {
        show: true,
        items: 5
    },
    search: {
        show: true,
    },
    clock: {
        show: true,
        format: '12'
    },
    greating: {
        show: true
    },
    weather: {
        show: true,
        unit: 'c',
    },
    todo: {
        show: true
    },
    quotes: {
        show: true
    },

    get: (optionName) => this[optionName],
    load: () => {}
};

export default options;
