var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
  , { id: 3, username: 'andy', password: 'liviu', displayName: 'Andrei', email: [ { value: 'jill@example.com'}], 
    pageToken: 'EAAIvRZCsh3WIBABvroEqZB65QgykIlSZCDXti46QH7f6zFjFXxoQbkrS9yPkk5tFUx2z4bVrKAThZCqeEjYMzwgsMmF616XQOvXczOfTjh6QC7RdAmd2JdG3dASfVnBZCT0nGPoM8ParaCWcWZBH4Vloh2QL4bLm2dtL80GHcPsgZDZD'}
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
