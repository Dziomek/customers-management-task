import { db } from "../db.js";

export function addCustomer(req, res) {
  const name = req.body.name;
  const vatNumber = req.body.vatNumber;
  const address = req.body.address;
  if (!(name && vatNumber && address)) {
    res.send({
      content: "Please fill all the fields",
      type: "fail",
    });
    return;
  }
  const selectSql = `SELECT * FROM customers WHERE vat_number = ?`;
  db.get(selectSql, [vatNumber], (err, row) => {
    if (err) {
      res.send({
        content: "An error occured. Please try again",
        type: "fail",
      });
      return;
    } else if (row) {
      res.send({
        content: "Customer with this VAT number already exists",
        type: "fail",
      });
      return;
    } else {
      const insertSql = `INSERT INTO customers (name, vat_number, address) VALUES (?, ?, ?)`;
      db.run(insertSql, [name, vatNumber, address], (err) => {
        if (err) {
          res.send({
            content: "An error occured. Please try again",
            type: "fail",
          });
          return;
        } else {
          res.send({
            content: "Customer added successfully",
            type: "success",
          });
          return;
        }
      });
    }
  });
}

export function deleteCustomer(req, res) {
  const customerId = req.params.customer_id;
  const selectSql = `SELECT COUNT(*) AS count FROM customers WHERE id = ?`;

  db.get(selectSql, customerId, (err, row) => {
    if (err) {
      res.send({
        content: "An error occured. Please try again",
        type: "fail",
      });
      return;
    } else if (row.count === 0) {
      res.send({
        content: `Customer with this ID does not exist`,
        type: "fail",
      });
      return;
    } else {
      const deleteSql = `DELETE FROM customers WHERE id = ?`;
      db.run(deleteSql, customerId, (err) => {
        if (err) {
          res.send({
            content: "An error occured. Please try again",
            type: "fail",
          });
          return;
        } else {
          res.send({
            content: `Customer with id ${customerId} deleted successfully`,
            type: "success",
          });
          return;
        }
      });
    }
  });
}

export function askForEdit(req, res) {
  const customerId = req.params.customer_id
  const selectSql = `SELECT COUNT(*) AS count FROM customers WHERE id = ?`
  db.get(selectSql, customerId, (err, rows) => {
    console.log(rows)
    if (err) {
      res.send({
        content: "An error occured. Please try again",
        type: "fail",
      }) 
      return
    } else if (rows.count === 0) {
      res.send({
        content: `Customer with this ID does not exist`,
        type: "fail",
      });
      return
    } else {
      res.send({
        content: '',
        type: "success",
      });
      return
    }
  })
}

export function editCustomer(req, res) {
  const name = req.body.name;
  const vatNumber = req.body.vatNumber;
  const address = req.body.address;
  const customerId = req.params.customer_id
  if (!(name && vatNumber && address)) {
    res.send({
      content: "Please fill all the fields",
      type: "fail",
      customerExists: true
    });
    return;
  }
  const selectSql = `SELECT * FROM customers WHERE vat_number = ? AND id != ?`;
  db.get(selectSql, [vatNumber, customerId], (err, row) => {
    if (err) {
      res.send({
        content: "An error occured. Please try again",
        type: "fail",
        customerExists: true
      });
      return;
    } else if (row) {
      res.send({
        content: "Customer with this VAT number already exists",
        type: "fail",
        customerExists: true
      });
      return;
    } else {
      const updateSql = `UPDATE customers SET name = ?, vat_number = ?, address = ? WHERE id = ?`;
      db.run(updateSql, [name, vatNumber, address, customerId], (err) => {
        if (err) {
          res.send({
            content: "An error occured. Please try again",
            type: "fail",
            customerExists: true
          });
          return;
        } else {
          res.send({
            content: "Customer updated successfully",
            type: "success",
            customerExists: false
          });
          return;
        }
      });
    }
  });
}

export function showCustomersList(req, res) {
  const sql = `SELECT * FROM customers`;
  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send({
        message: "Server error",
      });
      return;
    } else {
      console.log(rows);
      res.json(rows);
      return;
    }
  });
}
