export default {
    get weightsMockObject() {
        return {
            _links: {
                self: {
                    href: 'http://localhost:4000/weighings/protego-2020',
                    method: 'GET',
                },
                'create-weighing': {
                    href: 'http://localhost:4000/weighing/protego-2020',
                    method: 'POST',
                },
            },
            _embedded: {
                item: [
                    {
                        id: '61a5e77aaefb3c421907e777',
                        weight: 75000,
                        day: '2021-08-15',
                        moment: 'before-breakfast',
                        _links: {},
                    },
                    {
                        id: '61a777083dcfe8002d9ec93a',
                        weight: 76300,
                        day: '2021-11-13',
                        moment: 'before-dinner',
                        _links: {
                            'edit-weighing': {
                                href: 'http://localhost:4000/weighing/61a777083dcfe8002d9ec93a',
                                method: 'PUT',
                            },
                            'delete-weighing': {
                                href: 'http://localhost:4000/weighing/61a777083dcfe8002d9ec93a',
                                method: 'DELETE',
                            },
                        },
                    },
                ],
            },
        };
    },
    get weightMockObject() {
        return {
            day: '2021-01-01',
            moment: 'before-dinner',
            weight: 75000,
            disableEdit: false,
        };
    },
    get weightObjectEditMock() {
        return {
            index: 0,
            moment: 'before-dinner',
            weight: 79000,
            day: '2021-02-02',
            link: 'weighing/61a777083dcfe8002d9ec93a',
        };
    },
    get weightObjectDeleteMock() {
        return {
            index: 0,
            link: 'weighing/61a777083dcfe8002d9ec93a',
        };
    },
};
