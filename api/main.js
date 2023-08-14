const main = module.exports

const db = require('../db');
const utils = require('../utils');

const entryCollection = db.collection.list.ENTRIES;
const userCollection = db.collection.list.USERS;

main.submit = async (req, res) => {
    try {
        const {inputValues, searchValue} = req.body;
        const decoded = req.user;

        const user = await db.calls.findOne(userCollection, {userID: decoded.userID});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })
        }

        const timeNow = new Date().getTime();
        const formattedInputValues = utils.formatInputValues(inputValues);

        /* insert entry into db
         * no await here because we don't need to wait for the insert to finish
         */
        db.calls.insert(entryCollection, {
            values: formattedInputValues,
            userID: decoded.userID,
            timestamp: timeNow
        });

        /* search for the value in the inputValues
         await here because we need to wait for the search to finish
         before sending the response */
        const searchVal = await utils.search(parseInt(searchValue), formattedInputValues);

        res.status(200).json({
            success: true,
            message: 'Successful',
            search: searchVal,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: e,
        });
    }
};

// get all entries for a user
main.getEntries = async (req, res) => {
    try {
        // find all entries for a user by userID
        const userID = parseInt(req.params.uid);
        const {start_time, end_time} = req.params;
        const {limit = 10, page = 0} = req.query;

        const query = {
            userID,
        }

        if (start_time) {
            query.timestamp = {$gte: parseInt(start_time)};
        } else if (end_time) {
            query.timestamp = {$lte: parseInt(end_time)};
        }

        const dbCall = await db.calls.find(entryCollection, query, limit, page);
        res.status(200).json({
            success: true,
            message: 'Successful',
            count: dbCall.length,
            data: dbCall,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: e,
        });
    }
};

main.getMe = async (req, res) => {
    try {
        const decoded = req.user;
        const user = await db.calls.findOne(userCollection, {userID: decoded.userID});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })
        }

        delete user['password'];
        res.status(200).json({
            success: true,
            message: 'Successful',
            data: user,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: e,
        });
    }
};
