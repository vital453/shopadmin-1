/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
var express = require("express");
var mysql = require("mysql");
var cors = require("cors");
var bodyparser = require("body-parser");
var app = express();
const multer = require("multer");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const { google } = require("googleapis");
// const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require("jsonwebtoken");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var storagee = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

app.use(cors({ header: { "Access-Control-Allow-Origin": "*" } }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
//{origin: "http://localhost:8100"}

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.listen("3004", () => {
  console.log("server is running....");
});

// mysql database connection
const db = mysql.createConnection({
  user: "verswllw_vital",
  host: "localhost",
  password: ".(*xg;MVNu^^",
  database: "verswllw_shop",
});

// check db connection
db.connect((err) => {
  if (err) throw err;
  else {
    console.log("database connected ....");
  }
});

app.get("/", (req, res) => {
  res.json({ message: "OKAY" });
  console.log("server is running....");
});

//all products
app.get("/allstore", (req, res) => {
  db.query("SELECT * FROM sellers", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/recup_database", (req, res) => {
  // Récupérer la structure de la base de données
  db.query("SHOW TABLES", (err, tables) => {
    if (err) {
      console.error("Erreur lors de la récupération des tables :", err);
      return;
    }

    let sqlScript = "";

    // Générer la structure des tables
    tables.forEach((table, index) => {
      const tableName = Object.values(table)[0];

      db.query(`SHOW CREATE TABLE ${tableName}`, (err, result) => {
        if (err) {
          console.error(
            `Erreur lors de la récupération de la structure de la table ${tableName} :`,
            err
          );
          return;
        }

        const createTableSQL = result[0]["Create Table"];
        sqlScript += `${createTableSQL};\n\n`;

        // Vérifier si toutes les structures des tables ont été récupérées
        if (index === tables.length - 1) {
          // Générer les requêtes d'insertion des données
          tables.forEach((table, index) => {
            const tableName = Object.values(table)[0];

            db.query(`SELECT * FROM ${tableName}`, (err, rows) => {
              if (err) {
                console.error(
                  `Erreur lors de la récupération des données de la table ${tableName} :`,
                  err
                );
                return;
              }

              if (rows.length > 0) {
                const columns = Object.keys(rows[0]);
                const columnNames = columns.join(", ");
                const values = rows
                  .map((row) =>
                    columns
                      .map((column) => {
                        const value = row[column];
                        return value !== null && typeof value === "string"
                          ? `'${value}'`
                          : value;
                      })
                      .join(", ")
                  )
                  .join("), (");

                sqlScript += `INSERT INTO ${tableName} (${columnNames}) VALUES (${values});\n\n`;
              }

              // Vérifier si toutes les données des tables ont été récupérées
              if (index === tables.length - 1) {
                // Enregistrer le script SQL dans un fichier
                // Ajouter les données supplémentaires au script SQL
                const additionalSQL = `SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
                 START TRANSACTION;
                 SET time_zone = "+00:00";\n\n`;

                sqlScript = additionalSQL + sqlScript;

                fs.writeFile("database.sql", sqlScript, (err) => {
                  if (err) {
                    console.error(
                      "Erreur lors de l'enregistrement du script SQL :",
                      err
                    );
                    return;
                  }
                  console.log(
                    'Exportation de la base de données terminée. Le script SQL a été enregistré dans "database.sql".'
                  );
                  res.send("SQL");
                  // res.send(
                  //   'Exportation de la base de données terminée. Le script SQL a été enregistré dans "database.sql".'
                  // );
                });
              }
            });
          });
        }
      });
    });
  });
});

const GOOGLE_API_FOLDER_ID = "1eBuNoOf_ifKI_qe0HXYNfrMx6_Gn0y9A";

app.get("/save_in_drive", (req, res) => {
  try {
    // db.query("SELECT * FROM user", (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     // Convertir les résultats en format JSON
    //     const jsonData = JSON.stringify(result);

    //     fs.writeFileSync("digi.json", jsonData);
    //     console.log(result, "resultat de la requete myssql");
    //   }
    // });
    const auth = new google.auth.GoogleAuth({
      keyFile: "./googlekey.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const driveService = google.drive({
      version: "v3",
      auth,
    });

    const fileMetaData = {
      name: "database.sql",
      parents: ["1eBuNoOf_ifKI_qe0HXYNfrMx6_Gn0y9A"],
    };

    const media = {
      mimetype: "application/json",
      //   mimetype: "image/jpg",
      body: fs.createReadStream("./database.sql"),
      //   body: fs.createReadStream("./wallpaper.jpg"),
    };

    const response = driveService.files.create({
      resource: fileMetaData,
      media: media,
      field: "id",
    });
    res.send("success");
    // res.json({ message: "OKAY" });
    // return response.data.id;
  } catch (error) {
    console.log("Upload file error", error);
  }
});
//all products
app.get("/allproducts", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//aleatoire products
app.get("/aleatoire_products", (req, res) => {
  db.query("SELECT * FROM products order by rand() limit 1", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//afficher les comptes
app.post("/afficheboutiqueparcompte", (req, res) => {
  const idcompte = req.body.idcompte;
  db.query(
    "SELECT * FROM sellers where id_compte = ?",
    idcompte,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
// recup pass acces user
app.post("/affichepassacess", (req, res) => {
  const idcompte = req.body.idcompte;
  db.query(
    "SELECT pass_acces FROM compte where id = ?",
    idcompte,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// update pass acces user
app.post("/updatepassacces", (req, res) => {
  const idcompte = req.body.idcompte;
  const pass_acces = req.body.pass_acces;
  db.query(
    "UPDATE compte SET pass_acces = ? where id = ?",
    [pass_acces, idcompte],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/addcompte", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  db.query(
    "INSERT INTO compte (username, password, email) VALUES (?,?,?)",
    [username, password, email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("succes");
      }
    }
  );
});
//registration
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const code_parrain = req.body.code_parrain;
  const type = req.body.type;
  const email = req.body.emaill;
  let idmax = 0;
  let idmaxx = 0;
  if (type == "sellers") {
    db.query(
      "SELECT * FROM compte WHERE username = ?",
      username,
      (err, result) => {
        // if(err){
        //   console.log(err);
        //   res.send({ err: err});

        // }
        //   res.send(result);
        if (result.length > 0) {
          res.json({
            regist: false,
            message: "Ce nom d'utilisateur existe déjà !",
          });
        } else {
          db.query(
            "SELECT * FROM sellers WHERE boutiqueName = ?",
            code_parrain,
            (err, result) => {
              if (result.length > 0) {
                res.json({
                  regist: false,
                  message: "Ce code de parrainage existe déjà !",
                });
              } else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                  if (err) {
                    console.log(err);
                  }

                  db.query(
                    "INSERT INTO compte (username, password, email) VALUES (?,?,?)",
                    [username, hash, email],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        //  res.send("Values Inserted");
                        db.query(
                          "SELECT  MAX(id) AS idm FROM compte ",
                          (err, result) => {
                            if (err) {
                              console.log(err);
                            } else {
                              //res.send(result);
                              idmax = result[0].idm;
                              db.query(
                                "insert into sellers(boutiqueName, id_compte, username) values (?,?,?)",
                                [code_parrain, idmax, username],
                                (err, result) => {
                                  if (!err) {
                                    db.query(
                                      "SELECT  MAX(id) AS idmm FROM sellers ",
                                      (err, result) => {
                                        if (err) {
                                          console.log(err);
                                        } else {
                                          //res.send(result);
                                          idmaxx = result[0].idmm;
                                          db.query(
                                            "insert into caisse(id_boutique, caisse) values (?,?)",
                                            [idmaxx, 0],
                                            (err, result) => {
                                              if (!err) {
                                                res.send("success");
                                              } else {
                                                console.log(err);
                                              }
                                            }
                                          );
                                        }
                                      }
                                    );
                                  } else {
                                    console.log(err);
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                });
              }
            }
          );
        }
      }
    );
  } else if (type == "clients") {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      username,
      (err, result) => {
        // if(err){
        //   console.log(err);
        //   res.send({ err: err});

        // }
        //   res.send(result);
        if (result.length > 0) {
          res.json({
            regist: false,
            message: "Ce nom d'utilisateur existe déjà !",
          });
        } else {
          bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              console.log(err);
            }

            db.query(
              "INSERT INTO users (username, password) VALUES (?,?)",
              [username, hash],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send("Values Inserted");
                }
              }
            );
          });
        }
      }
    );
  }
});
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;

  if (type == "sellers") {
    db.query(
      "SELECT * FROM sellers WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          //   console.log(err);
          res.send({ err: err });
        }
        //   res.send(result);
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              const id = result[0].id;
              const token = jwt.sign({ id }, "jwtSecret", {
                expiresIn: 6000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,
              });
              req.session.user = result;

              // res.send(result);
              res.json({ auth: true, token: token, result: result });
            } else {
              // res.send({ message: "Mauvaise combinaison"})
              res.json({ auth: false, message: "Mauvaise combinaison" });
            }
          });
        } else {
          res.json({ auth: false, message: "L'utilisateur n'existe pas" });
          // res.send({ message: "L'utilisateur n'existe pas"});
        }
      }
    );
  } else if (type == "clients") {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          //   console.log(err);
          res.send({ err: err });
        }
        //   res.send(result);
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              const id = result[0].id;
              const token = jwt.sign({ id }, "jwtSecret", {
                expiresIn: 30,
              });
              req.session.user = result;

              // res.send(result);
              res.json({ auth: true, token: token, result: result });
            } else {
              // res.send({ message: "Mauvaise combinaison"})
              res.json({ auth: false, message: "Mauvaise combinaison" });
            }
          });
        } else {
          res.json({ auth: false, message: "L'utilisateur n'existe pas" });
          // res.send({ message: "L'utilisateur n'existe pas"});
        }
      }
    );
  }
});

app.post("/loginn", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;
  let idboutique = 0;
  if (type == "sellers") {
    db.query(
      "SELECT id FROM sellers where username = ?",
      username,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length > 0) {
          idboutique = result[0].id;
          db.query(
            "SELECT * FROM compte WHERE username = ?",
            username,
            (err, result) => {
              if (err) {
                //   console.log(err);
                res.send({ err: err });
              }
              //   res.send(result);
              if (result.length > 0) {
                bcrypt.compare(
                  password,
                  result[0].password,
                  (error, response) => {
                    if (response) {
                      const id = result[0].id;
                      const token = jwt.sign({ id }, "jwtSecret");
                      req.session.user = result;

                      // res.send(result);

                      res.json({
                        auth: true,
                        token: token,
                        idbout: idboutique,
                        result: result,
                      });
                    } else {
                      // res.send({ message: "Mauvaise combinaison"})
                      res.json({
                        auth: false,
                        message: "Mauvaise combinaison",
                      });
                    }
                  }
                );
              } else {
                res.json({
                  auth: false,
                  message: "L'utilisateur n'existe pas",
                });
                // res.send({ message: "L'utilisateur n'existe pas"});
              }
            }
          );
        } else {
          res.json({ auth: false, message: "L'utilisateur n'existe pas" });
          // res.send({ message: "L'utilisateur n'existe pas"});
        }
      }
    );
  } else if (type == "clients") {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          //   console.log(err);
          res.send({ err: err });
        }
        //   res.send(result);
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              const id = result[0].id;
              const token = jwt.sign({ id }, "jwtSecret", {
                expiresIn: 30,
              });
              req.session.user = result;

              // res.send(result);
              res.json({ auth: true, token: token, result: result });
            } else {
              // res.send({ message: "Mauvaise combinaison"})
              res.json({ auth: false, message: "Mauvaise combinaison" });
            }
          });
        } else {
          res.json({ auth: false, message: "L'utilisateur n'existe pas" });
          // res.send({ message: "L'utilisateur n'existe pas"});
        }
      }
    );
  }
});
const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("Nous avons besoin du token, donnez le nous prochainement!");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Connexion expirée" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("Vous etes authentifier");
});

app.put("/changepassword", async (req, res) => {
  const { oldPassword, newPassword, username, type } = req.body;

  if (type == "sellers") {
    db.query(
      "SELECT * FROM sellers WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          //   console.log(err);
          res.send({ err: err });
        }
        //   res.send(result);
        if (result.length > 0) {
          bcrypt
            .compare(oldPassword, result[0].password)
            .then(async (match) => {
              if (!match) {
                res.json({ error: "Wrong Password Entered!" });
              } else {
                bcrypt.hash(newPassword, 10).then((hash) => {
                  db.query(
                    "UPDATE sellers SET password = ? WHERE username = ?",
                    [hash, username],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        // console.log('succes');
                        // res.send(result);
                        res.json("SUCCESS");
                      }
                    }
                  );
                });
              }
            });
        }
        //   else {
        //       res.json({auth: false, message: "L'utilisateur n'existe pas" });
        //       // res.send({ message: "L'utilisateur n'existe pas"});
        //   }
      }
    );
  } else if (type == "clients") {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      username,
      (err, result) => {
        if (err) {
          //   console.log(err);
          res.send({ err: err });
        }
        //   res.send(result);
        if (result.length > 0) {
          bcrypt
            .compare(oldPassword, result[0].password)
            .then(async (match) => {
              if (!match) {
                res.json({ error: "Wrong Password Entered!" });
              } else {
                bcrypt.hash(newPassword, 10).then((hash) => {
                  db.query(
                    "UPDATE users SET password = ? WHERE username = ?",
                    [hash, username],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        // console.log('succes');
                        // res.send(result);
                        res.json("SUCCESS");
                      }
                    }
                  );
                });
              }
            });
        }
        //   else {
        //       res.json({auth: false, message: "L'utilisateur n'existe pas" });
        //       // res.send({ message: "L'utilisateur n'existe pas"});
        //   }
      }
    );
  }
});

//creation d'une nouvelle boutique
app.post("/addboutique", (req, res) => {
  const store_name = req.body.store_name;
  const boutiqueName = req.body.boutiqueName;
  const email = req.body.email;
  const id_compte = req.body.id_compte;
  let idmax = 0;
  let idmaxx = 0;
  db.query(
    "SELECT * FROM sellers WHERE username = ?",
    store_name,
    (err, result) => {
      // if(err){
      //   console.log(err);
      //   res.send({ err: err});

      // }
      //   res.send(result);
      if (result.length > 0) {
        res.json({
          regist: false,
          message: "Ce nom d'utilisateur existe déjà !",
        });
      } else {
        db.query(
          "SELECT * FROM sellers WHERE boutiqueName = ?",
          boutiqueName,
          (err, result) => {
            if (result.length > 0) {
              res.json({
                regist: false,
                message: "Ce code de parrainage existe déjà !",
              });
            } else {
              db.query(
                "insert into sellers(id_compte, username,  store_name, boutiqueName) values (?,?,?,?)",
                [id_compte, store_name, store_name, boutiqueName],
                (err, result) => {
                  if (!err) {
                    db.query(
                      "SELECT  MAX(id) AS idmm FROM sellers ",
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          //res.send(result);
                          idmaxx = result[0].idmm;
                          db.query(
                            "insert into caisse(id_boutique, caisse) values (?,?)",
                            [idmaxx, 0],
                            (err, result) => {
                              if (!err) {
                                res.send("succes");
                              } else {
                                console.log(err);
                              }
                            }
                          );
                        }
                      }
                    );
                  } else {
                    console.log(err);
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

//initialiser les droits d'acees
app.get("/initialse_access", (req, res) => {
  let id_boutique = 0;
  let idmaxx = 0;
  let id_compte = 0;
  let username = "";
  db.query("SELECT  MAX(id) AS idmm FROM sellers ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      //res.send(result);
      idmaxx = result[0].idmm;
      db.query(
        "SELECT id_compte, username, id FROM sellers WHERE id = ?",
        idmaxx,
        (err, result) => {
          if (!err) {
            id_boutique = result[0].id;
            id_compte = result[0].id_compte;
            username = result[0].username;
            db.query(
              "insert into acces(id_compte, id_boutique, store_name, gestion_vente, gestion_produit, histo_operation, histo_vente, histo_depense, histo_appro, finance_day, finance_periode, gestion_caisse, gestion_depense, gestion_decaisse, gestion_commande_attente) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                id_compte,
                id_boutique,
                username,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
              ],
              (err, result) => {
                if (!err) {
                  res.send("success");
                } else {
                  console.log(err);
                }
              }
            );
          } else {
            console.log(err);
          }
        }
      );
    }
  });
});

app.post("/majaccesboutique", (req, res) => {
  const store_name = req.body.store_name;
  const id_compte = req.body.id_compte;
  const id_boutique = req.body.id_boutique;
  const gestion_vente = req.body.gestion_vente;
  const gestion_produit = req.body.gestion_produit;
  const histo_operation = req.body.histo_operation;
  const histo_vente = req.body.histo_vente;
  const histo_depense = req.body.histo_depense;
  const histo_appro = req.body.histo_appro;
  const finance_day = req.body.finance_day;
  const finance_periode = req.body.finance_periode;
  const gestion_caisse = req.body.gestion_caisse;
  const gestion_depense = req.body.gestion_depense;
  const gestion_decaisse = req.body.gestion_decaisse;
  const gestion_commande_attente = req.body.gestion_commande_attente;
  db.query(
    "SELECT * FROM acces where id_boutique = ?",
    [id_boutique],
    (err, result) => {
      if (result.length > 0) {
        db.query(
          "UPDATE acces SET gestion_vente = ?, gestion_produit = ?, histo_operation = ?, histo_vente = ?, histo_depense = ?, histo_appro = ?, finance_day = ?, finance_periode = ?, gestion_caisse = ?, gestion_depense = ?, gestion_decaisse = ?, gestion_commande_attente = ? where id_compte = ? and id_boutique = ?",
          [
            gestion_vente,
            gestion_produit,
            histo_operation,
            histo_vente,
            histo_depense,
            histo_appro,
            finance_day,
            finance_periode,
            gestion_caisse,
            gestion_depense,
            gestion_decaisse,
            gestion_commande_attente,
            id_compte,
            id_boutique,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("success");
            }
          }
        );
      } else {
        //  res.send("blablablabla");
        db.query(
          "insert into acces(id_compte, id_boutique, store_name, gestion_vente, gestion_produit, histo_operation, histo_vente, histo_depense, histo_appro, finance_day, finance_periode, gestion_caisse, gestion_depense, gestion_decaisse, gestion_commande_attente) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            id_compte,
            id_boutique,
            store_name,
            gestion_vente,
            gestion_produit,
            histo_operation,
            histo_vente,
            histo_depense,
            histo_appro,
            finance_day,
            finance_periode,
            gestion_caisse,
            gestion_depense,
            gestion_decaisse,
            gestion_commande_attente,
          ],
          (err, result) => {
            if (!err) {
              res.send("success");
            } else {
              console.log(err);
            }
          }
        );
      }
    }
  );
});

app.post("/afficheaccesparboutique", (req, res) => {
  const id_compte = req.body.id_compte;
  db.query(
    "SELECT * FROM acces where id_compte = ?",
    [id_compte],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//verif parrain
app.post("/verif_parrainage", (req, res) => {
  const boutique = req.body.boutique;
  db.query(
    "SELECT * FROM sellers WHERE boutiqueName = ?",
    [boutique],
    (err, result) => {
      if (result.length > 0) {
        res.json({ message: "succ", result: result });
      } else {
        res.json({ message: "sacc", auth: false });
      }
    }
  );
});
//Liste categories
app.post("/affichecategory", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM category where seller_id = ?",
    id_boutique,
    (err, result) => {
      {
        /* -la bibliothèque axios permet d'envoyer les requêtes de recherche sql dans la base de données grâce aux fonctions post get put  */
      }
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//crée categories
app.post("/addcategory", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const name = req.body.name;
  // const description = req.body.description;
  db.query(
    "INSERT INTO category (nom, seller_id) VALUES (?,?)",
    [name, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("succ");
      }
    }
  );
});

//Liste libellé statut
app.get("/affichelibstat", (req, res) => {
  db.query("SELECT * FROM statuscommande", (err, result) => {
    {
      /* -la bibliothèque axios permet d'envoyer les requêtes de recherche sql dans la base de données grâce aux fonctions post get put  */
    }
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//récupération d'une category
app.post("/recupcat", (req, res) => {
  const id = req.body.id;
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM category  WHERE id =? and seller_id = ?",
    [id, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/supprpan", (req, res) => {
  db.query("DELETE FROM panier where 1=1 ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deletepan/:ide", (req, res) => {
  const id = req.params.ide;
  db.query("DELETE FROM panier WHERE product_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/majpan", (req, res) => {
  const product_quantity = req.body.product_quantity;
  const product_id = req.body.product_id;
  const total_price = req.body.price * req.body.product_quantity;
  db.query(
    "UPDATE panier SET product_quantity = ?, total_price= ? WHERE product_id = ? ",
    [product_quantity, total_price, product_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/majlike", (req, res) => {
  const id = req.body.id;
  const nblike = req.body.nblike;
  const addlike = req.body.addlike;
  const id_boutique = req.body.id_boutique;
  db.query(
    "UPDATE products SET like_number = ? WHERE id = ? and seller_id = ?",
    [nblike + addlike, id, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

//afficher le panier
app.get("/affichepanier", (req, res) => {
  db.query("SELECT * FROM panier", (err, result) => {
    {
      /* -la bibliothèque axios permet d'envoyer les requêtes de recherche sql dans la base de données grâce aux fonctions post get put  */
    }
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//ajouter au panier

app.post("/ajoutpanier", (req, res) => {
  {
    /* -Pour l'exécution des requêtes on a besoin d'initialiser une connexion à la bd et qui contiendra les identifiants de connexions   */
  }
  const product_id = req.body.product_id;
  const unite_price = req.body.unite_price;
  const product_quantity = req.body.product_quantity;
  const total_price = req.body.total_price;
  const product_name = req.body.product_name;
  const stock = req.body.stock;

  db.query(
    "INSERT INTO panier (product_id, product_name, unite_price, product_quantity, total_price,stock) VALUES (?,?,?,?,?,?)",
    [
      product_id,
      product_name,
      unite_price,
      product_quantity,
      total_price,
      stock,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("suc");
      }
    }
  );
});

app.post("/total_command_byseller", (req, res) => {
  const invoice = req.body.invoice;
  db.query(
    "SELECT invoice, whatsapp, SUM(total_price) AS TOTALPRICE , SUM(product_quantity) AS TOTALQUANTITE, seller_id FROM commands WHERE invoice = ? GROUP BY seller_id ASC",
    invoice,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// créer une commande
app.post("/ajoutcommande", (req, res) => {
  const totalquant = req.body.totalquant;
  const totalprix = req.body.totalprix;
  const invoice = req.body.invoice;
  const whatsapp = req.body.whatsapp;
  const id_boutique = req.body.id_boutique;
  const status_paiement = req.body.status_paiement;
  const status_id_command = 3;
  if (status_paiement == "NON PAYER") {
    db.query(
      "INSERT INTO command_validation (invoice, total_quantity, total_price, whatsapp,seller_id, status_paiement, status_id_command) VALUES (?,?,?,?,?,?,?)",
      [
        invoice,
        totalquant,
        totalprix,
        whatsapp,
        id_boutique,
        status_paiement,
        status_id_command,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("suc");
        }
      }
    );
  } else {
    db.query(
      "INSERT INTO command_validation (invoice, total_quantity, total_price, whatsapp,seller_id, status_paiement) VALUES (?,?,?,?,?,?)",
      [invoice, totalquant, totalprix, whatsapp, id_boutique, status_paiement],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("suc");
        }
      }
    );
  }
});

app.post("/maj_status_paiment", (req, res) => {
  const invoice = req.body.invoice;
  const id_boutique = req.body.id_boutique;
  const transactionId = req.body.transactionId;
  const status_paiement = "PAYER";
  db.query(
    "UPDATE command_validation SET status_paiement = ?, transactionId = ? WHERE invoice = ? and seller_id = ?",
    [status_paiement, transactionId, invoice, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/listecommandenum", (req, res) => {
  const invoice = req.body.invoice;
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT seller_id, product_id, product_name FROM commands WHERE invoice = ? and seller_id = ?",
    [invoice, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/verif_valid_fac", (req, res) => {
  const invoice = req.body.invoice;
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT transactionId FROM command_validation WHERE invoice = ? and seller_id = ?",
    [invoice, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/listeproduitnum", (req, res) => {
  db.query("SELECT * FROM numeric_product", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// créer une vente
app.post("/ajoutvente", (req, res) => {
  const totalquant = req.body.totalquant;
  const totalprix = req.body.totalprix;
  const invoice = req.body.invoice;
  const status = 3;
  const whatsapp = req.body.whatsapp;
  const id_boutique = req.body.id_boutique;
  const date = req.body.date;

  db.query(
    "INSERT INTO command_validation (invoice, total_quantity, total_price, status_id_command, whatsapp,seller_id,date) VALUES (?,?,?,?,?,?,FROM_UNIXTIME(?))",
    [invoice, totalquant, totalprix, status, whatsapp, id_boutique, date],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("suc");
      }
    }
  );
});

//delete commande
app.post("/deletevente", (req, res) => {
  const invoice = req.body.invoice;
  db.query("DELETE FROM commands WHERE invoice = ?", invoice, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      db.query(
        "DELETE FROM command_validation WHERE invoice = ?",
        invoice,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("succes");
            res.send("succes");
          }
        }
      );
    }
  });
});

//add featured products
app.post("/addfeaturedprod", (req, res) => {
  const id_row = req.body.id_row;
  const status = "Actif";
  // const id_product = req.body.id_product;
  // const id_product = req.body.id_product;
  // const description = req.body.description;
  // db.query(
  //   "SELECT * FROM featured_products WHERE id_product = ?",
  //   id_product,
  //   (err, result) => {
  //     if (result.length > 0) {
  //       res.send("ce produit a deja ete ajouter au tendance");
  //     } else {
  //       db.query(
  //         "INSERT INTO featured_products (id_boutique, id_product) VALUES (?,?)",
  //         [id_boutique, id_product],
  //         (err, result) => {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             res.send("succes");
  //           }
  //         }
  //       );
  //     }
  //   }
  // );
  db.query(
    "UPDATE promotion SET status = ? WHERE id = ?",
    [status, id_row],
    (err, result) => {
      if (err) {
        res.send("err");
      } else {
        res.send("succes");
      }
    }
  );
});
app.post("/addpromotionprod", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const id_product = req.body.id_product;
  const date_debut = req.body.date_debut;
  const date_fin = req.body.date_fin;
  const whatsapp = req.body.whatsapp;
  const status = "Actif";
  // const dateObj1 = new Date(parseInt(date_debut) * 1000);
  // const dateObj2 = new Date(parseInt(date_fin) * 1000);
  // const dateObj1 = FROM_UNIXTIME(parseInt(date_debut));
  // const dateObj2 = FROM_UNIXTIME(parseInt(date_fin));

  // const formattedDate1 = dateObj1.toISOString();

  // const formattedDate2 = dateObj2.toISOString();
  // const description = req.body.description;
  // db.query(
  //   "SELECT * FROM promotion WHERE id_product = ? and status = ?",
  //   [id_product, status],
  //   (err, result) => {
  //     if (result.length > 0) {
  //       res.send("ce produit est deja en promotion");
  //     } else {
  //       db.query(
  //         "INSERT INTO promotion (id_boutique, id_product, date_debut, date_fin, whatsapp) VALUES (?,?,FROM_UNIXTIME(?),FROM_UNIXTIME(?),?)",
  //         [id_boutique, id_product, date_debut, date_fin, whatsapp],
  //         (err, result) => {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             res.send("succes");
  //           }
  //         }
  //       );
  //     }
  //   }
  // );
  db.query(
    "INSERT INTO promotion (id_boutique, id_product, date_debut, date_fin, whatsapp) VALUES (?,?,FROM_UNIXTIME(?),FROM_UNIXTIME(?),?)",
    [id_boutique, id_product, date_debut, date_fin, whatsapp],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("succes");
      }
    }
  );
});

//delete featured products
app.post("/deletefeaturedprod", (req, res) => {
  const id_row = req.body.id_row;
  const status = "Inactif";
  db.query(
    "UPDATE promotion SET status = ? WHERE id = ?",
    [status, id_row],
    (err, result) => {
      if (err) {
        res.send("err");
      } else {
        res.send("succes");
      }
    }
  );
  // db.query(
  //   "DELETE FROM featured_products WHERE id_product = ?",
  //   id,
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log("succes");
  //       res.send("succes");
  //     }
  //   }
  // );
});

//all featured products
app.get("/allfeaturedproducts", (req, res) => {
  db.query("SELECT * FROM featured_products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//nouvelle demande de fonctionnalité
app.post("/demande_fonctionnalite", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const store_name = req.body.store_name;
  const whatsapp = req.body.whatsapp;
  const demande = req.body.demande;
  db.query(
    "INSERT INTO demande_fonctionnalité (id_boutique, store_name, whatsapp, demande) VALUES (?,?,?,?)",
    [id_boutique, store_name, whatsapp, demande],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("suc");
      }
    }
  );
});

//recuperer toutes les demandes de fonctionnalité
app.get("/getalldemande", (req, res) => {
  db.query("SELECT * FROM demande_fonctionnalité", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/ajoutapprov", (req, res) => {
  const totalquant = req.body.totalquant;
  const totalprix = req.body.totalprix;
  const invoice = req.body.invoice;
  const id_boutique = req.body.id_boutique;
  db.query(
    "INSERT INTO approvisionnement_validation (invoice, total_quantity, total_price,seller_id) VALUES (?,?,?,?)",
    [invoice, totalquant, totalprix, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("suc");
      }
    }
  );
});

// créer liste commande
app.post("/ajoutcomList", (req, res) => {
  let numfin = 0;
  let newnum = 0;
  const panier = req.body.panier;
  let id = 0;
  const status = 1;
  let taillecom = [];
  const tail = req.body.tail;
  const whatsapp = req.body.whatsapp;
  const picture1 = "uploads/1660942837.jpg";
  // const id_boutique = req.body.id_boutique;
  let invoice = "";

  db.query("SELECT * FROM command_validation", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        db.query(
          "SELECT MAX(id) AS TOTA FROM command_validation",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              id = result[0].TOTA;
              db.query(
                "SELECT * FROM command_validation WHERE id = ?",
                id,
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    numfin = parseInt(result[0].invoice.slice(5));
                    newnum = numfin + 1;
                    invoice = `FAB00${newnum}`;
                    res.send(invoice);
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});
app.post("/ajoutcomList1", (req, res) => {
  let numfin = 0;
  let newnum = 0;
  const panier = req.body.panier;
  let id = 0;
  const status = 1;
  let taillecom = [];
  const tail = req.body.tail;
  const whatsapp = req.body.whatsapp;
  const product_quantity = req.body.product_quantity;
  const total_price = req.body.total_price;
  const unite_price = req.body.unite_price;
  const product_name = req.body.product_name;
  const product_id = req.body.product_id;
  const stock = req.body.stock;
  const picture1 = req.body.picture1;
  const BoutiqueId = req.body.BoutiqueId;
  const total_sold = req.body.total_sold;
  const invoice = req.body.invoice;
  const quantifiable_product = req.body.quantifiable_product;

  db.query(
    "INSERT INTO commands (product_quantity, total_price , unite_price , product_name,product_id, stock, invoice, whatsapp, picture, seller_id, status_id_command, total_sold, quantifiable_product) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      product_quantity,
      total_price,
      unite_price,
      product_name,
      product_id,
      stock,
      invoice,
      whatsapp,
      picture1,
      BoutiqueId,
      status,
      total_sold,
      quantifiable_product,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/ajoutcomList2", (req, res) => {
  let numfin = 0;
  let newnum = 0;
  const panier = req.body.panier;
  let id = 0;
  const status = 1;
  let taillecom = [];
  const tail = req.body.tail;
  const whatsapp = req.body.whatsapp;
  const product_quantity = req.body.product_quantity;
  const total_price = req.body.total_price;
  const unite_price = req.body.unite_price;
  const product_name = req.body.product_name;
  const product_id = req.body.product_id;
  const stock = req.body.stock;
  const picture1 = req.body.picture1;
  const BoutiqueId = req.body.BoutiqueId;
  const total_sold = req.body.total_sold;
  const quantifiable_product = req.body.quantifiable_product;
  // const picture1 = "uploads/1660942837.jpg";
  // const id_boutique = req.body.id_boutique;
  let invoice = "";

  db.query("SELECT * FROM command_validation", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        db.query(
          "SELECT MAX(id) AS TOTA FROM command_validation",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              id = result[0].TOTA;
              db.query(
                "SELECT * FROM command_validation WHERE id = ?",
                id,
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    numfin = parseInt(result[0].invoice.slice(5));
                    newnum = numfin + 1;
                    invoice = `FAB00${newnum}`;
                    // for (var i = 0; i < tail; i++) {

                    // }
                    db.query(
                      "INSERT INTO commands (product_quantity, total_price , unite_price , product_name,product_id, stock, invoice, whatsapp, picture, seller_id, status_id_command, total_sold, quantifiable_product) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                      [
                        product_quantity,
                        total_price,
                        unite_price,
                        product_name,
                        product_id,
                        stock,
                        invoice,
                        whatsapp,
                        picture1,
                        BoutiqueId,
                        status,
                        total_sold,
                        quantifiable_product,
                      ],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          res.send(invoice);
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});

app.post("/ajoutventeList", (req, res) => {
  let numfin = 0;
  let newnum = 0;
  let id = 0;
  const status = 3;
  let invoice = "";

  db.query("SELECT * FROM command_validation", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        db.query(
          "SELECT MAX(id) AS TOTA FROM command_validation",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              id = result[0].TOTA;
              db.query(
                "SELECT * FROM command_validation WHERE id = ?",
                id,
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    numfin = parseInt(result[0].invoice.slice(5));
                    newnum = numfin + 1;
                    invoice = `FAB00${newnum}`;
                    res.send(invoice);
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});
app.post("/ajoutventeList2", (req, res) => {
  let numfin = 0;
  let newnum = 0;
  let id = 0;
  const status = 3;
  const whatsapp = req.body.whatsapp;
  const picture1 = "uploads/1660942837.jpg";
  const id_boutique = req.body.id_boutique;
  const product_quantity = req.body.product_quantity;
  const total_price = req.body.total_price;
  const unite_price = req.body.unite_price;
  const product_name = req.body.product_name;
  const product_id = req.body.product_id;
  const stock = req.body.stock;
  const invoice = req.body.invoice;
  const total_sold = req.body.total_sold;
  const quantifiable_product = req.body.quantifiable_product;
  const command_date = req.body.command_date;

  db.query(
    "INSERT INTO commands (product_quantity, total_price , unite_price , product_name, product_id, stock, invoice, whatsapp, picture, seller_id, status_id_command, total_sold, quantifiable_product,command_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,FROM_UNIXTIME(?))",
    [
      product_quantity,
      total_price,
      unite_price,
      product_name,
      product_id,
      stock,
      invoice,
      whatsapp,
      picture1,
      id_boutique,
      status,
      total_sold,
      quantifiable_product,
      command_date,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("succes");
      }
    }
  );
});

app.post("/ajoutapprovList", (req, res) => {
  let numfin = 0;
  let newnum = 0;
  const panier = req.body.approv;
  let id = 0;
  const tail = req.body.tail;
  let invoice = 0;
  const id_boutique = req.body.id_boutique;
  db.query("SELECT * FROM approvisionnement_validation", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result) {
        db.query(
          "SELECT MAX(id) AS TOTA FROM approvisionnement_validation",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              id = result[0].TOTA;
              db.query(
                "SELECT * FROM approvisionnement_validation WHERE id = ?",
                id,
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    numfin = parseInt(result[0].invoice.slice(5));
                    newnum = numfin + 1;
                    invoice = `FAB00${newnum}`;
                    for (var i = 0; i < tail; i++) {
                      db.query(
                        "INSERT INTO approvisionnement (stock_appro, total_price , unite_price , product_name,product_id, invoice, stock_preview,picture,seller_id) VALUES (?,?,?,?,?,?,?,?,?)",
                        [
                          panier[i].stock_appro,
                          panier[i].total_price,
                          panier[i].unite_price,
                          panier[i].product_name,
                          panier[i].product_id,
                          invoice,
                          panier[i].stock_preview,
                          panier[i].picture,
                          id_boutique,
                        ],
                        (err, result) => {
                          if (err) {
                            console.log(err);
                          } else {
                            /* res.json({ind:i}); */
                          }
                        }
                      );
                    }
                    res.send(invoice);
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});

app.post("/ajoutapprovList1", (req, res) => {
  let numfin = 0;
  let newnum = 0;
  const stock_appro = req.body.stock_appro;
  const total_price = req.body.total_price;
  const unite_price = req.body.unite_price;
  const product_name = req.body.product_name;
  const product_id = req.body.product_id;
  const stock_preview = req.body.stock_preview;
  const picture = req.body.picture;
  let id = 0;
  let invoice = 0;
  const id_boutique = req.body.id_boutique;
  db.query(
    "INSERT INTO approvisionnement (stock_appro, total_price , unite_price , product_name,product_id, invoice, stock_preview,picture,seller_id) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      stock_appro,
      total_price,
      unite_price,
      product_name,
      product_id,
      invoice,
      stock_preview,
      picture,
      id_boutique,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        /* res.json({ind:i}); */
        res.send("suc");
      }
    }
  );
});

app.post("/ajoutapprovList12", (req, res) => {
  let numfin = 0;
  let newnum = 0;
  const stock_appro = req.body.stock_appro;
  const total_price = req.body.total_price;
  const unite_price = req.body.unite_price;
  const product_name = req.body.product_name;
  const product_id = req.body.product_id;
  const stock_preview = req.body.stock_preview;
  const picture = req.body.picture;
  let id = 0;
  let invoice = 0;
  const id_boutique = req.body.id_boutique;
  db.query(
    "INSERT INTO approvisionnement (stock_appro, total_price , unite_price , product_name,product_id, invoice, stock_preview,picture,seller_id) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      stock_appro,
      total_price,
      unite_price,
      product_name,
      product_id,
      invoice,
      stock_preview,
      picture,
      id_boutique,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        /* res.json({ind:i}); */
        res.send("suc");
      }
    }
  );
});

app.post("/reclusia", (req, res) => {
  const pan = req.body.panier;

  db.query(
    "SELECT * FROM products  WHERE id =?",
    pan[0].product_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//récupération d'un article
app.post("/recupart", (req, res) => {
  const id = req.body.id;
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM products  WHERE id =? and seller_id = ?",
    [id, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//test
app.post("/test1", (req, res) => {
  const id = req.body.id;

  res.send(id + "");
});

//liste des articles
app.post("/afficheart", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM products where seller_id = ?",
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//liste des articles par ordre croissant
app.get("/afficheartcroiss", (req, res) => {
  db.query("SELECT * FROM products ORDER BY name ASC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//`SELECT * FROM todotbl ORDER BY id DESC LIMIT 10`

app.post("/arrivage", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    `SELECT * FROM products where seller_id = ? ORDER BY id DESC LIMIT 10`,
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/recent", (req, res) => {
  const dateact = req.body.dateact;
  const id_boutique = req.body.id_boutique;
  db.query(
    `SELECT * FROM products WHERE creation_date >= ? and seller_id = ?`,
    [dateact, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/populaire", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    `SELECT * FROM products WHERE like_number >= 50 and seller_id = ? `,
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/datenow", (req, res) => {
  db.query(`SELECT NOW()`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result + " ");
    }
  });
});

//liste des articles par categorie
app.post("/articlecateg", (req, res) => {
  const idcat = req.body.idcat;
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM products  WHERE category_id =? and seller_id = ?",
    [idcat, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//liste des commandes
app.post("/affichecommande", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM command_validation where seller_id = ?",
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/affichecommandeart", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM commands where seller_id = ?",
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//liste des approvisionnements
app.post("/afficheapprov", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM approvisionnement_validation where seller_id = ?",
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//liste des commandes validées
app.get("/affichecomv", (req, res) => {
  db.query(
    "SELECT * FROM command_validation WHERE statut =1 ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//liste articles par commande
app.post("/afficheartcom", (req, res) => {
  const invoice = req.body.invoice;
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM commands WHERE invoice =? and seller_id = ?",
    [invoice, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//liste articles par approvisionnement
app.post("/afficheartapprov", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM approvisionnement WHERE seller_id = ?",
    [id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/imga/:id/:stat", async (req, res) => {
  const id = req.params.id;
  const stat = req.params.stat;
  // 'avatar' is the name of our file input field in the HTML form
  let upload = multer({ storage: storage }).single("avatar");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields

    if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    let classifiedsadd = { picture2: req.file.filename };
    if (stat == 1) {
      classifiedsadd = {
        picture1: "uploads/" + req.file.filename,
      };
    }
    if (stat == 2) {
      classifiedsadd = {
        picture2: "uploads/" + req.file.filename,
      };
    }
    if (stat == 3) {
      classifiedsadd = {
        picture3: "uploads/" + req.file.filename,
      };
    }
    if (stat == 4) {
      classifiedsadd = {
        picture4: "uploads/" + req.file.filename,
      };
    }
    if (stat == 5) {
      classifiedsadd = {
        video: "uploads/" + req.file.filename,
      };
    }

    //	const sql = "UPDATE products SET picture2 = ? WHERE id = 47";
    const sql = "UPDATE products SET ? WHERE id = ?";
    db.query(sql, [classifiedsadd, id], (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: 1 });
        // res.send("suc");
      }
      //	res.json({ success: 1 }) ;
      //   res.send(id+"");
    });
  });

  //res.send(id+"");
});

app.put("/imgbn", async (req, res) => {
  // 'avatar' is the name of our file input field in the HTML form
  let upload = multer({ storage: storagee }).single("avatar");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields

    if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    } else return res.send("imgbn");
  });
});
// const upload1 = multer({ storage: storagee });
// app.post("/imgbn", upload1.single("avatar"), (req, res) => {
//   // 'avatar' is the name of our file input field in the HTML form
//   //let upload = multer({ storage: storagee }).single("avatar");

//  if (!req.file) {
//       return res.send("Please select an image to upload");
//     } else if (err instanceof multer.MulterError) {
//       return res.send(err);
//     } else if (err) {
//       return res.send(err);
//     }else return res.send('imgbn');

// });

app.post("/newart", async (req, res) => {
  const nom = req.body.nom;
  const prix = req.body.prix;
  const reduc = req.body.reduc;
  const description = req.body.descript;
  const stock = req.body.stock;
  const seller_id = req.body.seller_id;
  const category = req.body.category;
  const promotion = req.body.promotion;
  const mdlivraison = req.body.mdlivraison;
  const delailivre = req.body.delailivre;
  const disponibilite = req.body.disponibilite;
  const prixachat = req.body.prixachat;
  const paiment_mode = req.body.paiment_mode;
  const type_product = req.body.type_product;
  const quantifiable_product = req.body.quantifiable_product;
  const id_boutique = req.body.id_boutique;
  const picture1 = "uploads/aliments.png";
  db.query(
    "INSERT INTO products (name, price, description, discount, seller_id, stock, category_id, cost, picture1, paiment_mode, type_product, quantifiable_product) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      nom,
      prix,
      description,
      reduc,
      seller_id,
      stock,
      category,
      prixachat,
      picture1,
      paiment_mode,
      type_product,
      quantifiable_product,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //res.send("suc");
        db.query("SELECT  MAX(id) AS tota FROM products ", (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      }
    }
  );
});

app.post("/editerart", async (req, res) => {
  const nom = req.body.nom;
  const prix = req.body.prix;
  const reduc = req.body.reduc;
  const description = req.body.descript;
  const stock = req.body.stock;
  const seller_id = req.body.seller_id;
  const category = req.body.category;
  const disponibilite = req.body.disponibilite;
  const prixachat = req.body.prixachat;
  const id = req.body.id;
  const mdlivraison = req.body.mdlivraison;
  const delailivre = req.body.delailivre;
  const promotion = req.body.promotion;
  const id_boutique = req.body.id_boutique;

  db.query(
    "UPDATE products SET name=?,price=?,description=?,discount=?,seller_id=?,stock=?, category_id=?, disponibilite=?, mode_livraison=? , delai_livraison =? , discount_value =? ,cost=?  WHERE id = ?",
    [
      nom,
      prix,
      description,
      reduc,
      seller_id,
      stock,
      category,
      disponibilite,
      mdlivraison,
      delailivre,
      promotion,
      prixachat,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("suc");
      }
    }
  );
});

app.post("/update_art_after_sup", async (req, res) => {
  const invoice = req.body.invoice;
  const id_boutique = req.body.id_boutique;
  var product_quantity = 0;
  var total_price = 0;

  db.query(
    "SELECT * FROM commands WHERE invoice = ? and seller_id = ?",
    [invoice, id_boutique],
    (err, result) => {
      if (result.length > 0) {
        db.query(
          "SELECT SUM(product_quantity) as product_quantity, SUM(total_price) as total_price FROM commands WHERE invoice = ? and seller_id = ?",
          [invoice, id_boutique],
          (err, result) => {
            product_quantity = parseInt(result[0].product_quantity);
            total_price = parseInt(result[0].total_price);
            db.query(
              "UPDATE command_validation SET total_quantity = ?, total_price = ? WHERE invoice = ? and seller_id = ?",
              [product_quantity, total_price, invoice, id_boutique],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send("succes");
                }
              }
            );
          }
        );
      } else {
        db.query(
          "DELETE FROM command_validation WHERE invoice = ? and seller_id = ? ",
          [invoice, id_boutique],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("succes");
            }
          }
        );
      }
    }
  );
});

app.post("/suppr_art_after_upda", async (req, res) => {
  const id = req.body.id;
  const id_boutique = req.body.id_boutique;
  const pic1 = req.body.pic1;
  const pic2 = req.body.pic2;
  const pic3 = req.body.pic3;
  const pic4 = req.body.pic4;
  const vid = req.body.vid;
  db.query(
    "DELETE FROM products WHERE id = ? and seller_id = ? ",
    [id, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (pic1 !== "") {
          fs.unlink(`${pic1}`, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            //file removed
          });
        } else {
          console.log("succes");
          res.send("pic1 non trouver");
        }
        if (pic2 !== "") {
          fs.unlink(`${pic2}`, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            //file removed
          });
        } else {
          // console.log("succes");
          res.send("pic2 non trouver");
        }
        if (pic3 !== "") {
          fs.unlink(`${pic3}`, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            //file removed
          });
        } else {
          // console.log("succes");
          res.send("pic3 non trouver");
        }
        if (pic4 !== "") {
          fs.unlink(`${pic4}`, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            //file removed
          });
        } else {
          // console.log("succes");
          res.send("pic4 non trouver");
        }
        if (vid !== "") {
          fs.unlink(`${vid}`, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            //file removed
          });
        } else {
          // console.log("succes");
          res.send("vid non trouver");
        }
        res.send("succes");
        // res.json({ success: 1, message: "succes" });
      }
    }
  );
});

app.post("/supprimer_article", (req, res) => {
  const id = req.body.id;
  const id_boutique = req.body.id_boutique;
  const pic1 = req.body.pic1;
  const pic2 = req.body.pic2;
  const pic3 = req.body.pic3;
  const pic4 = req.body.pic4;
  const vid = req.body.vid;
  var invoice = "";

  db.query(
    "SELECT invoice FROM commands WHERE status_id_command <> '3' and product_id = ?",
    [id],
    (err, result) => {
      if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {
          invoice = String(result[i].invoice);
          db.query(
            "DELETE FROM commands WHERE product_id = ? and  invoice = ?",
            [id, invoice],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
              }
            }
          );
        }
        res.send(result);
        // res.json({ success: 1, data: result });
      } else {
        db.query(
          "DELETE FROM products WHERE id = ? and seller_id = ? ",
          [id, id_boutique],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              if (pic1 !== "") {
                fs.unlink(`${pic1}`, (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  //file removed
                });
              } else {
                console.log("succes");
                res.send("pic1 non trouver");
              }
              if (pic2 !== "") {
                fs.unlink(`${pic2}`, (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  //file removed
                });
              } else {
                // console.log("succes");
                res.send("pic2 non trouver");
              }
              if (pic3 !== "") {
                fs.unlink(`${pic3}`, (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  //file removed
                });
              } else {
                // console.log("succes");
                res.send("pic3 non trouver");
              }
              if (pic4 !== "") {
                fs.unlink(`${pic4}`, (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  //file removed
                });
              } else {
                // console.log("succes");
                res.send("pic4 non trouver");
              }
              if (vid !== "") {
                fs.unlink(`${vid}`, (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  //file removed
                });
              } else {
                // console.log("succes");
                res.send("vid non trouver");
              }
              // res.send("succes");
              res.json({ success: 1, message: "succes" });
            }
          }
        );
      }
    }
  );
  //res.send(" "+id+"fgf");
});

app.post("/approv", (req, res) => {
  const id = req.body.id;
  const quantite = req.body.quantite;
  db.query(
    "UPDATE products SET stock=?  WHERE id = ?",
    [quantite, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("suc");
      }
    }
  );
});

app.post("/approv2", (req, res) => {
  const tail = req.body.tail;
  const approv = req.body.approv;
  const id_boutique = req.body.id_boutique;
  for (var i = 0; i < tail; i++) {
    db.query(
      "UPDATE products SET stock=?  WHERE id = ? and seller_id= ?",
      [
        approv[i].stock_appro + approv[i].stock_preview,
        approv[i].product_id,
        id_boutique,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
        }
      }
    );
  }
  res.send("suc");
});
app.post("/approv3", (req, res) => {
  const stock = req.body.stock;
  const product_id = req.body.product_id;
  const id_boutique = req.body.id_boutique;
  db.query(
    "UPDATE products SET stock = ?  WHERE id = ? and seller_id = ?",
    [stock, product_id, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("suc");
      }
    }
  );
});
app.post("/approv4", (req, res) => {
  const stock = req.body.stock;
  const product_id = req.body.product_id;
  const id_boutique = req.body.id_boutique;
  db.query(
    "UPDATE products SET stock = ?  WHERE id = ? and seller_id = ?",
    [stock, product_id, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("suc");
      }
    }
  );
});

//mise à jour satut
app.post("/majstatut", (req, res) => {
  const invoice = req.body.invoice;
  const stat = req.body.stat;
  const id_boutique = req.body.id_boutique;
  db.query(
    "UPDATE command_validation SET status_id_command = ? WHERE invoice =? and seller_id = ?",
    [stat, invoice, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "UPDATE commands SET status_id_command = ? WHERE invoice =? and seller_id = ?",
          [stat, invoice, id_boutique],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("success");
            }
          }
        );
        // res.send("success");
      }
    }
  );
});

app.post("/reducquant", (req, res) => {
  const stock = req.body.stock;
  const product_id = req.body.product_id;
  const id_boutique = req.body.id_boutique;
  const total_sold = req.body.total_sold;
  const quantifiable_product = req.body.quantifiable_product;
  const caisse = req.body.caisse;
  db.query(
    "UPDATE products SET stock = ?, total_sold = ?  WHERE id = ? and seller_id = ?",
    [stock, total_sold, product_id, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        db.query(
          "UPDATE caisse SET caisse = ? where id_boutique = ?",
          [caisse, id_boutique],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("success");
            }
          }
        );
      }
    }
  );
});

app.post("/addtresorerie", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const last_caisse = req.body.last_caisse;
  const end_caisse = req.body.end_caisse;
  const montant = req.body.montant;
  const type = req.body.type;
  const invoice = req.body.invoice;
  db.query(
    "INSERT INTO tresorerie (id_boutique, last_caisse , end_caisse, montant, type, invoice) VALUES (?,?,?,?,?,?)",
    [id_boutique, last_caisse, end_caisse, montant, type, invoice],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("succes");
      }
    }
  );
});

app.get("/uploads/:name", function (req, res) {
  const name = req.params.name;
  res.sendFile(name);
});

app.post("/rej", (req, res) => {
  //  const id = req.body.id;
  res.send(2);
});

app.post("/verif_create_acces", (req, res) => {
  const id_compte = req.body.id_compte;
  db.query(
    "SELECT * FROM access WHERE id_compte = ?",
    [id_compte],
    (err, result) => {
      if (result.length > 0) {
        res.send("acces principal creer pour ce compte");
      } else {
        res.send("aucun acces creer pour ce compte");
      }
    }
  );
});
app.post("/update_acces_principal", (req, res) => {
  const id_compte = req.body.id_compte;
  const acces_principal = req.body.acces_principal;
  const code_acces_principal = req.body.code_acces_principal;
  db.query(
    "SELECT * FROM access WHERE id_compte = ?",
    [id_compte],
    (err, result) => {
      if (result.length > 0) {
        db.query(
          "UPDATE access SET acces_principal = ?, code_acces_principal = ?  WHERE id_compte = ?",
          [acces_principal, code_acces_principal, id_compte],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("suc");
            }
          }
        );
      } else {
        db.query(
          "INSERT INTO access (id_compte, acces_principal , code_acces_principal) VALUES (?,?,?)",
          [id_compte, acces_principal, code_acces_principal],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              /* res.json({ind:i}); */
              res.send("suc");
            }
          }
        );
      }
    }
  );
});

app.post("/add_acces_secondaire", (req, res) => {
  const id_compte = req.body.id_compte;
  const acces_secondaire = req.body.acces_secondaire;
  const code_acces_secondaire = req.body.code_acces_secondaire;
  db.query(
    "INSERT INTO acces_secondaire (id_compte, acces_secondaire , code_acces_secondaire) VALUES (?,?,?)",
    [id_compte, acces_secondaire, code_acces_secondaire],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        /* res.json({ind:i}); */
        res.send("suc");
      }
    }
  );
});

app.post("/update_acces_secondaire", (req, res) => {
  const id_acces_secondaire = req.body.id_acces_secondaire;
  const id_compte = req.body.id_compte;
  const acces_secondaire = req.body.acces_secondaire;
  const code_acces_secondaire = req.body.code_acces_secondaire;
  db.query(
    "UPDATE acces_secondaire SET acces_secondaire = ?, code_acces_secondaire = ?  WHERE id_compte = ? and id = ?",
    [acces_secondaire, code_acces_secondaire, id_compte, id_acces_secondaire],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("suc");
      }
    }
  );
});
/*** suppression d'acces secondaire ***/
app.post("/delete_acces_secondaire", (req, res) => {
  const id_acces_secondaire = req.body.id_acces_secondaire;
  db.query(
    "DELETE FROM  acces_secondaire WHERE id = ?",
    [id_acces_secondaire],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("suc");
      }
    }
  );
});
app.post("/getaccescompteprincipal", (req, res) => {
  const id_compte = req.body.id_compte;
  db.query(
    "SELECT * FROM access where id_compte = ? ",
    [id_compte],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/getaccescomptesecondaire", (req, res) => {
  const id_compte = req.body.id_compte;
  db.query(
    "SELECT * FROM acces_secondaire where id_compte = ? ",
    [id_compte],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/verifusername", (req, res) => {
  const username = req.body.username;
  db.query(
    "SELECT * FROM compte WHERE username = ?",
    username,
    (err, result) => {
      if (result.length > 0) {
        res.json({
          regist: false,
          message: "Ce nom d'utilisateur existe déjà !",
          data: result,
        });
      } else {
        res.json({
          regist: false,
          message: "Ce nom d'utilisateur n'existe pas",
        });
      }
    }
  );
});

app.post("/updatepassword", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "UPDATE compte SET password = ?  WHERE username = ?",
      [hash, username],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          //  res.send("Values Inserted");
          res.send("suc");
        }
      }
    );
  });
});

app.post("/licence_hash", (req, res) => {
  const hash = req.body.hash;
  /* const date_actu = req.body.date_actu */
  db.query(
    "insert into license(hash_code) values (?)",
    [hash],
    (err, result) => {
      if (!err) {
        res.send("success");
      } else {
        console.log(err);
      }
    }
  );
});

//liste of hash
app.get("/list_hash", (req, res) => {
  const status = "NON ACTIF";
  db.query(
    "SELECT * FROM license where id_boutique = 0 and status_hash = ?",
    status,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//RECUP HEURE ACTUEL
app.get("/date_time", (req, res) => {
  db.query("SELECT NOW() as time_actu", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/majhash", (req, res) => {
  const id = req.body.id;
  const date_start = req.body.date_start;
  const date_end = req.body.date_end;
  const status_hash = req.body.status_hash;
  const id_boutique = req.body.id_boutique;
  const validity = req.body.validity;
  db.query(
    "SELECT status_hash FROM license where id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result[0].status_hash === "ACTIF") {
          res.send("deja");
        } else if (result[0].status_hash === "NON ACTIF") {
          db.query(
            "UPDATE license SET status_hash = ?, id_boutique = ?, date_start = ?, date_end = ?, validity_time = ? WHERE id = ? ",
            [status_hash, id_boutique, date_start, date_end, validity, id],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("success");
              }
            }
          );
        }
      }
    }
  );
});

app.post("/onehash", (req, res) => {
  const id = req.body.id;
  const status_hash = "ACTIF";
  let numRows = 0;
  db.query(
    "SELECT status_hash FROM license where id_boutique = ?",
    [id, status_hash],
    (err, result) => {
      if (err) throw err;
      numRows = result.length;
      console.log(numRows);
      if (numRows > 0) {
        for (var i = 0; i < numRows; i++) {
          if (result[i].status_hash === "ACTIF") {
            //  res.send("il a un hash actif");
            res.json({
              message: "boutique a hash",
            });
            break;
          }
        }
        res.json({ message: "boutique not hash" });
        // res.send(`${numRows}`);
      } else {
        res.json({ message: "aucun hash atribuer" });
      }
    }
  );
});

app.post("/exithash", (req, res) => {
  const id = req.body.id;
  let numRows = 0;
  db.query(
    "SELECT * FROM license where id_boutique = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      numRows = result.length;
      console.log(numRows);
      if (numRows > 0) {
        for (var i = 0; i < numRows; i++) {
          if (result[i].status_hash === "ACTIF") {
            //  res.send("il a un hash actif");
            res.json({
              id_actif: result[i].id,
              date_start: result[i].date_start,
              date_end: result[i].date_end,
              message: "il a un hash actif",
            });
            break;
          }
        }
        res.json({ message: "aucun hash actif" });
        // res.send(`${numRows}`);
      } else {
        res.json({ message: "aucun hash atribuer" });
      }
    }
  );
});

app.post("/majvalidhash", (req, res) => {
  const id = req.body.id;
  const status_hash = req.body.status_hash;
  db.query(
    "UPDATE license SET status_hash = ? WHERE id = ? ",
    [status_hash, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/majvalidity", (req, res) => {
  const id = req.body.id;
  const validity = req.body.validity;
  db.query(
    "UPDATE license SET validity_time = ? WHERE id = ? ",
    [validity, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/validityday", (req, res) => {
  const id = req.body.id;
  const validity = req.body.validity;
  db.query(
    "UPDATE license SET validity_time = ? WHERE id = ? ",
    [validity, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/profile_full", (req, res) => {
  const id = req.body.id;
  db.query(
    "SELECT store_name, adress, description, website, facebook, whatsapp, boutiqueName, type_product, image, pays, email, id FROM sellers where id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/update_typeof_product", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const type_product = req.body.type_product;
  db.query(
    "UPDATE sellers SET type_product = ? where id = ?",
    [type_product, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.put("/majimgprofil/:id", async (req, res) => {
  const id = req.params.id;
  // const stat = req.params.stat;
  // 'avatar' is the name of our file input field in the HTML form
  let upload = multer({ storage: storage }).single("avatar");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields

    if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    let classifiedsadd = { image: req.file.filename };

    //	const sql = "UPDATE products SET picture2 = ? WHERE id = 47";
    const sql = "UPDATE sellers SET ? WHERE id = ?";
    db.query(sql, [classifiedsadd, id], (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: 1 });
        //  res.send("suc");
      }
      //	res.json({ success: 1 }) ;
      //   res.send(id+"");
    });
  });

  //res.send(id+"");
});

app.post("/majprofile", (req, res) => {
  const id = req.body.id;
  const boutique = req.body.boutique;
  const adress = req.body.adress;
  const description = req.body.description;
  const website = req.body.website;
  const facebook = req.body.facebook;
  const whatsapp = req.body.whatsapp;
  db.query(
    "UPDATE sellers SET store_name = ?, adress = ?, description = ?, website = ?, facebook = ?, whatsapp = ? where id = ?",
    [boutique, adress, description, website, facebook, whatsapp, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/majprofile1", (req, res) => {
  const id = req.body.id;
  const boutique = req.body.boutique;

  db.query(
    "UPDATE sellers SET store_name = ? where id = ?",
    [boutique, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/majprofile2", (req, res) => {
  const id = req.body.id;
  const adress = req.body.adress;

  db.query(
    "UPDATE sellers SET adress = ? where id = ?",
    [adress, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/majprofile3", (req, res) => {
  const id = req.body.id;
  const description = req.body.description;
  db.query(
    "UPDATE sellers SET description = ? where id = ?",
    [description, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/majprofile4", (req, res) => {
  const id = req.body.id;
  const website = req.body.website;
  db.query(
    "UPDATE sellers SET website = ? where id = ?",
    [website, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/majprofile5", (req, res) => {
  const id = req.body.id;
  const facebook = req.body.facebook;
  db.query(
    "UPDATE sellers SET facebook = ? where id = ?",
    [facebook, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/majprofile6", (req, res) => {
  const id = req.body.id;
  const whatsapp = req.body.whatsapp;
  db.query(
    "UPDATE sellers SET whatsapp = ? where id = ?",
    [whatsapp, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/majprofile7", (req, res) => {
  const id = req.body.id;
  const pays = req.body.pays;
  db.query(
    "UPDATE sellers SET pays = ? where id = ?",
    [pays, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.get("/version", (req, res) => {
  db.query("SELECT * FROM version", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
  // res.send(versionapp);
});

// recupe caisse value
app.post("/caisse_val", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM caisse where id_boutique = ?",
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/create_depense", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const montant = req.body.montant;
  const last_caisse = req.body.last_caisse;
  const end_caisse = req.body.end_caisse;
  const observation = req.body.observation;
  /* const date_actu = req.body.date_actu */
  db.query(
    "insert into depense (id_boutique, montant, last_caisse, end_caisse, observation) values (?,?,?,?,?)",
    [id_boutique, montant, last_caisse, end_caisse, observation],
    (err, result) => {
      if (!err) {
        db.query(
          "UPDATE caisse SET caisse = ? where id_boutique = ?",
          [end_caisse, id_boutique],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("success");
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/create_decaissement", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const numeros_compte = req.body.numeros_compte;
  const montant = req.body.montant;
  const last_caisse = req.body.last_caisse;
  const end_caisse = req.body.end_caisse;
  const observation = req.body.observation;
  /* const date_actu = req.body.date_actu */
  db.query(
    "insert into decaissement (id_boutique, numero_compte, montant, last_caisse, end_caisse, observation) values (?,?,?,?,?,?)",
    [
      id_boutique,
      numeros_compte,
      montant,
      last_caisse,
      end_caisse,
      observation,
    ],
    (err, result) => {
      if (!err) {
        db.query(
          "UPDATE caisse SET caisse = ? where id_boutique = ?",
          [end_caisse, id_boutique],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("success");
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/delete_depense", (req, res) => {
  const id = req.body.id;
  const id_boutique = req.body.id_boutique;
  const montant = req.body.montant;
  const last_caisse = req.body.last_caisse;
  const end_caisse = req.body.end_caisse;
  /* const date_actu = req.body.date_actu */
  db.query(
    "DELETE FROM depense WHERE id = ? and id_boutique = ?",
    [id, id_boutique],
    (err, result) => {
      if (!err) {
        db.query(
          "UPDATE caisse SET caisse = ? where id_boutique = ?",
          [end_caisse, id_boutique],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("success");
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/delete_decaissement", (req, res) => {
  const id = req.body.id;
  const id_boutique = req.body.id_boutique;
  const montant = req.body.montant;
  const last_caisse = req.body.last_caisse;
  const end_caisse = req.body.end_caisse;
  /* const date_actu = req.body.date_actu */
  db.query(
    "DELETE FROM decaissement WHERE id = ? and id_boutique = ?",
    [id, id_boutique],
    (err, result) => {
      if (!err) {
        db.query(
          "UPDATE caisse SET caisse = ? where id_boutique = ?",
          [end_caisse, id_boutique],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("success");
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});
// recupe caisse value
app.post("/histo_depense", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM depense where id_boutique = ?",
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
// recupe caisse value
app.post("/histo_decaissement", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM decaissement where id_boutique = ?",
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/update_caisse", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const caisse = req.body.caisse;
  db.query(
    "UPDATE caisse SET caisse = ? where id_boutique = ?",
    [caisse, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/update_caisse_post_commande", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const caisse = req.body.caisse;
  db.query(
    "UPDATE caisse SET caisse = ? where id_boutique = ?",
    [caisse, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
//*************************************************      nelson     **********************************************************************

/* obtenir la liste des produits */
app.get("/productslist", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
/* detail d'un produit*/
app.post("/detailProduct", (req, res) => {
  const productId = req.body.productId;

  db.query(
    "SELECT * FROM products WHERE id = ?",
    [productId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        res.send(result);
      }
    }
  );
});
/* obtenir l'invoice*/
app.get("/getInvoice", (req, res) => {
  let invoice = "";
  let nbrligne = 0;
  let numfacend = 0;
  let newfacend = 0;
  db.query("SELECT * FROM commands", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      nbrligne = result.length;
      if (nbrligne > 0) {
        db.query("SELECT MAX(id) AS TOTA FROM commands", (err, result) => {
          if (err) {
            console.log(err);
          } else {
            db.query(
              "SELECT * FROM commands WHERE id = ?",
              [result[0].TOTA],
              (err, result) => {
                if (err) {
                  console.log(err);
                } else {
                  numfacend = parseInt(result[0].invoice.slice(5));
                  // numfacend = parseInt(result[0].invoice.split('0')[2]);
                  newfacend = numfacend + 1;
                  invoice = `FAB00${newfacend}`;
                  res.send(invoice);
                }
              }
            );
          }
        });
      } else {
        invoice = "FAB001";
        res.send(invoice);
      }
    }
  });
});
/* ajouter au panier */
app.post("/addcart", (req, res) => {
  const product_id = req.body.product_id;
  const product_quantity = req.body.product_quantity;
  const product_name = req.body.product_name;
  const unite_price = req.body.unite_price;
  const total_price = req.body.total_price;
  const picture = req.body.picture;
  const invoice = req.body.invoice;
  const whatsapp = req.body.num;

  db.query(
    "INSERT INTO commands (product_id, product_quantity, product_name, unite_price, total_price, picture, invoice, whatsapp) VALUES (?,?,?,?,?,?,?,?)",
    [
      product_id,
      product_quantity,
      product_name,
      unite_price,
      total_price,
      picture,
      invoice,
      whatsapp,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
/* obtenir la liste des commandes validées par l'utilisateur */
app.post("/historique", (req, res) => {
  const invoice = req.body.invoice;
  db.query(
    "SELECT * FROM commands WHERE invoice = ?",
    [invoice],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
/* recupérer le status d'une commande déjà passer */
app.post("/recupStatusCommand", (req, res) => {
  const invoice = req.body.invoice;
  db.query(
    "SELECT status_id_command FROM commands WHERE invoice = ?",
    [invoice],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // res.send(result);
        db.query(
          "SELECT libeller FROM statuscommande WHERE id = ?",
          [result[0]],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});
/* obtenir la liste des commandes */
app.post("/getcommands", (req, res) => {
  const statut = 0;
  db.query(
    "SELECT * FROM commands WHERE statut = ?",
    [statut],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
/*suppression d'un éléments du panier */
app.delete("/supprimerduPanier/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM commands WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("succes");
      res.send(result);
    }
  });
});
/*validation de la commande */
app.post("/updatecart", (req, res) => {
  const invoice = req.body.invoice;
  const total_price = req.body.total_price;
  const total_quantity = req.body.total_quantity;
  const num = req.body.num;

  db.query(
    "INSERT INTO command_validation (total_quantity, total_price, invoice, whatsapp) VALUES (?,?,?,?)",
    [total_quantity, total_price, invoice, num],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // res.send("Values Inserted");
        db.query(
          "SELECT date FROM command_validation WHERE invoice = ?",
          [invoice],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});
/* rechercher une commande */
app.post("/recherchcommand", (req, res) => {
  const product_id = req.body.product_id;
  const statut = 0;
  db.query(
    "SELECT * FROM commands WHERE product_id = ? AND statut = ?",
    [product_id, statut],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
/*mise à jour de la quantité de produit commander */
app.put("/updatecommand", (req, res) => {
  const id = req.body.id;
  const product_quantity = req.body.product_quantity;
  const total_price = req.body.total_price;

  db.query(
    "UPDATE commands SET product_quantity = ?, total_price = ? WHERE id = ?",
    [product_quantity, total_price, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log('succes');
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/licence_hash", (req, res) => {
  const hash = req.body.hash;
  /* const date_actu = req.body.date_actu */
  db.query(
    "insert into license(hash_code) values (?)",
    [hash],
    (err, result) => {
      if (!err) {
        res.send("success");
      } else {
        console.log(err);
      }
    }
  );
});

//liste of hash
app.get("/list_hash", (req, res) => {
  const status = "NON ACTIF";
  db.query(
    "SELECT * FROM license where id_boutique = 0 and status_hash = ?",
    status,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//RECUP HEURE ACTUEL
app.get("/date_time", (req, res) => {
  db.query("SELECT NOW() as time_actu", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/majhash", (req, res) => {
  const id = req.body.id;
  const date_start = req.body.date_start;
  const status_hash = req.body.status_hash;
  const id_boutique = req.body.id_boutique;
  const validity = req.body.validity;
  db.query(
    "SELECT status_hash FROM license where id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result[0].status_hash === "ACTIF") {
          res.send("deja");
        } else if (result[0].status_hash === "NON ACTIF") {
          db.query(
            "UPDATE license SET status_hash = ?, id_boutique = ?, date_start = ?, validity_time = ? WHERE id = ? ",
            [status_hash, id_boutique, date_start, validity, id],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("success");
              }
            }
          );
        }
      }
    }
  );
});

app.post("/onehash", (req, res) => {
  const id = req.body.id;
  const status_hash = "ACTIF";
  let numRows = 0;
  db.query(
    "SELECT status_hash FROM license where id_boutique = ? and status_hash = ?",
    [id, status_hash],
    (err, result) => {
      if (err) throw err;
      numRows = result.length;
      console.log(numRows);
      if (numRows > 0) {
        for (var i = 0; i < numRows; i++) {
          if (result[i].status_hash === "ACTIF") {
            //  res.send("il a un hash actif");
            res.json({
              message: "boutique a hash",
            });
            break;
          }
        }
        res.json({ message: "boutique not hash" });
        // res.send(`${numRows}`);
      } else {
        res.json({ message: "aucun hash atribuer" });
      }
    }
  );
});

app.post("/exithash", (req, res) => {
  const id = req.body.id;
  let numRows = 0;
  db.query(
    "SELECT * FROM license where id_boutique = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      numRows = result.length;
      console.log(numRows);
      if (numRows > 0) {
        for (var i = 0; i < numRows; i++) {
          if (result[i].status_hash === "ACTIF") {
            //  res.send("il a un hash actif");
            res.json({
              id_actif: result[i].id,
              date_start: result[i].date_start,
              date_end: result[i].date_end,
              message: "il a un hash actif",
            });
            break;
          }
        }
        res.json({ message: "aucun hash actif" });
        // res.send(`${numRows}`);
      } else {
        res.json({ message: "aucun hash atribuer" });
      }
    }
  );
});

app.post("/majvalidhash", (req, res) => {
  const id = req.body.id;
  const status_hash = req.body.status_hash;
  db.query(
    "UPDATE license SET status_hash = ? WHERE id = ? ",
    [status_hash, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/majvalidity", (req, res) => {
  const id = req.body.id;
  const validity = req.body.validity;
  db.query(
    "UPDATE license SET validity_time = ? WHERE id = ? ",
    [validity, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/validityday", (req, res) => {
  const id = req.body.id;
  const validity = req.body.validity;
  db.query(
    "UPDATE license SET validity_time = ? WHERE id = ? ",
    [validity, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/profile_full", (req, res) => {
  const id = req.body.id;
  db.query(
    "SELECT store_name, adress, description, website, facebook, whatsapp, boutiqueName, image, id FROM sellers where id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/majimgprofil/:id", async (req, res) => {
  const id = req.params.id;
  // const stat = req.params.stat;
  // 'avatar' is the name of our file input field in the HTML form
  let upload = multer({ storage: storage }).single("avatar");

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields

    if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
    let classifiedsadd = { image: req.file.filename };

    //	const sql = "UPDATE products SET picture2 = ? WHERE id = 47";
    const sql = "UPDATE sellers SET ? WHERE id = ?";
    db.query(sql, [classifiedsadd, id], (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ success: 1 });
        //  res.send("suc");
      }
      //	res.json({ success: 1 }) ;
      //   res.send(id+"");
    });
  });

  //res.send(id+"");
});

app.post("/majprofile", (req, res) => {
  const id = req.body.id;
  const boutique = req.body.boutique;
  const adress = req.body.adress;
  const description = req.body.description;
  const website = req.body.website;
  const facebook = req.body.facebook;
  const whatsapp = req.body.whatsapp;
  db.query(
    "UPDATE sellers SET store_name = ?, adress = ?, description = ?, website = ?, facebook = ?, whatsapp = ? where id = ?",
    [boutique, adress, description, website, facebook, whatsapp, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/majprofile1", (req, res) => {
  const id = req.body.id;
  const boutique = req.body.boutique;

  db.query(
    "UPDATE sellers SET store_name = ? where id = ?",
    [boutique, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/majprofile2", (req, res) => {
  const id = req.body.id;
  const adress = req.body.adress;

  db.query(
    "UPDATE sellers SET adress = ? where id = ?",
    [adress, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/majprofile3", (req, res) => {
  const id = req.body.id;
  const description = req.body.description;
  db.query(
    "UPDATE sellers SET description = ? where id = ?",
    [description, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/majprofile4", (req, res) => {
  const id = req.body.id;
  const website = req.body.website;
  db.query(
    "UPDATE sellers SET website = ? where id = ?",
    [website, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/majprofile5", (req, res) => {
  const id = req.body.id;
  const facebook = req.body.facebook;
  db.query(
    "UPDATE sellers SET facebook = ? where id = ?",
    [facebook, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});
app.post("/majprofile6", (req, res) => {
  const id = req.body.id;
  const whatsapp = req.body.whatsapp;
  db.query(
    "UPDATE sellers SET whatsapp = ? where id = ?",
    [whatsapp, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.get("/versionapp", (req, res) => {
  const versionapp = "1.0.0";
  res.send(versionapp);
});

// recupe caisse value
app.post("/caisse_val", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM caisse where id_boutique = ?",
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/create_depense", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const montant = req.body.montant;
  const last_caisse = req.body.last_caisse;
  const end_caisse = req.body.end_caisse;
  const observation = req.body.observation;
  /* const date_actu = req.body.date_actu */
  db.query(
    "insert into depense (id_boutique, montant, last_caisse, end_caisse, observation) values (?,?,?,?,?)",
    [id_boutique, montant, last_caisse, end_caisse, observation],
    (err, result) => {
      if (!err) {
        db.query(
          "UPDATE caisse SET caisse = ? where id_boutique = ?",
          [end_caisse, id_boutique],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("success");
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/create_decaissement", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const numeros_compte = req.body.numeros_compte;
  const montant = req.body.montant;
  const last_caisse = req.body.last_caisse;
  const end_caisse = req.body.end_caisse;
  const observation = req.body.observation;
  /* const date_actu = req.body.date_actu */
  db.query(
    "insert into decaissement (id_boutique, numero_compte, montant, last_caisse, end_caisse, observation) values (?,?,?,?,?,?)",
    [
      id_boutique,
      numeros_compte,
      montant,
      last_caisse,
      end_caisse,
      observation,
    ],
    (err, result) => {
      if (!err) {
        db.query(
          "UPDATE caisse SET caisse = ? where id_boutique = ?",
          [end_caisse, id_boutique],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("success");
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});
// recupe caisse value
app.post("/histo_depense", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM depense where id_boutique = ?",
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
// recupe caisse value
app.post("/histo_decaissement", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM decaissement where id_boutique = ?",
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// recupe histo tresorerie
app.post("/histo_tresorerie", (req, res) => {
  const id_boutique = req.body.id_boutique;
  db.query(
    "SELECT * FROM tresorerie where id_boutique = ?",
    id_boutique,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/update_caisse", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const caisse = req.body.caisse;
  db.query(
    "UPDATE caisse SET caisse = ? where id_boutique = ?",
    [caisse, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/update_caisse_post_commande", (req, res) => {
  const id_boutique = req.body.id_boutique;
  const caisse = req.body.caisse;
  db.query(
    "UPDATE caisse SET caisse = ? where id_boutique = ?",
    [caisse, id_boutique],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

//******************************************************     vital     *****************************************************************

// REST API CURD

app.get("/api", (req, res) => {
  res.send("Api working");
});

// Create data

app.post("/api/create/:nom/:prenom", (req, res) => {
  console.log(req.body);
  console.log(req.params.nom);
  console.log(req.params.prenom);
  // const nom = req.body.nom
  // const prenom = req.body.prenom
  const nom = req.params.nom;
  const prenom = req.params.prenom;

  // sql query

  let sql = ` INSERT INTO todotbl(nom, prenom)
                VALUES('${nom}', '${prenom}')
               `;
  // run query
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("data inserted");
  });
});

// Read data
app.get("/api/read", (req, res) => {
  // sql query
  let val = 50;
  let sql = `SELECT * FROM products where like_number > ?`;
  // run query
  db.query(
    `SELECT * FROM products where like_number > ? `,
    val,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get("/api/reader", (req, res) => {
  // sql query
  let val = 50;
  let sql = `SELECT * FROM products where like_number > ?`;
  // run query
  db.query(
    `SELECT * FROM products where like_number < ? `,
    val,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// Read single data
app.get("/api/reading", (req, res) => {
  console.log(req.body.id);
  const id = req.body.id;
  // sql query
  let sql = `SELECT * FROM todotbl`;
  // run query
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// update single data

app.put("/api/update/:id/:nom/:prenom", (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  const nom = req.params.nom;
  const prenom = req.params.prenom;
  // sql query

  db.query(
    "UPDATE todotbl SET nom = ?, prenom = ? WHERE id = ? ",
    [nom, prenom, id],
    (err, result) => {
      if (err) {
        console.log(err);
        //  throw err;
      } else {
        res.send("data updated");
      }
    }
  );
});

// delete single data

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;
  // sql query

  db.query("DELETE FROM todotbl WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("data deleted");
      // res.send(result);
    }
  });
});

app.get("/invoice", (req, res) => {
  // sql query
  let idmax;
  let lastinvoice;
  //let sql = `SELECT * FROM todotbl`;
  // run query
  db.query("SELECT MAX(id) AS TOTA FROM command_validation", (err, result) => {
    if (err) throw err;
    idmax = result[0].TOTA;
    // db.query("SELECT invoice FROM command_validation WHERE id = ?",idmax,(err,result)=>{
    //     if(err) throw err;
    //     console.log(result[0].invoice);
    // });

    res.send(`${idmax}`);
  });
});

app.get("/invoicee", (req, res) => {
  // sql query
  let idmax;
  let status = 1;
  //let sql = `SELECT * FROM todotbl`;
  // run query
  db.query("SELECT MAX(id) AS TOTA FROM commands", (err, result) => {
    if (err) throw err;
    idmax = result[0].TOTA;
    db.query(
      "SELECT statut FROM commands WHERE id = ?",
      idmax,
      (err, result) => {
        if (err) throw err;
        status = result[0].statut;
        if (status == 0) {
          let hac = 0;
          console.log("pas nouvelle facture");
          res.send(`${hac}`);
        } else {
          let hac = 1;
          console.log("nouvelle facture");
          res.send(`${hac}`);
        }
        //console.log(result[0].statut);
      }
    );
    // res.send(`${idmax}`);
  });
});

app.get("/cherchernumfaclast", (req, res) => {
  // sql query
  let idmax;
  let invoicer;
  db.query("SELECT MAX(id) AS TOTA FROM commands", (err, result) => {
    if (err) throw err;
    idmax = result[0].TOTA;
    db.query(
      "SELECT invoice FROM commands WHERE id = ?",
      idmax,
      (err, result) => {
        if (err) throw err;
        invoicer = result[0].invoice;
        res.send(`${invoicer}`);
      }
    );
    // res.send(`${idmax}`);
  });
});

app.get("/exitcont", (req, res) => {
  let numRows;

  db.query("SELECT * FROM commands", (err, result) => {
    if (err) throw err;
    numRows = result.length;
    console.log(numRows);
    res.send(`${numRows}`);
  });
});

app.get("/nombrartpan", (req, res) => {
  let idmax;
  let numRows;
  db.query("SELECT MAX(id) AS TOTA FROM commands ", (err, result) => {
    if (err) throw err;
    idmax = result[0].TOTA;
    db.query(
      "SELECT invoice,statut FROM commands WHERE id = ?",
      idmax,
      (err, result) => {
        if (err) throw err;
        console.log(result[0].invoice);
        console.log(result[0].statut);
        let stat = result[0].statut;
        let inv = result[0].invoice;
        if (stat == 0) {
          db.query(
            "SELECT invoice FROM commands where invoice=?",
            inv,
            (err, result) => {
              if (err) throw err;
              numRows = result.length;
              console.log(numRows);
              res.send(`${numRows}`);
            }
          );
        } else {
          res.send("");
        }
      }
    );
  });
});

app.post("/exitart", (req, res) => {
  const nfac = req.body.nfac;
  const product_name = req.body.product_name;
  let numRows;
  db.query(
    "SELECT product_name FROM commands where invoice=? and product_name=?",
    [nfac, product_name],
    (err, result) => {
      if (err) throw err;
      numRows = result.length;
      console.log(numRows);
      res.send(`${numRows}`);
    }
  );
});
app.post(
  "/createcommand/:statut/:product_id/:product_name/:unite_price/:product_quantity/:total_price/:invoice/:picture",
  (req, res) => {
    const statut = req.params.statut;
    const product_id = req.params.product_id;
    const product_name = req.params.product_name;
    const unite_price = req.params.unite_price;
    const product_quantity = req.params.product_quantity;
    const total_price = req.params.total_price;
    const invoice = req.params.invoice;
    const picture = req.params.picture;

    let sql = ` INSERT INTO commands(statut, product_id, product_name, unite_price, product_quantity, total_price, invoice, picture)
                VALUES('${statut}', '${product_id}', '${product_name}', '${unite_price}', '${product_quantity}', '${total_price}', '${invoice}', '${picture}')
               `;
    // run query
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("produit ajouter au panier");
    });
  }
);

app.post("/api/createe", (req, res) => {
  const statut = req.body.statut;
  const product_id = req.body.product_id;
  const product_name = req.body.product_name;
  const unite_price = req.body.unite_price;
  const product_quantity = req.body.product_quantity;
  const total_price = req.body.total_price;
  const invoice = req.body.invoice;
  const picture = req.body.picture;

  let sql = ` INSERT INTO commands(statut, product_id, product_name, unite_price, product_quantity, total_price, invoice, picture)
                VALUES('${statut}', '${product_id}', '${product_name}', '${unite_price}', '${product_quantity}', '${total_price}', '${invoice}', '${picture}')
               `;
  // run query
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("produit ajouter au panier");
  });
});

app.get("/recuppan", (req, res) => {
  let idmax;
  let numRows;
  db.query("SELECT MAX(id) AS TOTA FROM commands ", (err, result) => {
    if (err) throw err;
    idmax = result[0].TOTA;
    db.query(
      "SELECT invoice,statut FROM commands WHERE id = ?",
      idmax,
      (err, result) => {
        if (err) throw err;
        console.log(result[0].invoice);
        console.log(result[0].statut);
        let stat = result[0].statut;
        let inv = result[0].invoice;
        if (stat == 0) {
          db.query(
            "SELECT * FROM commands where invoice=?",
            inv,
            (err, result) => {
              if (err) throw err;
              numRows = result.length;
              console.log(result);
              res.send(result);
            }
          );
        } else {
          res.send("");
        }
      }
    );
  });
});

app.post("/nectar", (req, res) => {
  const id = req.body.id;
  db.query(
    "SELECT unite_price FROM commands WHERE id = ?",
    id,
    (err, result) => {
      if (err) throw err;
      console.log(result[0].unite_price);
      res.send(result[0].unite_price + "");
    }
  );
});

app.get("/totalprice", (req, res) => {
  let idmax;
  let total_price;
  let numRows;
  db.query("SELECT MAX(id) AS TOTA FROM commands ", (err, result) => {
    if (err) throw err;
    idmax = result[0].TOTA;
    db.query(
      "SELECT invoice,statut FROM commands WHERE id = ?",
      idmax,
      (err, result) => {
        if (err) throw err;
        console.log(result[0].invoice);
        console.log(result[0].statut);
        let stat = result[0].statut;
        let inv = result[0].invoice;
        if (stat == 0) {
          db.query(
            "SELECT SUM(total_price) AS prix_total FROM commands where invoice=?",
            inv,
            (err, result) => {
              if (err) throw err;
              numRows = result.length;
              console.log(result[0].prix_total);
              total_price = result[0].prix_total;
              console.log(total_price);
              res.send(total_price + "");
            }
          );
        } else {
          res.send("");
        }
      }
    );
  });
});

app.get("/api/readingsim1", (req, res) => {
  console.log(req.body.id);
  const id = req.body.id;
  // sql query
  let sql = `SELECT * FROM todotbl WHERE simchoice = ?`;
  // run query
  db.query(sql, 1, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
app.get("/api/readingsim2", (req, res) => {
  console.log(req.body.id);
  const id = req.body.id;
  // sql query
  let sql = `SELECT * FROM todotbl WHERE simchoice = ?`;
  // run query
  db.query(sql, 2, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/readinglast", (req, res) => {
  console.log(req.body.id);
  const id = req.body.id;
  // sql query
  let sql = `SELECT * FROM todotbl ORDER BY id DESC LIMIT 10`;
  // run query
  db.query(sql, 0, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/api/readingmarch", (req, res) => {
  console.log(req.body.id);
  const id = req.body.id;
  // sql query
  let sql = `SELECT * FROM marchand`;
  // run query
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/addussd", (req, res) => {
  const libeler = req.body.libeler;
  const codeussd = req.body.codeussd;
  const simchoice = req.body.simchoice;
  db.query(
    "INSERT INTO todotbl (libeler, codeussd, simchoice) VALUES (?,?,?)",
    [libeler, codeussd, simchoice],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("code ussd ajouter avec  succes");
      }
    }
  );
});

app.post("/addmarchand", (req, res) => {
  const nommarchand = req.body.nommarchand;
  const idmarchand = req.body.idmarchand;
  const simchoice = req.body.simchoice;
  db.query(
    "INSERT INTO marchand (nom_marchand, id_marchand, simchoice) VALUES (?,?,?)",
    [nommarchand, idmarchand, simchoice],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Marchand crée avec  succes");
      }
    }
  );
});

app.delete("/delussd", (req, res) => {
  const id = req.body.id;
  db.query("DELETE FROM todotbl WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("succes");
      res.send("code ussd supprimer avec  succes");
    }
  });
});

/************************************************************************************vital shop back ***********************************************************************/

app.delete("/delarticle", (req, res) => {
  const id = req.body.id;
  db.query("DELETE FROM products WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("succes");
      res.send("succes");
    }
  });
});
//récupération des commandes en cours
app.get("/commandecours", (req, res) => {
  const statut = 1;
  db.query(
    "SELECT invoice,whatsapp,command_date,livraison_date,customer_id, SUM(total_price) AS TOTALPRICE , SUM(product_quantity) AS TOTALQUANTITE,status_id_command,product_id,verifvalid FROM commands WHERE status_id_command = ?  GROUP BY invoice LIMIT 5",
    statut,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//récupération des commandes en cours
app.get("/commandecourstous", (req, res) => {
  const statut = 1;
  db.query(
    "SELECT invoice,whatsapp,command_date,livraison_date,customer_id, SUM(total_price) AS TOTALPRICE , SUM(product_quantity) AS TOTALQUANTITE,status_id_command,product_id,verifvalid FROM commands GROUP BY invoice ASC",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/detailscommandecours", (req, res) => {
  const invoice = req.body.invoice;
  const status_id_command = req.body.status_id_command;
  db.query(
    "SELECT product_name,invoice,whatsapp,command_date,livraison_date,customer_id, product_quantity , total_price, picture,status_id_command,product_id,verifvalid FROM commands WHERE invoice = ? and status_id_command = ?",
    [invoice, status_id_command],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//récupération des approvisionnement en cours
app.get("/approcours", (req, res) => {
  const statut = 0;
  db.query(
    "SELECT invoice, appro_date, SUM(total_price) AS TOTALPRICE , SUM(stock_appro) AS TOTALQUANTITE, verif_appro FROM approvionnement WHERE verif_appro = ?  GROUP BY invoice LIMIT 5",
    statut,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//récupération des approvisionnement en cours
app.get("/approcourstous1", (req, res) => {
  const statut = 0;
  db.query(
    "SELECT invoice, appro_date, SUM(total_price) AS TOTALPRICE , SUM(stock_appro) AS TOTALQUANTITE, verif_appro FROM approvionnement WHERE verif_appro = ? GROUP BY invoice ASC",
    statut,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//récupération des approvisionnement en cours
app.get("/approcourstous2", (req, res) => {
  const statut = 1;
  db.query(
    "SELECT invoice, appro_date, SUM(total_price) AS TOTALPRICE , SUM(stock_appro) AS TOTALQUANTITE, verif_appro FROM approvionnement WHERE verif_appro = ? GROUP BY invoice ASC",
    statut,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/detailsapprocours", (req, res) => {
  const invoice = req.body.invoice;
  const verif_appro = req.body.verif_appro;
  db.query(
    "SELECT product_id,product_name,invoice,appro_date,boutique_id,total_price,stock_appro, stock_preview , verif_appro, picture FROM approvionnement WHERE invoice = ? and verif_appro = ?",
    [invoice, verif_appro],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/changestatus", (req, res) => {
  const invoice = req.body.invoice;
  const status_id_command = req.body.status_id_command;
  db.query(
    "UPDATE commands SET status_id_command = ? WHERE invoice = ? ",
    [status_id_command, invoice],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // res.send("succes");
        db.query(
          "UPDATE command_validation SET status_id_command = ? WHERE invoice = ? ",
          [status_id_command, invoice],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("succes");
            }
          }
        );
      }
    }
  );
});

app.post("/recupverifcommand", (req, res) => {
  const statut = 1;
  const invoice = req.body.invoice;
  db.query(
    "SELECT verifvalid FROM commands where invoice = ?",
    [invoice],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/recupverifappro", (req, res) => {
  const statut = 1;
  const invoice = req.body.invoice;
  db.query(
    "SELECT verif_appro FROM approvionnement where invoice = ?",
    [invoice],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put("/updateverifvalidcommande", (req, res) => {
  const verifvalid = req.body.verifvalid;
  const invoice = req.body.invoice;
  db.query(
    "UPDATE commands SET verifvalid = ? WHERE invoice = ? ",
    [verifvalid, invoice],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //res.send("succes");
        db.query(
          "UPDATE command_validation SET verifvalid = ? WHERE invoice = ? ",
          [verifvalid, invoice],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("succes");
            }
          }
        );
      }
    }
  );
});

app.put("/updateverifvalidappro", (req, res) => {
  const verif_appro = req.body.verif_appro;
  const invoice = req.body.invoice;
  db.query(
    "UPDATE approvionnement SET verif_appro = ? WHERE invoice = ? ",
    [verif_appro, invoice],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //res.send("succes");
        db.query(
          "UPDATE approvisionnement_validation SET verif_appro = ? WHERE invoice = ? ",
          [verif_appro, invoice],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send("succes");
            }
          }
        );
      }
    }
  );
});

app.put("/changestockcommande", (req, res) => {
  const id_product = req.body.id_product;
  const invoice = req.body.invoice;
  let stockinit = 0;
  let quantcommand = 0;
  let stockupdate = 0;
  db.query(
    "SELECT stock FROM products  WHERE id = ? ",
    id_product,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //res.send(result);
        stockinit = result[0].stock;
        db.query(
          "SELECT product_quantity FROM commands  WHERE product_id = ? and invoice = ?",
          [id_product, invoice],
          (err, resulta) => {
            if (err) {
              console.log(err);
            } else {
              //res.send(result);
              quantcommand = resulta[0].product_quantity;
              stockupdate = stockinit - quantcommand;
              db.query(
                "UPDATE products SET stock = ? WHERE id = ? ",
                [stockupdate, id_product],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    // res.send(` stock mis a jour le stock inital est ${stockinit} et la quantite commander est ${quantcommand} et le nouveau stock a mettre a jour est ${stockupdate}`);
                    res.send("success");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

app.put("/changestockappro", (req, res) => {
  const id_product = req.body.id_product;
  const invoice = req.body.invoice;
  let stockinit = 0;
  let quantcommand = 0;
  let stockupdate = 0;
  let quantappro;
  db.query(
    "SELECT stock FROM products  WHERE id = ? ",
    id_product,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //res.send(result);
        stockinit = result[0].stock;
        db.query(
          "SELECT stock_appro FROM approvionnement  WHERE product_id = ? and invoice = ?",
          [id_product, invoice],
          (err, resulta) => {
            if (err) {
              console.log(err);
            } else {
              //res.send(result);
              quantappro = resulta[0].stock_appro;
              stockupdate = stockinit + quantappro;
              db.query(
                "UPDATE products SET stock = ? WHERE id = ? ",
                [stockupdate, id_product],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    // res.send(` stock mis a jour le stock inital est ${stockinit} et la quantite commander est ${quantcommand} et le nouveau stock a mettre a jour est ${stockupdate}`);
                    res.send("success");
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});
app.get("/recupe_status_command", (req, res) => {
  db.query("SELECT * FROM statuscommande", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/recupe_commandd", (req, res) => {
  db.query("SELECT * FROM commands", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//creation d'une commande valider

app.post("/creat_command_validation", (req, res) => {
  const invoice = req.body.invoice;
  const product_quantity = req.body.product_quantity;
  const total_price = req.body.total_price;
  const whatsapp = req.body.num;
  db.query(
    "insert into command_validation(invoice, total_quantity, total_price, whatsapp) values (?, ?, ?, ?)",
    [invoice, product_quantity, total_price, whatsapp],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

//bilan journalier
app.post("/bilan_day", (req, res) => {
  const datee = req.body.date;
  //const date = "2022-06-30";
  var mois = "";
  var today = new Date();
  //   var date =
  //     today.getFullYear() +
  //     "-" +
  //     0 +
  //     (today.getMonth() + 1) +
  //     "-" +
  //     0 +
  //     today.getDate();
  if (String(today).split(" ")[1] == "Jan") {
    mois = "01";
  } else if (String(today).split(" ")[1] == "Feb") {
    mois = "02";
  } else if (String(today).split(" ")[1] == "Mar") {
    mois = "03";
  } else if (String(today).split(" ")[1] == "Apr") {
    mois = "04";
  } else if (String(today).split(" ")[1] == "May") {
    mois = "05";
  } else if (String(today).split(" ")[1] == "Jun") {
    mois = "06";
  } else if (String(today).split(" ")[1] == "Jul") {
    mois = "07";
  } else if (String(today).split(" ")[1] == "Aug") {
    mois = "08";
  } else if (String(today).split(" ")[1] == "Sep") {
    mois = "09";
  } else if (String(today).split(" ")[1] == "Oct") {
    mois = "10";
  } else if (String(today).split(" ")[1] == "Nov") {
    mois = "11";
  } else if (String(today).split(" ")[1] == "Dec") {
    mois = "12";
  }
  console.log(
    `L'année est ${String(today).split(" ")[3]} et le jour est ${
      String(today).split(" ")[2]
    } et le mois est ${mois}`
  );
  console.log("" + today);
  var date = `${String(today).split(" ")[3]}-${mois}-${
    String(today).split(" ")[2]
  }`;
  console.log(date);
  const status_comand = req.body.status_comand;
  db.query(
    "SELECT product_id, product_name, SUM(total_price) AS TOTAL,  SUM(product_quantity) AS QUANTITE FROM commands WHERE command_date = ? and `status_id_command` = ? GROUP BY product_name",
    [date, status_comand],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//bilan periodique
app.post("/bilan_periodique", (req, res) => {
  const date1 = req.body.date1;
  const date2 = req.body.date2;
  const status_comand = req.body.status_comand;
  db.query(
    "SELECT product_id, product_name, SUM(total_price) AS TOTAL,  SUM(product_quantity) AS QUANTITE FROM commands  WHERE command_date BETWEEN  ? and ?  and status_id_command = ? GROUP BY product_name",
    [date1, date2, status_comand],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//liste cost and price
app.post("/costandprice", (req, res) => {
  const id = req.body.id;
  db.query(
    "SELECT price, cost FROM products  WHERE id = ? ",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/* obtenir l'invoice*/
app.get("/getInvoiceappro", (req, res) => {
  let invoice = "";
  let nbrligne = 0;
  let numfacend = 0;
  let newfacend = 0;
  db.query("SELECT * FROM  approvionnement", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      nbrligne = result.length;
      if (nbrligne > 0) {
        db.query(
          "SELECT MAX(id) AS TOTA FROM  approvionnement",
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              db.query(
                "SELECT * FROM  approvionnement WHERE id = ?",
                [result[0].TOTA],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    numfacend = parseInt(result[0].invoice.slice(5));
                    // numfacend = parseInt(result[0].invoice.split('0')[2]);
                    newfacend = numfacend + 1;
                    invoice = `FAB00${newfacend}`;
                    res.send(invoice);
                  }
                }
              );
            }
          }
        );
      } else {
        invoice = "FAB001";
        res.send(invoice);
      }
    }
  });
});
/* ajouter au panier  approvisionnement*/
app.post("/addcartappro", (req, res) => {
  const product_id = req.body.product_id;
  const product_quantity = req.body.product_quantity;
  const product_name = req.body.product_name;
  const unite_price = req.body.unite_price;
  const total_price = req.body.total_price;
  const picture = req.body.picture;
  const invoice = req.body.invoice;
  const stockprev = req.body.stockprev;
  const whatsapp = req.body.num;

  db.query(
    "INSERT INTO  approvionnement (product_id, stock_appro, product_name, unite_price, total_price, picture, invoice, stock_preview) VALUES (?,?,?,?,?,?,?,?)",
    [
      product_id,
      product_quantity,
      product_name,
      unite_price,
      total_price,
      picture,
      invoice,
      stockprev,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

//creation d'une approvisionnement

app.post("/creat_appro_validation", (req, res) => {
  const invoice = req.body.invoice;
  const product_quantity = req.body.product_quantity;
  const total_price = req.body.total_price;
  const whatsapp = req.body.num;
  db.query(
    "insert into approvisionnement_validation(invoice, total_quantity, total_price) values (?, ?, ?)",
    [invoice, product_quantity, total_price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.post("/recherchermed", (req, res) => {
  const nom = req.body.nom;

  db.query(
    "SELECT * FROM medecin  WHERE nom LIKE '%" + nom + "%'",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//liste des articles par ordre croissant
app.get("/afficheartcroiss", (req, res) => {
  db.query("SELECT * FROM products ORDER BY name ASC", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//liste des articles par categorie
app.post("/articlecateg", (req, res) => {
  const idcat = req.body.idcat;

  db.query(
    "SELECT * FROM products  WHERE category_id =?",
    idcat,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//liste des commandes
app.get("/affichecommande", (req, res) => {
  db.query("SELECT * FROM command_validation", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//liste des commandes validées
app.get("/affichecomv", (req, res) => {
  db.query(
    "SELECT * FROM command_validation WHERE statut =1 ",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//liste articles par commande
app.post("/afficheartcom", (req, res) => {
  const invoice = req.body.invoice;
  db.query(
    "SELECT * FROM commands WHERE invoice =? ",
    invoice,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//liste des demandes de promotion
app.get("/get_all_promotion", (req, res) => {
  db.query("SELECT * FROM promotion", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//liste des comptes des vendeurs
app.get("/get_all_sellers_compte", (req, res) => {
  db.query("SELECT id, username, email FROM compte", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//liste des licences des vendeurs
app.get("/get_all_licences_compte", (req, res) => {
  db.query(
    "SELECT id, id_boutique, validity_time, status_hash FROM license WHERE id_boutique <> 0",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// {/* -Fichier server qui se charge de gérer l'envoi des requêtes de recherche depuis le programme à la base de donnée créée
// */}
// const express = require('express');
// const app = express();
// const mysql = require('mysql');
// const cors = require('cors');

// require("dotenv").config();

// app.use(cors()); {/* -La mise en place de son environnement nécessite l'installation de certains packets  */ }
// app.use(express.json());

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: '',
//     database: 'company',
// })
// db.connect(function (error) {
//     if(error){
//         console.log(error);
//         return;
//     } else {
//         console.log('Database is connected');
//     }
// });

// app.get('/', (req, res) => {
//             res.json({'message':'OK'});
// });
// app.get('/users', (req, res) => {
//     db.query('select * from user', (error, rows, fields) => {
//         if(!error) {
//             res.json(rows);
//         } else {
//             console.log(error);
//         }
//     });
// });

// //This function allows us concatenate 'id' to url => localhost:4000/id
// app.get('/users/:id', (req, res) => {
//     const { id } = req.params;
//     db.query('select * from user where id = ?', [id], (error, rows, fields) => {
//         if(!error) {
//             res.json(rows);
//         } else {
//             console.log(error);
//         }
//     })
// });

// app.post('/createusers', (req, res) => {
//     //const { id,  } = req.body;
//     const username = req.params.username
//     const name = req.params.name
//     const lastname = req.params.lastname
//     const mail = req.params.mail
//     const randomstr = req.params.randomstr
//     const hash = req.params.hash

//     console.log(username, name, lastname, mail, randomstr, hash);
//     db.query('insert into user(username, name, lastname, mail, randomstr, hash) values (?, ?, ?, ?, ?, ?)', [ username, name, lastname, mail, randomstr, hash], (error, rows, fields) => {
//         if(!error) {
//             res.json({Status : "User saved"})
//         } else {
//             console.log(error);
//         }
//     });
// })

// app.put('/updateusers/:id', (req, res) => {
//     const { id, username, name, lastname, mail, randomstr, hash } = req.body;
//     console.log(req.body);
//     db.query('update user set username = ?, name = ?, lastname = ?, mail = ?, randomstr = ?, hash = ? where id = ?;',
//     [username, name, lastname, mail, randomstr, hash, id], (error, rows, fields) => {
//         if(!error){
//             res.json({
//                 Status: 'User updated'
//             });
//         } else {
//             console.log(error);
//         }
//     });
// });

// app.delete('/deleteusers/:id', (req,res) => {
//     const { id } = req.params;
//     db.query('delete from user where id = ?', [id], (error, rows, fields) => {
//         if(!error){
//             res.json({
//                 Status: "User deleted"
//             });
//         } else {
//             res.json({
//                 Status: error
//             });
//         }
//     })
// });
// app.listen(8001, () => {
//     console.log('server lancé')
// })
// // app.listen(process.env.PORT || 3001, () => {
// //     console.log('server lancé')
// // })
