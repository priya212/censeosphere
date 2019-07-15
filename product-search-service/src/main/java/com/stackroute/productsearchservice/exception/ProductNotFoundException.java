package com.stackroute.productsearchservice.exception;

public class ProductNotFoundException extends Exception {
    private String message;
    public ProductNotFoundException(){}

    public ProductNotFoundException(String message) {
        super(message);
        this.message=message;
    }
}
