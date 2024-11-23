const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main() {
    try {
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');
        const db = client.db(namaDatabase);

        // Mencari pengguna berdasarkan nama "Indra Yones"
        console.log('Mencari pengguna berdasarkan nama "Indra Yones"...');
        let byNama;
        try {
            byNama = await db.collection('pengguna').findOne({ nama: 'Indra Yones' });
        } catch (error) {
            console.error('Error mencari berdasarkan nama:', error);
        }

        // Mencari pengguna berdasarkan ID objek
        console.log('Mencari pengguna berdasarkan ID objek "6741efb859384ace7b8d0640"...');
        let byObjectID;
        try {
            byObjectID = await db.collection('pengguna').findOne({ _id: new ObjectId("6741efb859384ace7b8d0640") });
        } catch (error) {
            console.error('Error mencari berdasarkan ID objek:', error);
        }

        // Mencari pengguna dengan usia 20
        console.log('Mencari pengguna dengan usia 20...');
        let toArray;
        try {
            toArray = await db.collection('pengguna').find({ usia: 20 }).toArray();
        } catch (error) {
            console.error('Error mencari berdasarkan usia:', error);
        }

        // Memeriksa hasil pencarian secara terpisah
        if (byNama) {
            console.log('Data Pengguna ditemukan (berdasarkan nama):', byNama);
        } else {
            console.log('Data Pengguna tidak ditemukan berdasarkan nama');
        }

        if (byObjectID) {
            console.log('Data Pengguna ditemukan (berdasarkan ID Objek):', byObjectID);
        } else {
            console.log('Data Pengguna tidak ditemukan berdasarkan ID Objek');
        }

        if (toArray && toArray.length > 0) {
            console.log('Data Pengguna ditemukan (dalam format Array):', toArray);
        } else {
            console.log('Data Pengguna tidak ditemukan berdasarkan usia');
        }
    } catch (err) {
        console.error('Kesalahan utama:', err);
    } finally {
        await client.close();
    }
}

// Memanggil fungsi 'main' dan menangani kesalahan (jika ada) dengan mencetak pesan kesalahan ke konsol.
main().catch(console.error);