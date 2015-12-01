'use strict'

var _ = require('lodash');
var Promise = require('bluebird');
var sql = require('seriate');

var util = require('../../utils/utils');

function initialize() {
  return sql.execute({
    query: sql.fromFile('./sql/ticket.initialize.sql')
  });
}

/**
 * @param {Object} ticket
 * @param {Object} user - optional
 * @return {Promise} -> {Object} (Ticket)
 */
exports.create = function (ticket, user) {
  return new Promise(function (resolve, reject) {
    if (!_.isObject(ticket)) {
      // No ticket!
      return  reject(new Error('No ticket provided.'))
    }
    
    // Ensure properties which are objects are defined
    ticket.customer = ticket.customer || {};
    ticket.user = ticket.user || user || {};
    ticket.category = ticket.category || {};
    ticket.subcategory = ticket.subcategory || {};
    ticket.descriptor = ticket.descriptor || {};
    ticket.department = ticket.department || {};
    ticket.country = _.isObject(ticket.country) ? ticket.country.short : ticket.country
    
    return sql.execute({
      query: [
        sql.fromFile('./sql/ticket.create.sql'),
        sql.fromFile('./sql/ticket.findAndJoin.sql')
        ].join(' '),
      params: {
        ticketDate: {
          type: sql.DATETIME2,
          val: ticket.ticketDate
        },
        name:  {
          type: sql.VARCHAR(256),
          val: ticket.name
        },
        email: {
          type: sql.VARCHAR(256),
          val: ticket.email
        },
        tel: {
          type: sql.VARCHAR(256),
          val: ticket.tel
        },
        altTel: {
          type: sql.VARCHAR(256),
          val: ticket.altTel
        },
        country: {
          type: sql.VARCHAR(256),
          val: ticket.country
        },
        summary: {
          type: sql.VARCHAR,
          val: ticket.summary
        },
        transferred: {
          type: sql.BIT,
          val: ticket.transferred
        },
        successful: {
          type: sql.BIT,
          val: ticket.successful
        },
        status: {
          type: sql.VARCHAR(256),
          val: ticket.status
        },
        customerId: {
          type: sql.BIGINT,
          val: ticket.customer.customerId
        },
        userId: {
          type: sql.BIGINT,
          val: ticket.user.userId
        },
        categoryId: {
          type: sql.BIGINT,
          val: ticket.category.categoryId
        },
        subcategoryId: {
          type: sql.BIGINT,
          val:  ticket.subcategory.subcategoryId
        },
        descriptorId: {
          type: sql.BIGINT,
          val: ticket.descriptor.descriptorId
        },
        departmentId: {
          type: sql.BIGINT,
          val: ticket.department.departmentId
        }
      }
    })
    .then(function (ticket) {
      resolve(_.first(util.objectify(ticket)));
    })
    .catch(function (err) {
      reject(err);
    });
  });
}

exports.findById = function (ticketId) {
  return new Promise(function (resolve, reject) {
    sql.execute({
      query: sql.fromFile('./sql/ticket.findAndJoin.sql'),
      params: {
        ticketId: {
          type: sql.BIGINT,
          val: ticketId
        }
      }
    })
    .then(function (tickets) {
      resolve(_.first(util.objectify(tickets)));
    })
    .catch(function (err) {
      reject(err);
    })
  });
}

exports.findByCustomerId = function (customerId) {
  return new Promise(function (resolve, reject) {
    sql.execute({
      query: sql.fromFile('./sql/ticket.findByCustomerId.sql'),
      params: {
        customerId: {
          type: sql.BIGINT,
          val: customerId
        }
      }
    })
    .then(function (tickets) {
      resolve(util.objectify(tickets));
    })
    .catch(function (err) {
      reject(err);
    });
  });
}

// Initialize the table
initialize();