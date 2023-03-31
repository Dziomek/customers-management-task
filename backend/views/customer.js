import express from 'express'
import { editCustomer, deleteCustomer, showCustomersList, addCustomer, askForEdit } from '../controllers/customer.js'

const router = express.Router()

router.post('/add', addCustomer)
router.delete('/delete/:customer_id', deleteCustomer)
router.get('/show-customers', showCustomersList)
router.get(`/ask-for-edit/:customer_id`, askForEdit)
router.put('/edit/:customer_id', editCustomer)

export default router
