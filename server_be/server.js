const express = require('express');
const mysql = require('mysql');
const DATABASE = require('./utilities/createDB');
const TABLES = require('./utilities/createTables');
const cred = require('./utilities/credentials');
const bodyParser = require('body-parser');
const multer = require('multer')
const cors = require('cors');
const { password } = require('./utilities/credentials');

class BUYSMONEFY {

    constructor(port, app) {

        this.port = port;
        this.app = app;
        this.app.use(cors())
        // used to grab frontend infor to backend
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json())
        // serving static files
        this.app.use('/uploads', express.static('uploads'));

        this.temp = 0;

        //Initialize Database
        new DATABASE().initDB();

        //Initialize All The Tables
        new TABLES().initTable();

        this.db = mysql.createConnection({
            ...cred,
            database: 'buys_monefy'
        });

    }

    get() {

        this.app.get('/api/getAllCategories', (req, res) => {
            const sqlSelect = "Select * from item_category_details";
            this.db.query(sqlSelect, (err, result) => {
                for (let i = 0; i < result.length; i++)
                    console.log(result[i].categoryId, result[i].categoryName);
                res.send(result);
            })
        })

        this.app.get('/api/getUpdatedMediaId', (req, res) => {

            let mediaQuery = "select mediaId from media_details order by mediaId desc limit 1";
            this.db.query(mediaQuery, (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log("result", result);
                    res.send(result);
                }
            })

        })

        this.app.get('/api/getBankDetails', (req, res) => {
            const userId = req.query.userId;
            const bankFetchSql = "select u1.userName, b.bankName,b.branchCode, u.amount, u.accountNumber from user_account_details u, bank_details b, user_details u1 where b.bankId = u.bankId and u.userId = ? and u.userId = u1.userId";
            this.db.query(bankFetchSql, [userId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    res.send(result);
                }
            })
        })

        this.app.get('/api/getAllTransactions', (req, res) => {
            const paymentSql = "select u.userName as buyerName, u1.userName as supplierName, p.modeOfPayment, p.timeOfPayment, p.paidAmount from payment_details p, user_details u , user_details u1 ,  user_account_details a, user_account_details a1 where p.fromUserAccountDetailsId = a.userAccountDetailsId and p.toUserAccountDetailsId = a1.userAccountDetailsId and a.userId = u.userId and a1.userId = u1.userId order by p.timeOfPayment desc";

            this.db.query(paymentSql, (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    let obj = []
                    let j = 0
                    for (let i = 0; i < result.length; i++) {
                        const data = {
                            buyerName: result[i].buyerName,
                            supplierName: result[i].supplierName,
                            modeOfPayment: result[i].modeOfPayment,
                            timeOfPayment: new Date(result[i].timeOfPayment).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
                            paidAmount: result[i].paidAmount
                        }
                        obj[j] = data;
                        j++;
                    }
                    console.log("obj is : ", obj);
                    res.send(obj);
                }
            })
        })

        this.app.get('/api/getAlTransactionsForBuyerId', (req, res) => {
            const reqUserId = req.query.buyerId;
            const paymentSql = "select u1.userName as supplierName, p.modeOfPayment, p.timeOfPayment, p.paidAmount from payment_details p, user_details u , user_details u1 ,  user_account_details a, user_account_details a1 where p.fromUserAccountDetailsId = a.userAccountDetailsId and p.toUserAccountDetailsId = a1.userAccountDetailsId and a.userId = u.userId and a1.userId = u1.userId and  u.userId = ? order by p.timeOfPayment desc";

            this.db.query(paymentSql, [reqUserId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    let obj = []
                    let j = 0
                    for (let i = 0; i < result.length; i++) {
                        const data = {
                            supplierName: result[i].supplierName,
                            modeOfPayment: result[i].modeOfPayment,
                            timeOfPayment: new Date(result[i].timeOfPayment).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
                            paidAmount: result[i].paidAmount
                        }
                        obj[j] = data;
                        j++;
                    }
                    console.log("obj is : ", obj);
                    res.send(obj);
                }
            })
        })

        this.app.get('/api/getAlTransactionsForSupplierId', (req, res) => {
            const reqUserId = req.query.supplierId;
            console.log("entered in query : ", reqUserId);
            const paymentSql = "select u.userName as buyerName, p.modeOfPayment, p.timeOfPayment, p.paidAmount from payment_details p, user_details u , user_details u1 ,  user_account_details a, user_account_details a1 where p.fromUserAccountDetailsId = a.userAccountDetailsId and p.toUserAccountDetailsId = a1.userAccountDetailsId and a.userId = u.userId and a1.userId = u1.userId and  u1.userId = ? order by p.timeOfPayment desc";

            this.db.query(paymentSql, [reqUserId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    let obj = []
                    let j = 0
                    for (let i = 0; i < result.length; i++) {
                        const data = {
                            buyerName: result[i].buyerName,
                            modeOfPayment: result[i].modeOfPayment,
                            timeOfPayment: new Date(result[i].timeOfPayment).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
                            paidAmount: result[i].paidAmount
                        }
                        obj[j] = data;
                        j++;
                    }
                    console.log("obj is : ", obj);
                    res.send(obj);
                }
            })
        })

        this.app.get('/api/getAllItemPurchased', (req, res) => {
            const itemPurchaseSql = " select u.userName as buyerName, u1.userName as supplierName, c.categoryName, i.itemName, i1.brandName, b.noOfItems,b.totalPrice as paidAmount, b.purchaseDateTime from user_details u, user_details u1, item_category_details c, item_tbl i, item_details i1, buyer_item_purchase b, supplier_item_details s where b.supplierItemDetailsId = s.supplierItemDetailsId and s.itemDetailsId = i1.itemDetailsId and b.userId = u.userId and s.userId = u1.userId and i1.itemId = i.itemId and i1.categoryId = c.categoryId and b.status = 1 order by b.purchaseDateTime desc";
            this.db.query(itemPurchaseSql, (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    let obj = []
                    let j = 0
                    for (let i = 0; i < result.length; i++) {
                        const data = {
                            buyerName: result[i].buyerName,
                            supplierName: result[i].supplierName,
                            categoryName: result[i].categoryName,
                            itemName: result[i].itemName,
                            brandName: result[i].brandName,
                            noOfItems: result[i].noOfItems,
                            paidAmount: result[i].paidAmount,
                            purchaseDateTime: new Date(result[i].purchaseDateTime).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),
                        }
                        obj[j] = data;
                        j++;
                    }
                    console.log("obj is : ", obj);
                    res.send(obj);
                }
            })
        })

        this.app.get('/api/getAllItemPurchasedBuyerId', (req, res) => {
            const fetchedBuyerUserId = req.query.buyerId;
            const itemPurchaseSql = "select u1.userName as supplierName, c.categoryName, i.itemName, i1.brandName, b.noOfItems,b.totalPrice as paidAmount, b.purchaseDateTime from user_details u, user_details u1, item_category_details c, item_tbl i, item_details i1, buyer_item_purchase b, supplier_item_details s where b.supplierItemDetailsId = s.supplierItemDetailsId and s.itemDetailsId = i1.itemDetailsId and b.userId = u.userId and s.userId = u1.userId and i1.itemId = i.itemId and i1.categoryId = c.categoryId and b.status = 1 and u.userId = ? order by b.purchaseDateTime desc";
            this.db.query(itemPurchaseSql, [fetchedBuyerUserId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    let obj = []
                    let j = 0
                    for (let i = 0; i < result.length; i++) {
                        const data = {
                            supplierName: result[i].supplierName,
                            categoryName: result[i].categoryName,
                            itemName: result[i].itemName,
                            brandName: result[i].brandName,
                            noOfItems: result[i].noOfItems,
                            paidAmount: result[i].paidAmount,
                            purchaseDateTime: new Date(result[i].purchaseDateTime).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),

                        }
                        obj[j] = data;
                        j++;
                    }
                    console.log("obj is : ", obj);
                    res.send(obj);
                }
            })
        })

        this.app.get('/api/getAllItemPurchasedSupplierId', (req, res) => {
            const fetchedSupplierUserId = req.query.supplierId;
            const itemPurchaseSql = "select u.userName as buyerName, c.categoryName, i.itemName, i1.brandName, b.noOfItems,b.totalPrice as paidAmount, b.purchaseDateTime from user_details u, user_details u1, item_category_details c, item_tbl i, item_details i1, buyer_item_purchase b, supplier_item_details s where b.supplierItemDetailsId = s.supplierItemDetailsId and s.itemDetailsId = i1.itemDetailsId and b.userId = u.userId and s.userId = u1.userId and i1.itemId = i.itemId and i1.categoryId = c.categoryId and b.status = 1 and u1.userId = ? order by b.purchaseDateTime desc";
            this.db.query(itemPurchaseSql, [fetchedSupplierUserId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    let obj = []
                    let j = 0
                    for (let i = 0; i < result.length; i++) {
                        const data = {
                            buyerName: result[i].buyerName,
                            categoryName: result[i].categoryName,
                            itemName: result[i].itemName,
                            brandName: result[i].brandName,
                            noOfItems: result[i].noOfItems,
                            paidAmount: result[i].paidAmount,
                            purchaseDateTime: new Date(result[i].purchaseDateTime).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' }),

                        }
                        obj[j] = data;
                        j++;
                    }
                    console.log("obj is : ", obj);
                    res.send(obj);
                }
            })
        })

        this.app.get('/api/getInterestForBank', (req, res) => {
            const bankName = req.query.bankName;
            const branchCode = req.query.branchCode;
            // const amount = req.query.amount;
            // const timePeriod = req.query.timePeriod;
            const rateOfInterestSql = "select rateOfInterest from bank_details where bankName = ? and branchCode = ?";
            this.db.query(rateOfInterestSql, [bankName, branchCode], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    // let rateOfInterest = result[0].rateOfInterest;
                    // let interest = (amount * rateOfInterest * (timePeriod / 12)) / 100;
                    console.log(result);
                    res.send(result);
                }
            })
        })

        this.app.get('/api/getAllItemForCategoryId', (req, res) => {
            console.log(req);
            const categoryId = req.query.categoryId;

            const sqlSelect = "Select itemId, itemName from item_tbl where categoryId = ?";
            this.db.query(sqlSelect, [categoryId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send(Status(500));
                } else {
                    console.log(result);
                    for (let i = 0; i < result.length; i++)
                        console.log(result[i].itemId, result[i].itemName);
                    res.send(result);
                }
            })
        })

        this.app.get('/api/getAllBrandListForCategoryItem', (req, res) => {
            const categoryId = req.query.categoryId;
            const itemId = req.query.itemId;
            const sqlSelect = "Select brandName from item_details where categoryId = ? and itemId = ? ";
            this.db.query(sqlSelect, [categoryId, itemId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                for (let i = 0; i < result.length; i++)
                    console.log(result[i].brandName);
                res.send(result);
            })
        })

        // get all supplier names and supplier id corresponding to given itemDetailsId
        this.app.get('/api/getAllSuppliers', (req, res) => {
            const categoryId = req.query.categoryId;
            const itemId = req.query.itemId;
            const brandName = req.query.brandName;
            const fetchItemDetailsId = "select itemDetailsId from item_details where categoryId = ? and itemId = ? and brandName = ?";
            this.db.query(fetchItemDetailsId, [categoryId, itemId, brandName], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    let fetchedItemDetailsId = result[0].itemDetailsId;
                    console.log(fetchedItemDetailsId)
                    const fetchSupplierDetails = "select u.userId, u.userName, s.pricePerItem, s.availableItems from supplier_item_details s,user_details u where s.userId = u.userId and s.itemDetailsId = ?";
                    this.db.query(fetchSupplierDetails, [fetchedItemDetailsId], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.send(result);
                        }
                    })
                }
            })
        })

        this.app.get('/api/getAllBuyerAndSupplierList', (req, res) => {
            const userType = req.query.userType;
            const sqlSelect = "Select * from user_details where userType = ? ";
            this.db.query(sqlSelect, [userType], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                res.send(result);
            })
        })

        this.app.get('/api/getAllBanks', (req, res) => {
            const bankSelectSql = "Select distinct(bankName) from bank_details";
            this.db.query(bankSelectSql, (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                res.send(result);
            })
        })

        this.app.get('/api/getAllBranchForBank', (req, res) => {
            const bankName = req.query.bankName;
            // console.log(req);
            const sqlSelect = "select distinct(branchCode) from bank_details where bankName = ?";
            this.db.query(sqlSelect, [bankName], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else
                    res.send(result);
            })
        })

        this.app.get('/api/getUserId', (req, res) => {
            const userName = req.query.userName;
            const userType = req.query.userType;
            let fetchUserIdSql = "select userId from user_details where userName = ? and userType = ?";
            this.db.query(fetchUserIdSql, [userName, userType], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(404).send({ success: false, message: 'this username is not registered with us, please signup first' });
                } else {
                    res.send(result);
                }
            })
        })

    }

    post() {

        // handle storage using multer
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
            }
        });

        var upload = multer({ storage: storage });

        this.app.use(cors())
        // handle single file upload
        this.app.post('/api/uploadMedia', upload.single('file'), (req, res) => {
            // console.log(req);
            console.log("file ->", req.file)
            const file = req.file;
            if (!file) {
                return res.status(200).send({ message: 'Please upload a file.' });
            }
            var sql = "INSERT INTO `media_details`(`mediaName`) VALUES ('" + req.file.filename + "')";
            this.db.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });


        this.app.post('/api/signup', (req, res) => {
            const fname = req.body.fname;
            const lname = req.body.lname;
            const phoneNumber = req.body.phoneNumber;
            const emailAddress = req.body.emailAddress;
            const userName = req.body.userName;
            const password = req.body.password;
            const userType = req.body.userType;
            const city = req.body.city;
            const state = req.body.state;
            const address = req.body.address;
            const pinCode = req.body.pinCode;

            console.log("data user_details insertion start!!");
            let sqlAddress = `INSERT INTO address_details (city, state, address, pinCode) VALUES (?,?,?,?)`;

            this.db.query(sqlAddress, [city, state, address, pinCode], (err, result) => {

                if (err) throw err;
                else {
                    console.log('Address record inserted');

                    let addressIdFetchSqlQuery = "SELECT addressId FROM address_details ORDER BY addressId DESC LIMIT 1";
                    let addressId = 0;

                    this.db.query(addressIdFetchSqlQuery, (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        }
                        else {
                            addressId = result[0].addressId;

                            let signSql = `INSERT INTO user_details (fname, lname, phoneNumber, emailAddress, userName, userType, addressId) VALUES (?,?,?,?,?,?,?)`;

                            this.db.query(signSql, [fname, lname, phoneNumber, emailAddress, userName, userType, addressId], (err, result) => {

                                if (err) throw err;
                                else {

                                    console.log('User Details record inserted');
                                    let userIdFetchSqlQuery = "SELECT userId FROM user_details ORDER BY userId DESC LIMIT 1";
                                    let userId = 0;

                                    this.db.query(userIdFetchSqlQuery, (err, result) => {

                                        if (err) throw err;
                                        else {
                                            userId = result[0].userId;
                                            const lastSignedIn = new Date();
                                            // Make Constants if possible
                                            let sqlLogin = `INSERT INTO login_details (userId,password,lastSignedIn) values 
                                                            (?,aes_encrypt(?,"Buys_Monefy"),?)`;

                                            this.db.query(sqlLogin, [userId, password, lastSignedIn], (err, result) => {
                                                if (err) throw err;

                                                console.log('record inserted in login');
                                                res.sendStatus(200);

                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });

        this.app.post('/api/loginValidate', (req, res) => {
            const userName = req.body.userName;
            const password = req.body.password;
            const userType = req.body.userType;
            let userLoggedIdSql = `SELECT userId from user_details where user_details.userName in (?) and user_details.userType in (?)`;
            this.db.query(userLoggedIdSql, [userName, userType], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    console.log('fetched id');
                    console.log(result);
                    const loggedUserId = result[0].userId;
                    console.log(loggedUserId);
                    let loginSql = `SELECT * FROM login_details log where log.userId in (?) and log.password = aes_encrypt(?,"Buys_Monefy")`;

                    this.db.query(loginSql, [loggedUserId, password], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else if (result.length == 0) {
                            res.status(404).send({ success: false, message: 'this username is not registered with us, please signup first' });
                        }
                        else {
                            console.log(result);
                            res.sendStatus(200);
                        }
                    })

                }
            })
        });

        this.app.post('/api/addCategory', (req, res) => {
            const categoryName = req.body.categoryName;
            let categorySql = `insert into item_category_details (categoryName) values (?)`;
            this.db.query(categorySql, [categoryName], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(200)
                }
            })
        });

        this.app.post('/api/addItem', (req, res) => {
            const itemName = req.body.itemName;
            const categoryId = req.body.categoryId;
            let categorySql = `insert into item_tbl (itemName, categoryId) values (?,?)`;
            this.db.query(categorySql, [itemName, categoryId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(200)
                }
            })
        });
        88
        this.app.post('/api/addPaymentTransaction', (req, res) => {
            const fromBankName = req.body.fromBankName;
            const fromBranchCode = req.body.fromBranchCode;
            const fromAccountNumber = req.body.fromAccountNumber;
            const amountToBePaid = req.body.amountToBePaid;
            const supplierId = req.body.supplierId;
            const toBankName = req.body.toBankName;
            const toBranchCode = req.body.toBranchCode;
            const toAccountNumber = req.body.toAccountNumber;
            const modeOfPayment = req.body.modeOfPayment;
            const timeOfPayment = new Date();
            const buyerItemPurchaseId = req.body.buyerItemPurchaseId;
            let accountNumberList = [fromAccountNumber, toAccountNumber]
            console.log(accountNumberList);
            let fromUserAccountDetailsId;
            let toUserAccountDetailsId;
            const paymentTransactionSql = `select userAccountDetailsId, accountNumber from user_account_details where accountNumber in (?)`;
            this.db.query(paymentTransactionSql, [accountNumberList], (err, result) => {
                console.log(result);
                if (result[0].accountNumber === fromAccountNumber) {
                    fromUserAccountDetailsId = result[0].userAccountDetailsId;
                    toUserAccountDetailsId = result[1].userAccountDetailsId;
                } else {
                    fromUserAccountDetailsId = result[1].userAccountDetailsId;
                    toUserAccountDetailsId = result[0].userAccountDetailsId;
                }

                const paymentRecordSql = `insert into payment_details(paidAmount, modeOfPayment, timeOfPayment, 
                                                fromUserAccountDetailsId, toUserAccountDetailsId) values(?,?,?,?,?)`;
                this.db.query(paymentRecordSql, [amountToBePaid, modeOfPayment, timeOfPayment,
                    fromUserAccountDetailsId, toUserAccountDetailsId], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            const updateFromBankAmountSql = "update user_account_details set amount = amount-? where accountNumber = ?";
                            this.db.query(updateFromBankAmountSql, [amountToBePaid, fromAccountNumber], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                } else {
                                    console.log("in last");
                                    const updateToBankAmountSql = "update user_account_details set amount = amount+? where accountNumber = ?";
                                    this.db.query(updateToBankAmountSql, [amountToBePaid, toAccountNumber], (err, result) => {
                                        if (err) {
                                            console.log(err);
                                            res.sendStatus(500);
                                        } else {
                                            const updateBuyerPaymentStatus = "update buyer_item_purchase set status = 1 where buyerItemPurchaseId = ?";
                                            this.db.query(updateBuyerPaymentStatus, [buyerItemPurchaseId], (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                    res.sendStatus(500);
                                                } else {
                                                    // res.send({message: 'transaction successful from your side , amount added to the supplier account and deducted from your account'});
                                                    res.status(200).send({ success: true, message: 'transaction successful from your side , amount added to the supplier account and deducted from your account' });
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
            })
        });

        this.app.post('/api/addBrand', (req, res) => {
            const categoryId = req.body.categoryId;
            const itemId = req.body.itemId;
            const brandName = req.body.brandName;
            let categorySql = `insert into item_details (categoryId,itemId, brandName) values (?,?,?)`;
            this.db.query(categorySql, [categoryId, itemId, brandName], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(200)
                }
            })
        });


        this.app.post('/api/addUserAccount', (req, res) => {
            const userId = req.body.userId;
            const bankName = req.body.bankName;
            const branchCode = req.body.branchCode;
            const amount = req.body.amount;
            const accountNumber = req.body.accountNumber;

            console.log(bankName, " ", branchCode);
            let fetchBankIdSql = "select bankId from bank_details where bankName = ? and branchCode = ?";
            this.db.query(fetchBankIdSql, [bankName, branchCode], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log(result);
                    let fetchBankId = result[0].bankId;
                    console.log(fetchBankId);
                    let userAccountSql = `insert into user_account_details (userId,bankId, amount, accountNumber) values (?,?,?,?)`;
                    this.db.query(userAccountSql, [userId, fetchBankId, amount, accountNumber], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        }
                        else {
                            res.sendStatus(200);
                        }
                    })
                }
            })


        });

        this.app.post('/api/registerBank', (req, res) => {
            const bankName = req.body.bankName;
            const ifscCode = req.body.ifscCode;
            const city = req.body.city;
            const state = req.body.state;
            const address = req.body.address;
            const pinCode = req.body.pinCode;
            const branchCode = req.body.branchCode;
            const rateOfInterest = req.body.rateOfInterest;
            // let sqlAddress = `INSERT INTO address_details (city, state, address, pinCode) VALUES (?,?,?,?)`;
            let addressSql = `insert into address_details(city,state,address,pinCode) values (?,?,?,?)`;
            this.db.query(addressSql, [city, state, address, pinCode], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    console.log("record in address table inserted");
                    let addressIdFetchSqlQuery = "SELECT addressId FROM address_details ORDER BY addressId DESC LIMIT 1";
                    let fetchedAddressId = 0;

                    this.db.query(addressIdFetchSqlQuery, (err, result) => {
                        if (err) throw err;
                        else {
                            fetchedAddressId = result[0].addressId;
                            let bankSql = `insert into bank_details(bankName, ifscCode, addressId, branchCode,rateOfInterest) values(?,?,?,?,?)`
                            this.db.query(bankSql, [bankName, ifscCode, fetchedAddressId, branchCode, rateOfInterest], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                }
                                else {
                                    console.log("bank details inserted");
                                    res.sendStatus(200);
                                }
                            })
                        }
                    })
                }
            });
        });

        this.app.post('/api/addSupplierItem', (req, res) => {
            const categoryId = req.body.categoryId;
            const itemId = req.body.itemId;
            const brandName = req.body.brandName;
            const userId = req.body.userId;
            const pricePerItem = req.body.pricePerItem;
            const availableItems = req.body.availableItems;
            let categorySql = `select itemDetailsId from item_details where categoryId = ? and itemId = ? and brandName = ?`;
            this.db.query(categorySql, [categoryId, itemId, brandName], (err, result) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                }
                else {
                    const itemDetailsId = result[0].itemDetailsId;
                    let supplierSql = `insert into supplier_item_details(itemDetailsId, userId, pricePerItem, availableItems) values(?,?,?,?)`
                    this.db.query(supplierSql, [itemDetailsId, userId, pricePerItem, availableItems], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        }
                        else {
                            console.log("Supplier item details inserted");
                            res.sendStatus(200);
                        }
                    })
                }
            })
        });

        this.app.post('/api/addLoanDetails', (req, res) => {
            const userId = req.body.userId;
            const bankName = req.body.bankName;
            const branchCode = req.body.branchCode;
            const loanAmount = req.body.loanAmount;
            const accountNumber = req.body.accountNumber;
            const emiMonths = req.body.emiMonths;
            const interestAmount = req.body.interestAmount;
            const mediaIdCollateral = req.body.mediaIdCollateral;
            const mediaIdLoanPDF = req.body.mediaIdLoanPDF;
            const totalAmountToBePaid = loanAmount + interestAmount;
            const loanDateTime = new Date();
            const status = 1;
            const fetchUserAccountDetailsIdSql = "select userAccountDetailsId from user_account_details where accountNumber = ?";
            this.db.query(fetchUserAccountDetailsIdSql, [accountNumber], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(404).send({ success: false, message: 'account number not found, please enter correct account number' });
                } else {
                    let userAccountDetailsId = result[0].userAccountDetailsId;
                    const updateBankDetailsSql = "update user_account_details set amount = amount+? where accountNumber = ?";
                    this.db.query(updateBankDetailsSql, [loanAmount, accountNumber], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.status(404).send({ success: false, error: { message: 'user account not Found' } });
                        } else {
                            const loanDetailsSql = "insert into loan_details(userAccountDetailsId, loanAmount, mediaIdCollateral, mediaIdLoanPDF , loanDateTime, status, emiMonths, interestAmount, totalAmountToBePaid) values (?,?,?,?,?,?,?,?,?)";
                            this.db.query(loanDetailsSql, [userAccountDetailsId, loanAmount, mediaIdCollateral, mediaIdLoanPDF, loanDateTime, status, emiMonths, interestAmount, totalAmountToBePaid], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                } else {
                                    res.sendStatus(200);
                                }
                            })
                        }
                    })
                }
            })

        })

        this.app.post('/api/addBuyerItemPurchase', (req, res) => {
            const categoryId = req.body.categoryId;
            const itemId = req.body.itemId;
            const brandName = req.body.brandName;
            const supplierId = req.body.supplierId;
            const buyerId = req.body.buyerId;
            const noOfItems = req.body.noOfItems;
            const totalPrice = req.body.totalPrice;
            const modeOfPayment = req.body.modeOfPayment;
            console.log("supplie id : ", supplierId);
            let categorySql = `select itemDetailsId from item_details where categoryId = ? and itemId = ? and brandName = ?`;
            this.db.query(categorySql, [categoryId, itemId, brandName], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(404).send({ success: false, message: 'item not found' });
                }
                else {
                    const itemDetailsId = result[0].itemDetailsId;
                    console.log("item is : ", itemDetailsId);
                    let supplierSql = `select supplierItemDetailsId, availableItems from supplier_item_details where itemDetailsId = ? and userId = ? `;
                    this.db.query(supplierSql, [itemDetailsId, supplierId], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        }
                        else {
                            const supplierItemDetailsId = result[0].supplierItemDetailsId;
                            const availableItems = result[0].availableItems;
                            if (noOfItems > availableItems) {
                                res.status(400).send({ success: false, message: 'stock unavailable' });
                            }
                            const paymentDateTime = new Date();
                            let buyerSql = `insert into buyer_item_purchase(supplierItemDetailsId, userId, noOfItems, modeOfPayment,purchaseDateTime,totalPrice, status) values(?,?,?,?,?,?,?)`
                            this.db.query(buyerSql, [supplierItemDetailsId, buyerId, noOfItems, modeOfPayment, paymentDateTime, totalPrice, 0], (err, result) => {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(500);
                                }
                                else {
                                    console.log("Buyer item Purchase details inserted");
                                    const updateSupplierSql = "update supplier_item_details set availableItems = availableItems - ? where supplierItemDetailsId = ?";
                                    this.db.query(updateSupplierSql, [noOfItems, supplierItemDetailsId], (err, result) => {
                                        if (err) {
                                            console.log(err);
                                            res.sendStatus(500);
                                        } else {
                                            const getIdSql = " select buyerItemPurchaseId from buyer_item_purchase order by buyerItemPurchaseId desc limit 1;";
                                            this.db.query(getIdSql, (err, result) => {
                                                if (err) {
                                                    console.log(err);
                                                    res.sendStatus(500);
                                                } else {
                                                    res.send(result);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        });

    }
    listen() {
        this.app.listen(this.port, (err) => {
            if (err)
                console.log(err);
            else
                console.log(`Server Started On ${this.port}`);
        })
    }
}

let buysmonefy = new BUYSMONEFY(3001, express());
buysmonefy.get();
buysmonefy.listen();
buysmonefy.post();
buysmonefy.get();