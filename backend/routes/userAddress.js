/**
 * @swagger
 * /{userId}/address:
 *   put:
 *     summary: Update the user's address
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the user
 *         example: "605c72d7e25e5c23a8a5f2b4"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               personalAddress:
 *                 type: object
 *                 description: The user's personal address
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: "123 Main St"
 *                   city:
 *                     type: string
 *                     example: "Springfield"
 *                   state:
 *                     type: string
 *                     example: "IL"
 *                   zipCode:
 *                     type: string
 *                     example: "62704"
 *                   country:
 *                     type: string
 *                     example: "USA"
 *               billingAddress:
 *                 type: object
 *                 description: The user's billing address
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: "456 Elm St"
 *                   city:
 *                     type: string
 *                     example: "Shelbyville"
 *                   state:
 *                     type: string
 *                     example: "IL"
 *                   zipCode:
 *                     type: string
 *                     example: "62565"
 *                   country:
 *                     type: string
 *                     example: "USA"
 *               sameAsPersonalAddress:
 *                 type: boolean
 *                 description: Indicates if the billing address is the same as the personal address
 *                 example: true
 *     responses:
 *       200:
 *         description: Address updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Address updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "605c72d7e25e5c23a8a5f2b4"
 *                     personalAddress:
 *                       type: object
 *                       description: Updated personal address
 *                       properties:
 *                         street:
 *                           type: string
 *                         city:
 *                           type: string
 *                         state:
 *                           type: string
 *                         zipCode:
 *                           type: string
 *                         country:
 *                           type: string
 *                     billingAddress:
 *                       type: object
 *                       description: Updated billing address
 *                       properties:
 *                         street:
 *                           type: string
 *                         city:
 *                           type: string
 *                         state:
 *                           type: string
 *                         zipCode:
 *                           type: string
 *                         country:
 *                           type: string
 *                     sameAsPersonalAddress:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Bad request due to missing or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Update personal address
router.put('/:userId/address', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { personalAddress, billingAddress, sameAsPersonalAddress } = req.body;

    const result = await userController.updateAddress(userId, personalAddress, billingAddress, sameAsPersonalAddress);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;
