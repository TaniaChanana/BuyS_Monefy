const mysql = require('mysql');
const cred = require('./credentials');

class TABLES {
    
    constructor(){
        
        this.db = mysql.createConnection({
            ...cred,
            database: 'buys_monefy'
        });

        this.sql = {
            address_details : 'CREATE TABLE IF NOT EXISTS address_details(addressId int auto_increment, city varchar(20), state varchar(20), address varchar(100), pinCode varchar(6), primary key(addressId))',
            user_details : 'CREATE TABLE IF NOT EXISTS user_details(userId int auto_increment, fname varchar(50), lname varchar(50), phoneNumber varchar(12), emailAddress varchar(30), userName varchar(30), userType int, addressId int, PRIMARY KEY (userId), unique key unq_user_details_2 (userName,userType), CONSTRAINT user_details_ibfk_1 FOREIGN KEY (addressId) REFERENCES address_details (addressId))',
            login_details : 'CREATE TABLE IF NOT EXISTS login_details(userId int NOT NULL, password varbinary(500) DEFAULT NULL, lastSignedIn datetime DEFAULT NULL,PRIMARY KEY (userId), CONSTRAINT login_details_ibfk_1 FOREIGN KEY (userId) REFERENCES user_details (userId))',
            item_category_details : 'CREATE TABLE IF NOT EXISTS item_category_details(categoryId int NOT NULL AUTO_INCREMENT, categoryName varchar(30) DEFAULT NULL,PRIMARY KEY (categoryId))',
            item_tbl : 'CREATE TABLE IF NOT EXISTS item_tbl(itemId int NOT NULL AUTO_INCREMENT, itemName varchar(30) DEFAULT NULL,categoryId int not null , PRIMARY KEY (itemId) ,  unique key unq_item_tbl_2 (itemName, categoryId), CONSTRAINT item_tbl_ibfk_1 FOREIGN KEY (categoryId) REFERENCES item_category_details (categoryId))',
            item_details : 'CREATE TABLE IF NOT EXISTS item_details(itemDetailsId int AUTO_INCREMENT, categoryId int DEFAULT NULL, itemId int DEFAULT NULL, brandName varchar(50) , PRIMARY KEY (itemDetailsId), UNIQUE KEY unq_item_details_3 (categoryId,itemId,brandName), CONSTRAINT item_details_ibfk_1 FOREIGN KEY (categoryId) REFERENCES item_category_details (categoryId), CONSTRAINT item_details_ibfk_2 FOREIGN KEY (itemId) REFERENCES item_tbl (itemId))',
            supplier_item_details : 'CREATE TABLE IF NOT EXISTS supplier_item_details(supplierItemDetailsId int NOT NULL AUTO_INCREMENT, itemDetailsId int DEFAULT NULL, userId int DEFAULT NULL, pricePerItem int DEFAULT NULL, availableItems int DEFAULT NULL, PRIMARY KEY (supplierItemDetailsId), UNIQUE KEY unq_supplier_item_details_2 (itemDetailsId,userId), CONSTRAINT supplier_item_details_ibfk_1 FOREIGN KEY (userId) REFERENCES login_details (userId), CONSTRAINT supplier_item_details_ibfk_2 FOREIGN KEY(itemDetailsId) REFERENCES item_details(itemDetailsId))',
            buyer_item_purchase : 'CREATE TABLE IF NOT EXISTS buyer_item_purchase (buyerItemPurchaseId int NOT NULL AUTO_INCREMENT, supplierItemDetailsId int DEFAULT NULL, userId int DEFAULT NULL, noOfItems int DEFAULT NULL, totalPrice int DEFAULT NULL, modeOfPayment int DEFAULT NULL,purchaseDateTime datetime DEFAULT NULL,status int,PRIMARY KEY (buyerItemPurchaseId),UNIQUE KEY unq_buyer_item_purchase_3 (supplierItemDetailsId,userId,purchaseDateTime),CONSTRAINT buyer_item_purchase_ibfk_1 FOREIGN KEY (supplierItemDetailsId) REFERENCES supplier_item_details(supplierItemDetailsId), CONSTRAINT buyer_item_purchase_ibfk_2 FOREIGN KEY (userId) REFERENCES login_details (userId))',
            media_details : 'create table if not exists media_details (mediaId int auto_increment, mediaName varchar(70), primary key(mediaId))',
            bank_details : 'CREATE TABLE IF NOT EXISTS bank_details(bankId int NOT NULL AUTO_INCREMENT, bankName varchar(50) DEFAULT NULL, ifscCode varchar(50) DEFAULT NULL, addressId int DEFAULT NULL, branchCode varchar(50) DEFAULT NULL, rateOfInterest float, PRIMARY KEY (bankId), UNIQUE KEY unq_bank_details_1 (ifscCode), CONSTRAINT bank_details_ibfk_1 FOREIGN KEY (addressId) REFERENCES address_details (addressId))',
            user_account_details : 'CREATE TABLE IF NOT EXISTS user_account_details(userAccountDetailsId int NOT NULL AUTO_INCREMENT, userId int DEFAULT NULL, bankId int DEFAULT NULL,amount int DEFAULT NULL, accountNumber varchar(50) NOT NULL, PRIMARY KEY (userAccountDetailsId),UNIQUE KEY unq_user_account_details_1 (accountNumber), CONSTRAINT user_account_details_ibfk_1 FOREIGN KEY (userId) REFERENCES login_details (userId), CONSTRAINT user_account_details_ibfk_2 FOREIGN KEY (bankId) REFERENCES bank_details (bankId))',
            loan_details : 'CREATE TABLE IF NOT EXISTS loan_details(loanDetailsId int NOT NULL AUTO_INCREMENT, userAccountDetailsId int DEFAULT NULL, loanAmount int DEFAULT NULL, mediaIdCollateral int DEFAULT NULL, mediaIdLoanPDF int, loanDateTime datetime DEFAULT NULL, status int DEFAULT NULL, emiMonths int DEFAULT NULL, interestAmount int DEFAULT NULL, totalAmountToBePaid int DEFAULT NULL, PRIMARY KEY (loanDetailsId), UNIQUE KEY unq_loan_details_2 (userAccountDetailsId,loanDateTime), CONSTRAINT loan_details_ibfk_1 FOREIGN KEY (userAccountDetailsId) REFERENCES user_account_details (userAccountDetailsId),CONSTRAINT loan_details_ibfk_2 FOREIGN KEY (mediaIdCollateral) REFERENCES media_details (mediaId), CONSTRAINT loan_details_ibfk_3 FOREIGN KEY (mediaIdLoanPDF) REFERENCES media_details (mediaId))',
            payment_details : 'CREATE TABLE IF NOT EXISTS payment_details(paymentId int NOT NULL AUTO_INCREMENT, paidAmount int DEFAULT NULL, modeOfPayment int NOT NULL, timeOfPayment datetime DEFAULT NULL, fromUserAccountDetailsId int DEFAULT NULL, toUserAccountDetailsId int DEFAULT NULL, PRIMARY KEY (paymentId), UNIQUE KEY unq_payment_details_3 (fromUserAccountDetailsId,toUserAccountDetailsId,timeOfPayment), CONSTRAINT payment_details_ibfk_1 FOREIGN KEY (fromUserAccountDetailsId) REFERENCES user_account_details (userAccountDetailsId), CONSTRAINT payment_details_ibfk_2 FOREIGN KEY (toUserAccountDetailsId) REFERENCES user_account_details (userAccountDetailsId))'
        };
        
    }

    initTable() {
        for(let i in this.sql){
            this.db.query(this.sql[i], (err, result) => {
                if(err)

                    console.log(`Couldn't create table ${i} and error is ${err}`);
                else
                    console.log(`Successfully created table ${i}`);
            })
        }
    }
}

module.exports = TABLES;