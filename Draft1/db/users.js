// var records = [
//     { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
//   , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
//   , { id: 2845663132195420, username: 'Andrei Liviu', password: 'liviu', displayName: 'Andrei', email: [ { value: 'jill@example.com'}], pageToken: 'EAAIvRZCsh3WIBABvroEqZB65QgykIlSZCDXti46QH7f6zFjFXxoQbkrS9yPkk5tFUx2z4bVrKAThZCqeEjYMzwgsMmF616XQOvXczOfTjh6QC7RdAmd2JdG3dASfVnBZCT0nGPoM8ParaCWcWZBH4Vloh2QL4bLm2dtL80GHcPsgZDZD'}
// ];

var records = {}
var facebookIdMapping = {}
//   (4235, 'jack'): { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] },
//   [[4533, 'jill']]: { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] },
//   [[1234, 'andrei']]: { id: 3, username: 'andrei', password: 'liviu', displayName: 'Andrei', email: [ { value: 'jill@example.com'}], pageToken: 'EAAIvRZCsh3WIBABvroEqZB65QgykIlSZCDXti46QH7f6zFjFXxoQbkrS9yPkk5tFUx2z4bVrKAThZCqeEjYMzwgsMmF616XQOvXczOfTjh6QC7RdAmd2JdG3dASfVnBZCT0nGPoM8ParaCWcWZBH4Vloh2QL4bLm2dtL80GHcPsgZDZD'}
// }

initRecords = () => {
  records[(4235, 'jack')] = { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  records[(4533, 'jill')] = { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
  records[(1234, 'andrei')] = { id: 3, username: 'andrei', password: 'liviu', displayName: 'Andrei', email: [ { value: 'jill@example.com'}], pageToken: 'EAAIvRZCsh3WIBABvroEqZB65QgykIlSZCDXti46QH7f6zFjFXxoQbkrS9yPkk5tFUx2z4bVrKAThZCqeEjYMzwgsMmF616XQOvXczOfTjh6QC7RdAmd2JdG3dASfVnBZCT0nGPoM8ParaCWcWZBH4Vloh2QL4bLm2dtL80GHcPsgZDZD'}
  facebookIdMapping[(2845663132195420, 'Andrei Liviu')] = records[(1234, 'andrei')]
}

// var facebookIdMapping = {}
//   [[2845663132195420, 'Andrei']]: records[[1234, 'andrei']]
// }

exports.findByIdAndUsername = function(id, username, cb) {
  process.nextTick(function() {
    initRecords()
    console.log(`Searching for (${id}, ${username}) inside ${JSON.stringify(records)}`)
    if (facebookIdMapping[(id, username)])
      return cb(null, facebookIdMapping[(id, username)])
//  else if (twitterIdMapping[[id, username]])
//    return cb(null, twitterIdMapping[[id, username]])
    else if (records[(id, username)])
      return cb(null, records[(id, username)])

    // if (records[username]) {
    //   return cb(null, records[username])
    // }
    // return cb(null, null)
    // console.log(`Finding by ID: ${id} and type ${typeof(id)}`)

    // for (record in records) {
    //   if (records[record].username == username) {
    //     console.log(`num****: ${records[record].username}`)
    //     return cb(null, record);
    //   }
    // }
    // return cb(null, null);

    // var idx = id - 1;
    // if (records[idx]) {
    //   cb(null, records[idx]);
    // } else {
    //   // console.log(records)
    //   cb(new Error('User ' + id + ' doesfioenrg not exist'));
    // }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    initRecords()
    console.log(`Searching for ${username} inside ${JSON.stringify(records)}`)
    USERNAME_INDEX = 1
    for (record in records) {
      console.log(`RECORD: ${record}`)
      if (record == username) {
        return cb(null, records[record]);
      }
    }
    return cb(null, null);

    // if (records[username]) {
    //   return cb(null, records[username])
    // }
    // return cb(null, null)
    // for (var i = 0, len = records.length; i < len; i++) {
    //   var record = records[i];
    //   console.log(`record: ${record.username}`)
    //   if (record.username === username) {
    //     return cb(null, record);
    //   }
    // }
    // return cb(null, null);

    // for (record in records) {
    //   console.log(`numeee: ${records[record].username}`)
    //   if (records[record].username == username) {
    //     console.log(`num****: ${records[record].username}`)
    //     return cb(null, record);
    //   }
    // }
    // return cb(null, null);

    // for (var i = 0, len = records.length; i < len; i++) {
    //   var record = records[i];
    //   if (record.username === username) {
    //     return cb(null, record);
    //   }
    // }
    // return cb(null, null);
  });
}

// exports.findByUsernameFacebook = (username, cb) => {
//   process.nextTick(function() {

//   })
// }
