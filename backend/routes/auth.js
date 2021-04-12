const { User } = require('../models/user');
const { validate } = require('../models/user');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('User doesnt exist');


        const password = await bcrypt.compare(req.body.password, user.password);
        if (!password) return res.status(400).send('Invalid password');

        res.json(user);
})

module.exports = router;