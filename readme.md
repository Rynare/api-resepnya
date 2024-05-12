
# API Resep & Artikel Masakan Nusantara

Ini adalah API Unofficial dari Masakapahariini. project ini terinspirasi dari [**unofficial-masakapahariini-api (INACTIVE)**](https://github.com/tomorisakura/unofficial-masakapahariini-api) by **Tomorisakura**


## Usage/Examples

**Base URL :** https://api-resepnya.vercel.app/ 

### Parameter

| Parameter         | Type     | Description                |
| :---------------  | :------- | :------------------------- |
| `slug`            | `string` | Penanda unik untuk semua entitas |
| `page`            | `number` | Halaman ke-n yang ingin didapatkan, digunakan ketika   result memiliki banyak page |
| `keyword`         | `string` | Kata kunci untuk mencari resep. |
| `category_slug`   | `string` | Slug yang digunakan untuk menkategorikan resep dan artikel |
| `article_slug`    | `string` | Slug yang digunakan untuk entitas artikel |

### Endpoints

| Usage             | Route     | Example                   |
| :--------         | :-------  |:------------------------- |
| Get recipe cataegories  | `/api/recipes/categories`  | `-` |
| Get all recipe  | `/api/recipes`  | `-` |
| Get all recipe on page-n  | `/api/recipes/page/:page`  | `/api/recipes/page/1` |
| Get recipes from category  | `/api/recipes/category/:category_slug`  | `/api/recipes/category/resep-dessert` |
| Get recipes from category on page-n  | `/api/recipes/category/:category_slug/:page`  | `/api/recipes/category/resep-dessert/3` |
| Search recipes by keyword  | `/api/recipes/search/:keyword`  | `/api/recipes/search/geprek` |
| Search recipes by keyword on page-n  | `/api/recipes/search/:keyword/:page`  | `/api/recipes/search/geprek/1` |
| Get detail recipe  | `/api/recipe/:slug`  | `/api/recipe/resep-ayam-geprek-sambal-bawang` |
| Get article categories  | `/api/articles/categories`  | `-` |
| Get all article  | `/api/articles`  | `-` |
| Get all article on page-n  | `/api/articles/page/:page`  | `/api/articles/page/2` |
| Get articles from category  | `/api/articles/category/:category_slug`  | `/api/articles/category/inspirasi-dapur` |
| Get articles from category on page-n  | `/api/articles/category/:category_slug/:page`  | `/api/articles/category/inspirasi-dapur/1` |
| Get article detail  | `/api/article/:category_slug/:article_slug`  | `/api/article/makanan-gaya-hidup/menu-lebaran-yang-praktis` |

