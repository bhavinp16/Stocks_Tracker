const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Stock = require('../models/Stock');

// @route     GET api/stocks
// @desc      Get all users stocks
// @access    Private
router.get('/', auth, async (req, res) => {
    try {
        const stocks = await Stock.find({ user: req.user.id }).sort({
            date: -1,
        });
        res.json(stocks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/stocks
// @desc      Add new stock
// @access    Private
router.post(
    '/',
    [
        auth,
        [
            check('symbol', 'Symbol is required')
                .not()
                .isEmpty(),
        ],
    ],
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { symbol } = req.body;

        try {
            const newStock = new Stock({
                symbol,
                user: req.user.id,
            });

            const stock = await newStock.save();

            res.json(stock);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
);


// @route     DELETE api/stocks/:id
// @desc      Delete stocks
// @access    Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let stock = await Stock.findById(req.params.id);

        if (!stock) return res.status(404).json({ msg: 'Stock not found' });

        // Make sure user owns contact
        if (stock.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Stock.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
