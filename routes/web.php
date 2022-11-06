<?php

use App\Http\Controllers\DynamicToken;
use Illuminate\Support\Facades\Route;
use Statamic\Facades\Site;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Dynamic Token route for posting a form with Ajax.
Route::get('/!/DynamicToken/refresh', [DynamicToken::class, 'getRefresh']);

// The Sitemap Index route for listing sitemaps of all (multi)sites.
Route::statamic('/sitemaps.xml', 'sitemap/sitemaps', [
    'layout' => null,
    'content_type' => 'application/xml'
]);

// The Default Site Sitemap route.
Route::statamic('/sitemap.xml', 'sitemap/sitemap', [
    'layout' => null,
    'content_type' => 'application/xml'
]);

// The Multisite Site Sitemap route(s).
Route::statamic('/{site_handle}/sitemap.xml', 'sitemap/sitemap', [
    'layout' => null,
    'content_type' => 'application/xml'
]);

// The Manifest route to the manifest.json
Route::statamic('/site.webmanifest', 'manifest/manifest', [
    'layout' => null,
    'content_type' => 'application/json'
]);

// The Social Image route to generate social images.
Site::all()->each(function ($site) {
    Route::statamic("{$site->url()}/social-images/{id}", 'social_images', [
        'layout' => null,
    ]);
});

// The Search route to display search results with `views/search.antlers.html`.
// Route::statamic('/search', 'search', [
//     'title' => 'Search results'
// ]);
