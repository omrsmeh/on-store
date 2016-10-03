'use strict';

const handler404 = function (request, reply) {

  reply({"error": true, "message": "Invalid API Route"}).code(404);
}

module.exports = [
  {
    method: '*',
    path: '/{p*}',
    handler: handler404
  }
]
