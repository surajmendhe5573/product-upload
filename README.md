# Product Upload API

## Overview

This project is a RESTful API built with Express.js and MongoDB that facilitates the management of product information, including image uploads. It uses Multer for handling file uploads and ensures that necessary directories are created if they don't exist.

## Features

- **Product Management**: Create and manage product details including name, category, code, description, size, wood type, finish type, and price.
- **Retrieve Products**: Fetch a list of all products.
- **Create variant**: Add a variant to an existing product.
- **Show variant**:Display detailed information about the main product and its variants.


# API Documentation

## Create a Product
### Product 
- **URL:** `http://localhost:5000/api/products`
- **Method:** `POST`


### Form Data
The request must be sent as `form-data` and include the following fields:

- **productName** (string, required): The name of the product.
- **productCategory** (string, required): The category of the product.
- **productCode** (string, required): A unique code for the product.
- **smallDescription** (string, required): A brief description of the product.
- **detailedDescription** (string, required): A detailed description of the product.
- **productSize** (string, required): The size of the product.
- **productWoodType** (string, required): The type of wood used for the product.
- **finishType** (string, required): The type of finish applied to the product.
- **productPrice** (number, required): The price of the product.
- **images** (file, multiple, up to 10 files): Upload one or more image files of the product.


## Retrieve All Products

### Description
Retrieves a list of all products from the database.
##  Retrieve All Products
### Product 
- **URL:** `http://localhost:5000/api/products`
- **Method:** `GET`


## Add Variant to a Product

**URL:** `http://localhost:5000/api/products/:mainProductName/variant`

**Method:** `POST`

**Description:** Adds a variant to an existing product by providing variant details and uploading images.


### Body

- `variantName` (string): Name of the variant.
- `productSize` (string): Size of the product.
- `productWoodType` (string): Wood type used.
- `finishType` (string): Finish type of the product.
- `productPrice` (number): Price of the variant.

### Responses

- **201 Created:** The variant was successfully added.
- **404 Not Found:** The main product was not found.
- **500 Server Error:** An error occurred on the server.

## Show Variants of a Product

**URL:** `http://localhost:5000/api/:productName/variants`

**Method:** `GET`

**Description:** Retrieve all variants associated with a specified main product.

### Responses

- **200 OK:** Returns the main product and its associated variants.
- **404 Not Found:** The specified main product was not found.
- **500 Server Error:** An error occurred on the server.

## Set Up Environment Variables

Create a `.env` file in the root directory of your project and add your environment variables. Below is an example `.env` file:

**Example `.env` file:**
```env
MONGO_URI= mongodb://localhost:27017/defaultdb
PORT= 3000
