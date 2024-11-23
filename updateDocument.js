const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'task-manager';

async function main() {
    try {
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');
        const db = client.db(namaDatabase);

        const collection = db.collection('pengguna');

        // Ambil semua data dari koleksi pengguna
        const pengguna = await collection.find().toArray();

        // Simpan nama dan usia yang sudah ditemukan untuk memastikan keunikan
        const namaSet = new Set();
        const usiaSet = new Set();

        // Proses setiap dokumen
        for (const user of pengguna) {
            let { nama, usia } = user;

            // Pastikan nama unik
            while (namaSet.has(nama)) {
                nama += '_1'; // Tambahkan suffix untuk memastikan keunikan
            }
            namaSet.add(nama);

            // Pastikan usia unik
            while (usiaSet.has(usia)) {
                usia += 1; // Tambahkan 1 untuk memastikan keunikan
            }
            usiaSet.add(usia);

            // Perbarui dokumen di database
            await collection.updateOne(
                { _id: new ObjectId(user._id) },
                { $set: { nama, usia } }
            );
        }

        console.log('Semua data telah diperbarui dan dibuat unik.');
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    } finally {
        client.close();
    }
}

main();