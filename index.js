
require('dotenv').config();
const { NOMEM } = require('dns');
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let message = "";

const Catalogo = require("./models/catalogos");


app.get("/", async (req, res) => { 
  
  const catalogos = await Catalogo.findAll();
  res.render("index", {
    catalogos,
    message
  });
});

app.get("/detalhe/:id", async (req, res) => {
  
  const catalogo = await Catalogo.findByPk(req.params.id);
  
  res.render("detalhe", {
    catalogo,
  });
});

app.get("/criar", (req, res) =>{
  res.render("criar", {message});
});

app.post("/criar", async (req, res) => {
  const { nome, imagem, ano, personagens, sinopse, criador, emissoras } = req.body;

  if (!imagem) {
    res.render("criar", {
      message: "Imagem obrigatório"
    });
  }
  
  else if (!nome) {
    res.render("criar", {
      message: "Nome obrigatória"
    });
  }

  else if (!ano) {
    res.render("criar", {
      message: "Ano obrigatório"
    });
  }
  else if (!personagens) {
    res.render("criar", {
      message: "Personagens obrigatório"
    });
  }
  else if (!criador) {
    res.render("criar", {
      message: "Sinopse obrigatório"
    });
  }

  else {

    try {
      const catalogo = await Catalogo.create({
        nome, 
        imagem, 
        ano, 
        personagens, 
        sinopse, 
        criador, 
        emissoras,
      });

      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.render("criar", {
        message: "ERRO ao criar Desenho"
      });
    }

  }

});
    
app.get("/editar/:id", async (req, res) => {  
  const catalogo = await Catalogo.findByPk(req.params.id);
  if (!catalogo) {
    res.render("editar", {
      catalogo,
      message: "Desenho não encontrado"
    })
}

  res.render("editar", {
    catalogo,
    message
  });
});

app.post("/editar/:id", async (req, res) => {

  const catalogo = await Catalogo.findByPk(req.params.id);  
  const { imagem, nome, ano, personagens, criador, emissoras, sinopse } = req.body;
  
  catalogo.imagem = imagem;
  catalogo.nome = nome;
  catalogo.ano = ano;
  catalogo.personagens = personagens;
  catalogo.criador = criador;
  catalogo.emissoras = emissoras;
  catalogo.sinopse = sinopse;

  const catalogoEditado = await catalogo.save();

  res.render("editar", {
    catalogo: catalogoEditado,
    message: "Desenho editado com Sucesso"
  }); 
  
});

app.get("/deletar/:id", async (req, res) => {
  const catalogo = await Catalogo.findByPk(req.params.id);
  if (!catalogo) {
    res.render("deletar", {
      catalogo,
      message: "Desenho não encontrado",
    });
  }

  res.render("deletar", {
    catalogo, 
    message,
  });
});

app.post("/deletar/:id", async (req, res) => {
  const catalogo = await Catalogo.findByPk(req.params.id);
  if(!catalogo) {
    res.render("deletar", {
      message: "Desenho não localizado"
    });
  }
  await catalogo.destroy();

  res.redirect("/");
});


app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);