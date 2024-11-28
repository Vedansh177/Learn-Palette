const express = require('express');
const router = express.Router();
const Model = require('../Models/studentModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.post("/authenticate", (req, res) => {
    console.log(req.body);
    Model.find(req.body)
        // for generation JWT required 4 things 1 payload 2
        .then((result) => {
            console.log(result);
            if (result) {
                const { _id, fname, lname, email, password } = result;
                const payload = { _id, fname, lname, email, password };
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: '30 days' },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ message: 'error creating token' })
                        } else {
                            res.status(200).json({ token, role: result.role })
                        }
                    }
                )
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })

        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get("/getbymail/:email", (req, res) => {
    console.log(req.params.email)
    Model.find({ email: req.params.email })
        .then((result) => {
            res.json(result)
        })
        .catch((err) => {
            console.error(err)
            res.status(500).json(err)
        });
});
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;