<?php

namespace Database\Seeders;

use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->delete();
        $data = [
            [
                'title' => 'Product 1',
                'selling_price' => 2000,
                'buying_price' => 1000,
                'description' => 'Product 1 Description',
                'image' => null,
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Product 2',
                'selling_price' => 5000,
                'buying_price' => 4000,
                'description' => 'Product 2 Description',
                'image' => null,
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Product 3',
                'selling_price' => 77000,
                'buying_price' => 70000,
                'description' => 'Product 3 Description',
                'image' => null,
                'user_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ];
        Product::insert($data);

        // Testing Dummy Products
        Product::factory(100)->create();
    }
}
