CREATE DATABASE RetailStoreDB;
GO

USE RetailStoreDB;
GO


-- 1

CREATE TABLE Suppliers (
    SupplierID INT IDENTITY(1,1) PRIMARY KEY,
    SupplierName VARCHAR(100),
    ContactNumber VARCHAR(50)
);

CREATE TABLE Products (
    ProductID INT IDENTITY(1,1) PRIMARY KEY,
    ProductName VARCHAR(100),
    Price DECIMAL(10,2),
    StockQuantity INT,
    SupplierID INT,
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

CREATE TABLE Sales (
    SaleID INT IDENTITY(1,1) PRIMARY KEY,
    ProductID INT,
    QuantitySold INT,
    SaleDate DATE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);


-- 2

ALTER TABLE Products
ADD Category VARCHAR(100);


-- 3

ALTER TABLE Products
DROP COLUMN Category;


-- 4

ALTER TABLE Suppliers
ALTER COLUMN ContactNumber VARCHAR(15);


-- 5

ALTER TABLE Products
ALTER COLUMN ProductName VARCHAR(100) NOT NULL;


-- 6

INSERT INTO Suppliers (SupplierName, ContactNumber)
VALUES ('FreshFoods', '01001234567');

INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
VALUES ('Milk', 15.00, 50, 1),
('Bread', 10.00, 30, 1),
('Eggs', 20.00, 40, 1);

INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
VALUES (1, 2, '2025-05-20');

-- 7

UPDATE Products
SET Price = 25.00
WHERE ProductName = 'Bread';


-- 8

DELETE FROM Products
WHERE ProductName = 'Eggs';


-- 9

SELECT 
    Products.ProductID,
    Products.ProductName,
    ISNULL(SUM(Sales.QuantitySold), 0) AS TotalQuantitySold
FROM Products
LEFT JOIN Sales
ON Products.ProductID = Sales.ProductID
GROUP BY Products.ProductID, Products.ProductName;


-- 10

SELECT TOP 1 *
FROM Products
ORDER BY StockQuantity DESC;


-- 11

SELECT *
FROM Suppliers
WHERE SupplierName LIKE 'F%';


-- 12

SELECT Products.*
FROM Products
LEFT JOIN Sales
ON Products.ProductID = Sales.ProductID
WHERE Sales.ProductID IS NULL;


-- 13

SELECT 
    Sales.SaleID,
    Products.ProductName,
    Sales.QuantitySold,
    Sales.SaleDate
FROM Sales
INNER JOIN Products
ON Sales.ProductID = Products.ProductID;


-- 14

USE master;
GO

CREATE LOGIN store_manager
WITH PASSWORD = 'StoreManager@12345';
GO

USE RetailStoreDB;
GO

CREATE USER store_manager
FOR LOGIN store_manager;
GO

GRANT SELECT, INSERT, UPDATE
ON dbo.Suppliers
TO store_manager;

GRANT SELECT, INSERT, UPDATE
ON dbo.Products
TO store_manager;

GRANT SELECT, INSERT, UPDATE
ON dbo.Sales
TO store_manager;


-- 15

REVOKE UPDATE
ON dbo.Suppliers
FROM store_manager;

REVOKE UPDATE
ON dbo.Products
FROM store_manager;

REVOKE UPDATE
ON dbo.Sales
FROM store_manager;


-- 16

GRANT DELETE
ON dbo.Sales
TO store_manager;