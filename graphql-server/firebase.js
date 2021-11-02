const admin = require('firebase-admin');
const serviceAccount = require('./serviceKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// db.collection('transactions').get().then(snapshot => {
//     console.log(typeof snapshot);
//     snapshot.forEach((doc) => {
//         console.log(typeof doc, doc.id, '=>', doc.data());
//     });
// })

// const data = { amount: 100, from: 'Tony', status: 'pending', to: 'Bookshop' }

const update = async (data, collection) => {
    try {
        const response = await db.collection(collection).doc(data.id).set(data)
        return 'success'
    }
    catch (err) {
        return 'fail'
    }
}

const create = async (data, collection) => {
    try {
        const response = await db.collection(collection).doc().set(data)
        return 'success'
    }
    catch (err) {
        return 'fail'
    }
}

const getAll = async (collection) => {
    try {
        const response = await db.collection(collection).get()
        //returns array of docs, and actual info. stored at doc.id
        return response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    catch (err) {
        return 'fail'
    }
}


export { update, create, getAll }