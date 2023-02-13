## Pertama-tama

1. `npm install`
2. `npm install -g knex` untuk menjalankan knex-cli
3. cocokan koneksi database di file `knexfile.js` dengan komputer anda
4. run migration khusus pada file `router.js` dengan cara
5. `knex migrate:up 20230213071446_router.js` ini akan mengenerate table pada pg server yang anda setup di `knexfile.js`
6. anda bisa menambahkan `seed` jika anda mau, dengan create seed `knex seed:make <nama seed>`
7. setelah semuanya berhasil pastikan mempunyai googlemaps api dengan service routes api aktif
8. run bersamaan dengan client `npm run concurrent` di root directory
9. :)

Table on Db looks like?
![db dekstop using dbeaver](https://github.com/ngrhadi/googlemaps-routing/blob/master/public/table_pg.png?raw=true)
