const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

const database = require(__dirname + '/database.js');

const app = express();
const port = 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "skeet",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1200 * 1200 * 24,
    },
  })
);

let lessonId = 0;
let userId = 85;

app.post("/api/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const kindofuser = "teacher";
  const date = new Date();

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    database.query(
      "insert into user (email,password,kindofuser,date_registered) VALUES (?,?,?,?)",
      [email, hash, kindofuser, date],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          res.send("1 Row Added!");
        }
      }
    );
  });
});


app.get("/api/login", (req, res) => {
  if (req.session.user) {
    userId = req.session.user[0].id
    //console.log("userId" + userId);
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const kindofuser = "teacher";
  const typeofuser = "student";


  database.query(
    "SELECT * FROM user WHERE email = ? and (kindofuser = ? OR kindofuser= ?);",
    [email, kindofuser, typeofuser],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (error) {
            res.send(error);
          }
          if (response) {
            req.session.user = result;
            res.send({ result: result });
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        })
      } else {
        res.send({ message: "User doesn't exist" });
      }
    })


});

/*
  Teacher side
*/

app.post("/api/user/createLesson", (req, res) => {
  const lesson = req.body.lesson;
  const glevel = req.body.glevel;
  const date = new Date();

  if (req.session.user) {
    database.query(
      "INSERT INTO tb_lesson (lesson_name, grade_level,date_created) VALUES (?,?,?)",
      [lesson, glevel, date],
      (err, result) => {
        if (err) {
          res.send({ err: err });
        } else {
          database.query(
            "SELECT id from tb_lesson WHERE lesson_name = ? and grade_level = ? and date_created = ?",
            [lesson, glevel, date],
            (error, results) => {
              if (results.length > 0) {
                lessonId = results[0].id;
                createLesson(lessonId, userId);
                res.send({ message: "Lesson Created Succesfully" });
              }
            }
          )
        }
      });
  } else {
    res.send({ message: "User must login" });
  }
});


const createLesson = (lessonId, userId) => {
  const statement = "INSERT INTO tb_createlesson (lesson_id,user_id) VALUES (?,?)";
  database.query(statement, [lessonId, userId], (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Lesson Created Succesfully")
    }
  })
}


app.get("/api/user/fetchLesson", (req, res) => {
  if (req.session.user) {
    const statement = "SELECT * FROM view_createlesson WHERE user_id = ?";
    database.query(statement, userId, (err, result) => {
      if (err) {
        res.send({ message: err })
      }
      if (result.length > 0) {
        res.send({ result: result });
        //console.log(result);
      } else {
        res.send({ message: "No lesson found" });
      }
    });
  } else {
    res.send({ message: "User must login" });
  }
});

app.post("/api/user/addChapter", (req, res) => {
  if (req.session.user) {
    const tb_lessonId = req.body.tb_lessonId;
    const chapter_name = req.body.chapter_name;
    const chapter_number = req.body.chapter_number;
    const description = req.body.description;
    const url = req.body.url;
    const date = new Date();

    const statement = "INSERT INTO tb_chapter (tbLesson_id, chapter_name, chapter_number, description, url, date_uploaded) VALUES (?,?,?,?,?,?)";

    database.query(statement, [tb_lessonId, chapter_name, chapter_number, description, url, date],
      (err, result) => {
        if (err) {
          res.send({ message: err });
        } else {
          res.send({ message: "Chapter Inserted Succesfully" });
        }
      });
  } else {
    res.send({ message: "User Must Login" });
  }
});


app.get("/api/user/fetchChapter", (req, res) => {
  const tb_lessonId = req.query.tb_lessonId;
  if (req.session.user) {
    const statement = "SELECT * FROM tb_chapter WHERE tbLesson_id = ?";
    database.query(statement, tb_lessonId, (err, result) => {
      if (err) {
        res.send({ message: err });
      }
      if (result.length > 0) {
        res.send({ result: result });
      }
    });
  } else {
    res.send({ message: "User must login" });
  }
});


app.delete("/api/user/delete", (req, res) => {
  const lessonId = req.query.lessonId;
  console.log(lessonId);
  if (req.session.user) {
    const statement = "DELETE FROM tb_lesson WHERE id = ?";
    database.query(statement, lessonId, (err, result) => {
      if (err) {
        res.send({ message: err })
      } else {
        res.send({ message: 'Deleted Succesfully' });
      }

    });
  }
});

app.delete("/logout", (req, res) => {
  req.session.destroy()
  res.send("Session Destroy")
});

app.get("/api/user/searchStudent", (req, res) => {
  const data = req.query.student;



  if (req.session.user) {
    const statement = "SELECT * FROM user_profile WHERE email = ? OR firstname = ? OR lastname = ? or (firstname = ? and lastname = ?) ";
    database.query(statement, data, (err, result) => {
      if (err) {
        res.send({ message: err });
      }
      if (result.length > 0) {
        res.send({ result: result });
      }
    });
  } else {
    res.send({ message: "User must login" });
  }
})

// ADMIN BACKEND
app.get("/api/admin/user_records", (req, res) => {

  const statement = "SELECT * FROM profile JOIN user ON profile.user_id = user.id";
  database.query(statement, userId, (err, result) => {
    if (err) {
      res.send({ message: err })
    }
    if (result.length > 0) {
      res.send({ result: result });
      console.log(result);
    } else {
      res.send({ message: "Record not found" });
    }
  });

});

app.post("/api/admin/create_records", (req, res) => {
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const gender = req.body.gender;
  const password = lname + ".123456";
  const email = req.body.email;
  const userType = req.body.userType;
  const date = new Date();

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const stmt = "SELECT * FROM profile JOIN user ON profile.user_id = user.id WHERE profile.firstname = ? AND profile.lastname = ? AND " +
      "user.email = ? AND user.kindofuser = ?";
    database.query(stmt, [fname, lname, email, userType], (err, result) => {
      if (err) {
        res.send({ message: err });
      } else if (result.length > 0) {
        res.send({ message: "Account Already Exists" });
      } else {
        const statement = "INSERT INTO user (email, password, kindofuser, date_registered) VALUES (?,?,?,?)";
        database.query(statement, [email, hash, userType, date], (err, result) => {
          if (err) {
            res.send({ message: err });
          } else {
            const statement2 = "SELECT id FROM user WHERE email = ?"
            database.query(statement2, [email], (err, results) => {
              if (err) {
                res.send({ message: err });
              } else {
                const user_id = results[0].id;
                const statement3 = "INSERT INTO profile (user_id, firstname, lastname, gender)VALUES (?,?,?,?)";
                database.query(statement3, [user_id, fname, lname, gender], (err, result) => {
                  if (err) {
                    res.send({ message: err });
                  } else {
                    res.send({ message: "Successfully Created!" });
                  }
                });
              }
            });
          }
        });
      }
    });
  });


});

app.delete("/api/admin/delete_records", (req, res) => {
  const the_id = req.query.id;
  const statement = "DELETE FROM user WHERE id = ?";
  database.query(statement, [the_id], (err, result) => {
    if (err) {
      res.send({ message: err });
    } else {
      res.send({ message: "Successfully Deleted!" });
    }
  });
});


app.put("/api/admin/edit_records", (req, res) => {
  const the_id = req.body.id;
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const gender = req.body.gender;
  const email = req.body.email;
  const statement = "UPDATE profile JOIN user ON profile.user_id = user.id SET profile.firstname = ?, profile.lastname = ?, profile.gender = ?, user.email = ? WHERE profile.user_id = ?";
  database.query(statement, [fname, lname, gender, email, the_id], (err, result) => {
    if (err) {
      res.send({ message: err });
    } else {
      res.send({ message: "Successfully Updated!" });
    }
  });
});

app.put("/api/admin/resetPW_records", (req, res) => {
  const the_id = req.body.id;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = lastname + ".123456";

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
      alert(err);
    }

    const statement = "UPDATE user SET user.password = ? WHERE user.id = ? AND user.email = ?";
    database.query(statement, [hash, the_id, email], (err, result) => {
      if (err) {
        res.send({ message: err });
      } else {
        res.send({ message: "Password has been reset!" });
      }
    });
  });
});


app.get("/api/admin/pie_data", (req, res) => {

  const statement = "SELECT user.kindofuser, COUNT(*) AS student_count FROM profile JOIN user ON profile.user_id = user.id WHERE user.kindofuser IN ('student', 'teacher') GROUP BY  user.kindofuser";
  database.query(statement, userId, (err, result) => {
    if (err) {
      res.send({ message: err })
    }
    if (result.length > 0) {
      res.send({ result: result });
      console.log(result);
    } else {
      res.send({ message: "Record not found" });
    }
  });

});

app.get("/api/admin/lesson_records", (req, res) => {

  const statement = "SELECT * FROM tb_lesson";
  database.query(statement, (err, result) => {
    if (err) {
      res.send({ message: err })
    }
    if (result.length > 0) {
      res.send({ result: result });
      console.log(result);
    } else {
      res.send({ message: "Record not found" });
    }
  });

});

app.get("/api/admin/chapter_records", (req, res) => {
  const the_id = req.query.id;
  const statement = "SELECT * FROM tb_chapter WHERE tbLesson_id = ?";
  database.query(statement, the_id, (err, result) => {
    if (err) {
      res.send({ message: err })
    }
    if (result.length > 0) {
      res.send({ result: result });
      console.log(result);
    } else {
      res.send({ message: "Record not found" });
    }
  });

});

app.get("/api/admin/student_list", (req, res) => {
  const the_id = req.query.id;
  const usertype = 'student';
  const statement =
    "SELECT *,(SELECT COUNT(*) FROM profile " +
    "JOIN tb_enroll ON tb_enroll.user_id = profile.user_id " +
    "JOIN user ON profile.user_id = user.id " +
    "WHERE user.kindofuser = (?) AND tb_enroll.lesson_id = ?) as count_data " +
    "FROM profile JOIN tb_enroll ON  tb_enroll.user_id = profile.user_id " +
    "JOIN user ON profile.user_id = user.id  WHERE user.kindofuser = (?) AND tb_enroll.lesson_id = ? "
  database.query(statement, [usertype, the_id, usertype, the_id], (err, result) => {
    if (err) {
      res.send({ message: err })
    }
    if (result) {
      res.send({ result: result });
      console.log(result);
    }
  });

});


app.listen(port, () => {
  console.log("running server");
});

