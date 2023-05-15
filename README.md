

# Test Rekrutment Nutech

Sebelumnya terima kasih sudah memberikan saya kesempatan untuk mengerjakan test ini.
Ada beberapa hal yang sangat disayangkan dalam test ini.
Saya melamar sebagai React.js Developer tapi test nya disebut saya harus membuat CRUD akan tetapi tidak disediakan API untuk data nya. Jadi saya harus membuat backend nya sendiri.

Dan karena saya tidak berpengalaman dalam membuat backend, jadi saya buat backend seadanya.

Karena saya tidak punya resource untuk deploy backend ke production, jadi frontend nya pun tidak saya deploy ke hosting seperti Vercel, Netlify, dll. karena data / API nya berada di localhost.

## Fitur
- CRUD
- Auth pakai JWT
- Pagination
- Search

## Teknologi yang digunakan
### Frontend
- React / Next.js
- Typescript
- Tailwind + Flowbite
- React Query + Axios
- Zustand
- React Hook Form + Yup

### Backend
- Laravel 9
- Mysql

## Cara Instalasi
Untuk membuka website nya, kalian harus menjalankan server frontend dan backend secara bersamaan.

- clone git ini

    ```bash
    git clone https://github.com/dhafagk/rekrutmen-nutech.git
    ```

- masuk ke folder `backend`

    ```bash
    cd backend
    ```

- install composer

    ```bash
    composer install
    ```

- set env

    ```bash
    cp .env.copy .env
    ```

- buat database `stok_barang` di phpmyadmin
- migrate

    ```bash
    php artisan migrate:refresh --seed
    ```

- generate swagger api

    ```bash
    php artisan l5-swagger:generate
    ```

- lakukan optimize (optional)

    ```bash
    php artisan optimize
    ```
    
- jalankan server

    ```bash
    php artisan serve
    ```
- setelah itu diamkan saja servernya, balik lagi ke terminal dan masuk ke folder `frontend`

    ```bash
    cd..
    cd frontend
    ```
 - install npm

    ```bash
    npm install
    ```
- jalankan server

    ```base
    npm run dev
    ```
- setelah itu buka, `http://localhost:3000/`
- harap membuat akun terlebih dahulu untuk bisa login

## Kekurangan
- Tidak bisa edit produk (Bug di Backend)

## Author
Dhafa Gustiadi Kurniawan
