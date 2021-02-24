// NOTE: replace 'bmjpkU8bBWRse2JwKgzOGTv5tUI3' with your Firebase auth user id (can be taken from Firebase at the auth section! Look for User UID)
export function seedDatabase(firebase) {
    const users = [
        {
            userId: 'BfIrWrIWEXMJupt2g8F4XGaY3ns2',
            username: 'isabel',
            fullName: 'Isabel Hong',
            emailAddress: 'hong.isabel@gmail.com',
            following: ['2'],
            followers: ['2', '3', '4'],
            dateCreated: Date.now()
        },
        {
            userId: '2',
            username: 'sofia',
            fullName: 'Sofia Ara',
            emailAddress: 'sofi@gmail.com',
            following: [],
            followers: ['BfIrWrIWEXMJupt2g8F4XGaY3ns2'],
            dateCreated: Date.now()
        },
        {
            userId: '3',
            username: 'Daniela',
            fullName: 'Daniela Gia',
            emailAddress: 'dani@gmail.com',
            following: [],
            followers: ['BfIrWrIWEXMJupt2g8F4XGaY3ns2'],
            dateCreated: Date.now()
        },
        {
            userId: '4',
            username: 'munchies',
            fullName: 'Munchies Croissant',
            emailAddress: 'mc@gmail.com',
            following: [],
            followers: ['BfIrWrIWEXMJupt2g8F4XGaY3ns2'],
            dateCreated: Date.now()
        }
    ];

    for (let k = 0; k < users.length; k++) {
        firebase.firestore().collection('users').add(users[k]);
    }

    for (let i = 1; i <= 5; ++i) {
        firebase
            .firestore()
            .collection('photos')
            .add({
                photoId: i,
                userId: '2',
                imageSrc: `/images/users/raphael/${i}.jpg`,
                caption: 'Saint George and the Dragon',
                likes: [],
                comments: [
                    {
                        displayName: 'dali',
                        comment: 'Love this place, looks like my animal farm!'
                    },
                    {
                        displayName: 'orwell',
                        comment: 'Would you mind if I used this picture?'
                    }
                ],
                userLatitude: '40.7128°',
                userLongitude: '74.0060°',
                dateCreated: Date.now()
            });
    }
}
